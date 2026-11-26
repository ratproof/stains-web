import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BOT_NAME, SUPPORT_URL } from "@/config";
import { useStatus } from "@/hooks/useStatus";
import { G } from "@/components/ui/SectionHead";

function useCountUp(target: number | undefined, duration = 2800) {
  const [value, setValue] = useState(0);
  const from = useRef(0);

  useEffect(() => {
    if (target == null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = target;
      setValue(target);
      return;
    }
    const start = from.current;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      // easeOutQuint: fast start, long slow tail at the end
      const eased = 1 - Math.pow(1 - p, 5);
      const v = Math.round(start + (target - start) * eased);
      from.current = v;
      setValue(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return target == null ? null : value;
}

function Squiggle({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      <G>{children}</G>
      <svg
        aria-hidden
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="absolute -bottom-2 left-0 h-2.5 w-full text-accent"
        fill="none"
      >
        <path
          d="M2 7C20 1 35 11 55 6S90 2 110 7 150 11 175 5 195 4 198 6"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

function MoneyBagIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className}>
      <defs>
        <mask id="money-bag-dollar">
          <rect width="24" height="24" fill="#fff" />
          <path
            d="M14 13.6c0-.8-.9-1.3-2-1.3s-2 .5-2 1.4c0 .9.9 1.2 2 1.5s2 .6 2 1.6c0 .9-.9 1.4-2 1.4s-2-.5-2-1.3M12 11.2v1.1M12 18.2v1.1"
            stroke="#000"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
        </mask>
      </defs>
      <g fill="currentColor" mask="url(#money-bag-dollar)">
        <path d="M7.7 2.2C9.9 3.4 14.1 3.4 16.3 2.2l-1.7 3H9.4z" />
        <path d="M9 6.2h6v1.4H9z" />
        <path d="M9.6 8.4C6.2 10 4 13.2 4 16.6 4 19.8 7.5 22 12 22s8-2.2 8-5.4c0-3.4-2.2-6.6-5.6-8.2z" />
      </g>
    </svg>
  );
}

export default function Hero() {
  const status = useStatus();
  const users = useCountUp(status.data?.users);
  const servers = useCountUp(status.data?.guilds);

  const avatar = status.data?.avatar_url?.replace("size=1024", "size=512");
  const showAvatar = status.isLoading || !!avatar;

  return (
    <section className="relative flex min-h-[100svh] items-center px-4 py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="fade-in max-w-2xl">
          <h1>
            Moderation, voice channels and <Squiggle>giveaways</Squiggle> for your server.
          </h1>

          <p className="mt-6 max-w-[48ch] text-lg text-muted">
            Filters that do what you expect, member-run voice channels, and giveaways with real requirements.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent gap-2 rounded-md"
            >
              <MoneyBagIcon className="h-4 w-4" />
              Purchase
            </a>
            <Link to="/commands" className="btn btn-outline gap-2 rounded-md">
              Explore commands
              <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M8.6 5.6 10 4.2l7.8 7.8-7.8 7.8-1.4-1.4 6.4-6.4z" />
              </svg>
            </Link>
          </div>

          {users != null && servers != null && (
            <p className="mt-8 text-sm text-muted tabular-nums">
              Powering <b className="text-fg">{users.toLocaleString("en-US")}</b> users across{" "}
              <b className="text-fg">{servers.toLocaleString("en-US")}</b> servers
            </p>
          )}
        </div>

        {showAvatar && (
          <div className="order-first shrink-0 lg:order-last">
            {avatar ? (
              <img
                src={avatar}
                alt={`${BOT_NAME} avatar`}
                width={320}
                height={320}
                className="fade-in h-28 w-28 sm:h-40 sm:w-40 lg:h-72 lg:w-72 xl:h-80 xl:w-80"
              />
            ) : (
              <div className="h-28 w-28 rounded-full bg-surface-2 sm:h-40 sm:w-40 lg:h-72 lg:w-72 xl:h-80 xl:w-80" aria-hidden />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
