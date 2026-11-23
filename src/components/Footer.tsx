import { Link } from "react-router-dom";
import { BOT_NAME, INVITE_URL, SUPPORT_URL } from "@/config";

const GLOW = "148, 163, 210"; // rgb of the glow, change to taste

const link = "text-[15px] text-muted transition-colors hover:text-fg";

const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.4 -0.35'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
  </svg>
);

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <nav className="flex flex-col gap-3.5" aria-label={title}>
      <h3 className="flex items-center gap-2 text-sm font-medium">
        <span className="h-1.5 w-1.5 rounded-full bg-fg/50" aria-hidden="true" />
        {title}
      </h3>
      {children}
    </nav>
  );
}

function Glow() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] overflow-hidden" aria-hidden="true">
      {/* soft base light */}
      <div
        className="absolute left-1/2 top-[45%] h-[140%] w-[75%] -translate-x-1/2 rounded-[50%]"
        style={{ background: `radial-gradient(closest-side, rgba(${GLOW},0.22), rgba(${GLOW},0.06) 60%, transparent 100%)` }}
      />
      {/* grainy dome */}
      <div
        className="absolute left-1/2 top-[38%] h-[160%] w-[62%] -translate-x-1/2 rounded-[50%] opacity-70"
        style={{
          backgroundImage: grain,
          backgroundSize: "220px 220px",
          WebkitMaskImage: "radial-gradient(closest-side, #000 55%, transparent 100%)",
          maskImage: "radial-gradient(closest-side, #000 55%, transparent 100%)",
          backgroundColor: `rgba(${GLOW},0.35)`,
          backgroundBlendMode: "multiply",
        }}
      />
      {/* light streaks */}
      <div className="absolute inset-x-0 bottom-0 top-[30%] flex justify-center gap-6 opacity-40">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-[3px] rounded-full"
            style={{
              height: `${60 + ((i * 17) % 40)}%`,
              alignSelf: "flex-end",
              transform: `rotate(${(i - 2) * 3}deg)`,
              background: `linear-gradient(to top, rgba(${GLOW},0.7), transparent)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1400px] px-4 pb-4">
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-black/20">
        <Glow />

        <div className="relative z-10 px-8 pb-8 pt-14 sm:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
            <div className="max-w-[40ch]">
              <span className="text-xl font-semibold tracking-tight">{BOT_NAME}</span>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">
                Moderation, temporary voice channels and giveaways for your Discord server.
              </p>
              <a
                href={INVITE_URL}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-fg px-4 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
              >
                <DiscordIcon />
                Add to Discord
              </a>
            </div>

            <div className="grid grid-cols-2 gap-x-16 gap-y-10 sm:grid-cols-3">
              <Column title="Product">
                <Link className={link} to="/commands">Commands</Link>
                <Link className={link} to="/embed-builder">Embed Builder</Link>
                <Link className={link} to="/status">Status</Link>
              </Column>
              <Column title="Resources">
                <a className={link} href={SUPPORT_URL}>Support Server</a>
                <a className={link} href={INVITE_URL}>Invite</a>
              </Column>
              <Column title="Legal">
                <Link className={link} to="/terms">Terms of Service</Link>
                <Link className={link} to="/privacy">Privacy Policy</Link>
              </Column>
            </div>
          </div>

          <div className="mt-24 flex flex-col gap-2 border-t border-line/60 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {BOT_NAME}. All rights reserved.</p>
            <p>Not affiliated with Discord Inc.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
