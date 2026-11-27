import { useQuery } from "@tanstack/react-query";
import { BOT_NAME } from "@/config";
import { fetchStatus, type ShardStatus } from "@/lib/api";
import UsageGraph from "@/components/UsageGraph";

const fmtUptime = (s: number) => {
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
  return [d && `${d}d`, (d || h) && `${h}h`, (d || h || m) && `${m}m`, `${sec}s`].filter(Boolean).join(" ");
};
const ms = (n: number | null | undefined) => (n == null || !Number.isFinite(n) ? "n/a" : `${Math.round(n)}ms`);
const num = (n: number | null | undefined) => (n == null ? "n/a" : n.toLocaleString("en-US"));
const isUp = (s: ShardStatus) => s.connected !== false && s.ping != null && Number.isFinite(s.ping);

// latency thresholds for the per shard bar
const pingTone = (n: number | null | undefined) =>
  n == null || !Number.isFinite(n) ? "bg-red-400" : n < 150 ? "bg-emerald-400" : n < 400 ? "bg-amber-400" : "bg-red-400";
const pingWidth = (n: number | null | undefined) =>
  n == null || !Number.isFinite(n) ? 0 : Math.max(4, Math.min(100, (n / 500) * 100));

const tones = {
  ok: { box: "border-emerald-500/20 border-l-emerald-400 bg-emerald-500/[0.06]", dot: "bg-emerald-400", text: "text-emerald-300" },
  warn: { box: "border-amber-500/20 border-l-amber-400 bg-amber-500/[0.06]", dot: "bg-amber-400", text: "text-amber-300" },
  bad: { box: "border-red-500/20 border-l-red-400 bg-red-500/[0.06]", dot: "bg-red-400", text: "text-red-300" },
};

function Banner({ tone, title, sub }: { tone: keyof typeof tones; title: string; sub: string }) {
  const t = tones[tone];
  return (
    <div
      role="status"
      aria-live="polite"
      className={`mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 rounded-lg border border-l-4 px-5 py-4 ${t.box}`}
    >
      <div className="flex items-center gap-3">
        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${t.dot}`} aria-hidden />
        <p className={`text-lg font-semibold ${t.text}`}>{title}</p>
      </div>
      <p className="text-sm text-muted tabular-nums">{sub}</p>
    </div>
  );
}

const Stat = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <div className="bg-[#101012] p-5">
    <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
    <dd className="mt-2 text-2xl font-semibold tabular-nums sm:text-3xl">{value}</dd>
    {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
  </div>
);

function ShardRow({ s }: { s: ShardStatus }) {
  const up = isUp(s);
  return (
    <li className="grid grid-cols-2 items-center gap-x-4 gap-y-2 px-5 py-3.5 sm:grid-cols-[7rem_1fr_5rem_6rem_6rem]">
      <p className="flex items-center gap-2.5 font-medium">
        <span className={`h-2 w-2 shrink-0 rounded-full ${up ? "bg-emerald-400" : "bg-red-400"}`} aria-hidden />
        Shard {s.id}
        <span className="sr-only">{up ? "connected" : "offline"}</span>
      </p>
      <p className="text-right text-sm tabular-nums sm:order-3">{ms(s.ping)}</p>
      <div className="col-span-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06] sm:order-2 sm:col-span-1" aria-hidden>
        <div className={`h-full rounded-full ${pingTone(s.ping)}`} style={{ width: `${pingWidth(s.ping)}%` }} />
      </div>
      <p className="hidden text-right text-sm tabular-nums text-muted sm:order-4 sm:block">{num(s.guilds)}</p>
      <p className="hidden text-right text-sm tabular-nums text-muted sm:order-5 sm:block">{num(s.users)}</p>
    </li>
  );
}

export default function Status() {
  const { data, isLoading, isError, isFetching, dataUpdatedAt } = useQuery({
    queryKey: ["status", "live"],
    queryFn: fetchStatus,
    refetchInterval: 15_000,
    refetchOnWindowFocus: true,
  });

  const updated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : null;

  let body;
  if (isLoading) {
    body = (<>
      <div className="mt-8 h-[4.25rem] animate-pulse rounded-lg bg-[#101012]" />
      <div className="mt-4 h-28 animate-pulse rounded-lg bg-[#101012]" />
    </>);
  } else if (isError || !data) {
    body = <Banner tone="bad" title="Can't reach the bot" sub="The status API isn't responding. Retrying automatically." />;
  } else {
    // a non-sharded bot sends shards: null, so show one synthetic shard from the totals
    const shards: ShardStatus[] = data.shards?.length ? data.shards : [{ id: 0, ping: data.ping, guilds: data.guilds, users: data.users, connected: true }];
    const up = shards.filter(isUp).length;
    const tone = up === shards.length ? "ok" : up > 0 ? "warn" : "bad";
    const title = tone === "ok" ? "All systems operational" : tone === "warn" ? "Partial outage" : "Major outage";
    body = (<>
      <Banner tone={tone} title={title} sub={`${up}/${shards.length} shards connected · ${ms(data.ping)} latency`} />

      <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-4">
        <Stat label="Guilds" value={num(data.guilds)} />
        <Stat label="Users" value={num(data.users)} />
        <Stat label="Latency" value={ms(data.ping)} />
        <Stat label="Uptime" value={fmtUptime(data.uptime)} sub={`${up}/${shards.length} shards up`} />
      </dl>

      <h2 className="mb-3 mt-12 text-xl">Shards</h2>
      <div className="overflow-hidden rounded-lg border border-line bg-[#101012]">
        <div className="hidden grid-cols-[7rem_1fr_5rem_6rem_6rem] gap-x-4 border-b border-line px-5 py-2.5 text-xs uppercase tracking-wide text-muted sm:grid">
          <span>Shard</span>
          <span>Ping</span>
          <span className="text-right">Latency</span>
          <span className="text-right">Guilds</span>
          <span className="text-right">Users</span>
        </div>
        <ul className="divide-y divide-line">
          {shards.map((s) => <ShardRow key={s.id} s={s} />)}
        </ul>
      </div>

      {data.usage && (<>
        <h2 className="mb-3 mt-12 text-xl">Command usage</h2>
        <div className="rounded-lg border border-line bg-[#101012] p-5">
          <UsageGraph usage={data.usage} />
        </div>
      </>)}
    </>);
  }

  return (
    <main className="mx-auto max-w-[1100px] px-4 pb-24 pt-28">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <h1 className="text-4xl sm:text-5xl">{BOT_NAME} status</h1>
          <p className="mt-2 text-muted">Live health of the bot.</p>
        </div>
        {updated && (
          <p className="flex items-center gap-2 text-sm text-muted tabular-nums">
            <span className={`h-2 w-2 rounded-full ${isFetching ? "animate-pulse bg-accent" : "bg-white/25"}`} aria-hidden />
            Updated {updated}
          </p>
        )}
      </div>
      {body}
    </main>
  );
}
