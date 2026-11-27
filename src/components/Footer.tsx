import { Link } from "react-router-dom";
import { BOT_NAME, SUPPORT_URL } from "@/config";

const GLOW = "148, 163, 210"; // rgb of the glow, change to taste

const link = "text-sm text-white/60 transition-colors hover:text-white";

const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.4 -0.35'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
  </svg>
);

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <nav className="flex flex-col gap-2.5" aria-label={title}>
      <h3 className="flex items-center gap-2 text-sm font-medium text-white">
        <span className="h-1.5 w-1.5 rounded-full bg-white/50" aria-hidden="true" />
        {title}
      </h3>
      {children}
    </nav>
  );
}

function Glow() {
  const mask = "radial-gradient(ellipse 45% 90% at 50% 100%, #000 25%, transparent 80%)";
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "55%", overflow: "hidden", pointerEvents: "none", zIndex: 0 }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 60% 100% at 50% 100%, rgba(${GLOW},0.55), rgba(${GLOW},0.16) 45%, transparent 75%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: grain,
          backgroundSize: "220px 220px",
          opacity: 0.6,
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "85%", display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 24 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: 4,
              height: `${55 + ((i * 17) % 40)}%`,
              borderRadius: 4,
              transform: `rotate(${(i - 2) * 3}deg)`,
              background: `linear-gradient(to top, rgba(${GLOW},0.6), transparent)`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[980px] px-4 pb-4 pt-6">
      <div
        className="relative isolate overflow-hidden rounded-[2.5rem] border border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-white/[0.02]"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.14), 0 30px 80px -30px rgba(0,0,0,0.9), 0 0 0 1px rgba(0,0,0,0.6)",
        }}
      >
        <Glow />

        <div className="relative z-10 px-8 pb-5 pt-8 sm:px-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:gap-10">
            <div className="max-w-[30ch]">
              <span className="text-lg font-semibold tracking-tight text-white">{BOT_NAME}</span>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Moderation, voice channels and giveaways for Discord servers.
              </p>
              <a
                href={SUPPORT_URL}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_6px_20px_-6px_rgba(255,255,255,0.35)] ring-1 ring-white/40 transition hover:-translate-y-px active:translate-y-0"
              >
                <DiscordIcon />
                Purchase Whitelist
              </a>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-3">
              <Column title="Product">
                <Link className={link} to="/commands">Commands</Link>
                <Link className={link} to="/embeds">Embed Builder</Link>
                <Link className={link} to="/status">Status</Link>
              </Column>
              <Column title="Resources">
                <a className={link} href={SUPPORT_URL}>Support Server</a>
                <a className={link} href={SUPPORT_URL}>Purchase</a>
              </Column>
              <Column title="Legal">
                <Link className={link} to="/terms">Terms of Service</Link>
                <Link className={link} to="/privacy">Privacy Policy</Link>
              </Column>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-1.5 border-t border-white/10 pt-4 text-[13px] text-white/55 sm:flex-row sm:items-center sm:justify-between sm:pr-20">
            <p>© {new Date().getFullYear()} {BOT_NAME}. All rights reserved.</p>
            <p>Not affiliated with Discord Inc.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
