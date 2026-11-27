import { Link } from "react-router-dom";
import { BOT_NAME, SUPPORT_URL } from "@/config";

const GLOW = "74, 87, 127"; // #4A577F, rgb of the glow, change to taste

const link = "text-sm text-white/60 transition-colors hover:text-white";

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

// one ray per entry: angle off vertical, length, half width
const RAYS = [
  { a: -36, l: 150, w: 7 },
  { a: -27, l: 195, w: 9 },
  { a: -18, l: 235, w: 11 },
  { a: -9, l: 215, w: 9 },
  { a: 0, l: 265, w: 13 },
  { a: 9, l: 215, w: 9 },
  { a: 18, l: 235, w: 11 },
  { a: 27, l: 195, w: 9 },
  { a: 36, l: 150, w: 7 },
];

const OX = 500; // burst origin, sits just under the bottom edge
const OY = 322;

function Glow() {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "85%", overflow: "hidden", pointerEvents: "none", zIndex: 0 }}
    >
      {/* soft body under the stipple */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 55% 85% at 50% 100%, rgba(${GLOW},0.3), rgba(${GLOW},0.08) 50%, transparent 75%)`,
        }}
      />

      <svg
        viewBox="0 0 1000 300"
        preserveAspectRatio="xMidYMax slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          {/* dome density: opaque at the bottom center, fades out toward the edge */}
          <radialGradient id="fg-dome" cx="0.5" cy="1" r="0.55">
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.6" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>

          {/* ray density: solid at the base, fades toward the tip */}
          <linearGradient id="fg-ray" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.7" stopColor="#fff" stopOpacity="0.7" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>

          {/* turns the soft shapes into speckle: noise + density, then hard threshold */}
          <filter id="fg-stipple" filterUnits="userSpaceOnUse" x="0" y="0" width="1000" height="300" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="n" />
            <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="na" />
            <feComposite in="SourceGraphic" in2="na" operator="arithmetic" k1="0" k2="0.9" k3="1" k4="-0.5" result="sum" />
            <feComponentTransfer in="sum" result="dots">
              <feFuncA type="discrete" tableValues="0 1" />
            </feComponentTransfer>
            <feFlood floodColor={`rgb(${GLOW})`} result="c" />
            <feComposite in="c" in2="dots" operator="in" />
          </filter>
        </defs>

        <g filter="url(#fg-stipple)">
          <rect x="0" y="0" width="1000" height="300" fill="url(#fg-dome)" />
          {RAYS.map((r, i) => (
            <ellipse
              key={i}
              cx={OX}
              cy={OY - r.l / 2}
              rx={r.w}
              ry={r.l / 2}
              fill="url(#fg-ray)"
              transform={`rotate(${r.a} ${OX} ${OY})`}
            />
          ))}
        </g>
      </svg>
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
