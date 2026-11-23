import { Link } from "react-router-dom";
import { BOT_NAME, INVITE_URL, SUPPORT_URL } from "@/config";

const link = "text-sm text-muted transition-colors hover:text-fg";
const head = "text-xs font-medium uppercase tracking-wider text-muted";

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.2.5a18 18 0 0 0-6.4 0L8.6 3a19.8 19.8 0 0 0-4.9 1.4C.6 9 -.2 13.5.2 18a19.9 19.9 0 0 0 6 3l1.3-2.1a13 13 0 0 1-2-1l.5-.4a14.2 14.2 0 0 0 12 0l.5.4a13 13 0 0 1-2 1l1.3 2.1a19.9 19.9 0 0 0 6-3c.5-5.200-.8-9.700-3.500-13.600ZM8 15.300c-1.200 0-2.100-1.100-2.100-2.400S6.800 10.500 8 10.500s2.100 1.100 2.100 2.400-.9 2.400-2.100 2.400Zm8 0c-1.200 0-2.100-1.100-2.100-2.400s.9-2.400 2.100-2.400 2.100 1.100 2.100 2.400-.9 2.400-2.100 2.400Z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1200px] px-4 py-14">
        <div className="grid gap-12 sm:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <span className="text-lg font-semibold tracking-tight">{BOT_NAME}</span>
            <p className="mt-2 max-w-[34ch] text-sm text-muted">
              Moderation, temporary voice channels and giveaways for your Discord server.
            </p>
            <a
              href={INVITE_URL}
              className="mt-5 inline-flex items-center rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              Add to Discord
            </a>
          </div>

          <nav className="flex flex-col gap-2.5" aria-label="Product">
            <h3 className={head}>Product</h3>
            <Link className={link} to="/commands">Commands</Link>
            <a className={link} href={INVITE_URL}>Invite</a>
          </nav>

          <nav className="flex flex-col gap-2.5" aria-label="Help">
            <h3 className={head}>Help</h3>
            <a className={link} href={SUPPORT_URL}>Support server</a>
            <Link className={link} to="/commands">Command list</Link>
          </nav>

          <nav className="flex flex-col gap-2.5" aria-label="Legal">
            <h3 className={head}>Legal</h3>
            <Link className={link} to="/terms">Terms of Service</Link>
            <Link className={link} to="/privacy">Privacy Policy</Link>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {BOT_NAME}. Not affiliated with Discord Inc.
          </p>
          <a
            href={SUPPORT_URL}
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            <DiscordIcon />
            Join the support server
          </a>
        </div>
      </div>
    </footer>
  );
}
