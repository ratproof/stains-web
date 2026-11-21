import { useEffect, useState, type ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { BOT_NAME, INVITE_URL, SUPPORT_URL } from "@/config"

export type ScrollNavLink = { label: string; href: string; icon?: ReactNode }

export type MorphingScrollNavbarProps = {
  brand?: ReactNode
  links?: ScrollNavLink[]
  inviteUrl?: string
}

function CommandsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm3.3 4.3a1 1 0 0 0 0 1.4L9.6 12l-2.3 2.3a1 1 0 1 0 1.4 1.4l3-3a1 1 0 0 0 0-1.4l-3-3a1 1 0 0 0-1.4 0ZM13 15a1 1 0 1 0 0 2h3.5a1 1 0 1 0 0-2H13Z" />
    </svg>
  )
}

function EmbedsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm1 3v10h1.5V7H6Zm4 1v1.6h8V8h-8Zm0 3.2v1.6h8v-1.6h-8Zm0 3.2V16h5v-1.6h-5Z" />
    </svg>
  )
}

function StatusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.7 7.3a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4 0l-2.5-2.5a1 1 0 1 1 1.4-1.4l1.8 1.8 4.3-4.3a1 1 0 0 1 1.4 0Z" />
    </svg>
  )
}

function SupportIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path fill="currentColor" d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-6.4l-4 3.4a.8.8 0 0 1-1.3-.6V18H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
    </svg>
  )
}

function InviteIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1 5h2v4h4v2h-4v4h-2v-4H7v-2h4V7Z" />
    </svg>
  )
}

const DEFAULT_LINKS: ScrollNavLink[] = [
  { label: "Commands", href: "/commands", icon: <CommandsIcon /> },
  { label: "Embeds", href: "/embeds", icon: <EmbedsIcon /> },
  { label: "Status", href: "/status", icon: <StatusIcon /> },
  { label: "Support", href: SUPPORT_URL, icon: <SupportIcon /> },
]

export function MorphingScrollNavbar({
  brand = (
    <>
      <img src="/favicon.png" alt="" width={24} height={24} />
      {BOT_NAME}
    </>
  ),
  links = DEFAULT_LINKS,
  inviteUrl = INVITE_URL,
}: MorphingScrollNavbarProps) {
  const { pathname } = useLocation()
  const [atTop, setAtTop] = useState(true)
  const [direction, setDirection] = useState<"up" | "down">("up")
  const [activeHref, setActiveHref] = useState("")

  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0

    const update = () => {
      const y = window.scrollY
      const delta = y - lastY
      setAtTop(y < 8)
      if (delta > 4) setDirection("down")
      else if (delta < -4) setDirection("up")

      const marker = y + window.innerHeight * 0.34
      let next = ""
      for (const link of links) {
        if (!link.href.startsWith("#")) continue
        const section = document.getElementById(link.href.slice(1))
        if (section && section.offsetTop <= marker) next = link.href
      }
      setActiveHref(next)
      lastY = y
      frame = 0
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [links])

  const floating = !atTop
  const compact = floating && direction === "down"

  return (
    <>
      <style>{STYLES}</style>
      <nav className={`msn-nav${floating ? " is-floating" : ""}${compact ? " is-compact" : ""}`} aria-label="Primary navigation">
        <div className="msn-shell">
          <Link className="msn-brand" to="/" aria-label="Go to home">{brand}</Link>
          <div className="msn-links">
            {links.map((link) => {
              const isHash = link.href.startsWith("#")
              const isExternal = /^https?:\/\//.test(link.href)
              const active = isHash ? activeHref === link.href : pathname === link.href
              const content = (
                <>
                  {link.icon}
                  <span className="msn-label">{link.label}</span>
                </>
              )
              return isHash || isExternal ? (
                <a
                  aria-label={link.label}
                  aria-current={active ? "location" : undefined}
                  href={link.href}
                  key={link.href}
                  {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  {content}
                </a>
              ) : (
                <Link aria-label={link.label} aria-current={active ? "page" : undefined} to={link.href} key={link.href}>{content}</Link>
              )
            })}
          </div>
          <div className="msn-actions">
            <a href={inviteUrl} target="_blank" rel="noreferrer" aria-label="Invite">
              <InviteIcon />
              <span className="msn-label">Invite</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}

const STYLES = `
.msn-nav{--paper:#121413;--ink:#edf1ee;--muted:#aab3ae;position:fixed;z-index:100;top:0;right:0;left:0;display:flex;justify-content:center;padding:0 20px;pointer-events:none;font-family:"Geist Variable",ui-sans-serif,system-ui,sans-serif;color:var(--ink)}
.msn-nav *{box-sizing:border-box}.msn-nav a{color:inherit;text-decoration:none}
.msn-shell{pointer-events:auto;display:flex;align-items:center;justify-content:space-between;gap:22px;width:100%;max-width:1180px;height:68px;margin-top:0;padding:0 16px 0 22px;border:1px solid transparent;border-radius:20px;background:transparent;transition:max-width .5s cubic-bezier(.34,1.32,.5,1),height .38s cubic-bezier(.34,1.2,.5,1),margin-top .38s ease,padding .38s ease,background-color .3s ease,border-color .3s ease}
.msn-nav.is-floating .msn-shell{max-width:960px;height:58px;margin-top:12px;padding:0 10px 0 20px;border-color:color-mix(in srgb,var(--ink) 10%,transparent);background:color-mix(in srgb,var(--paper) 35%,transparent);-webkit-backdrop-filter:saturate(160%) blur(20px);backdrop-filter:saturate(160%) blur(20px)}
.msn-nav.is-compact .msn-shell{max-width:470px;height:52px}
.msn-brand{display:inline-flex;align-items:center;gap:10px;flex:none;font-size:25px;font-weight:800;line-height:1;letter-spacing:-.045em;transition:font-size .38s cubic-bezier(.34,1.2,.5,1)}
.msn-brand img{border-radius:50%}.msn-nav.is-compact .msn-brand{font-size:22px}
.msn-links{display:flex;gap:4px}
.msn-actions{display:flex;flex:none;align-items:center}
.msn-actions:before{content:"";display:none;width:1px;height:20px;margin:0 6px;background:color-mix(in srgb,var(--ink) 14%,transparent)}
.msn-links a,.msn-actions a{display:inline-flex;align-items:center;justify-content:center;height:40px;padding:0 12px;border-radius:10px;color:var(--muted);font-size:14px;font-weight:700;white-space:nowrap;transition:color .15s ease,background-color .15s ease,padding .38s ease}
.msn-links a svg,.msn-actions a svg{width:19px;height:19px;flex:none}
.msn-links a:hover,.msn-actions a:hover,.msn-links a[aria-current]{color:var(--ink);background:color-mix(in srgb,var(--ink) 9%,transparent)}
.msn-label{display:inline-block;max-width:120px;margin-left:8px;overflow:hidden;opacity:1;transition:max-width .4s cubic-bezier(.34,1.2,.5,1),margin-left .4s ease,opacity .25s ease}
.msn-nav.is-compact .msn-shell{justify-content:flex-start}
.msn-nav.is-compact .msn-links{margin-left:auto;gap:2px}
.msn-nav.is-compact .msn-label{max-width:0;margin-left:0;opacity:0}
.msn-nav.is-compact .msn-links a,.msn-nav.is-compact .msn-actions a{padding:0 10px}
.msn-nav.is-compact .msn-actions:before{display:block}
@media(min-width:901px){.msn-nav.is-compact .msn-links a:hover .msn-label,.msn-nav.is-compact .msn-links a:focus-visible .msn-label,.msn-nav.is-compact .msn-actions a:hover .msn-label,.msn-nav.is-compact .msn-actions a:focus-visible .msn-label{max-width:120px;margin-left:8px;opacity:1}.msn-nav.is-compact .msn-links a:hover,.msn-nav.is-compact .msn-links a:focus-visible,.msn-nav.is-compact .msn-actions a:hover,.msn-nav.is-compact .msn-actions a:focus-visible{padding:0 14px 0 12px}}
@media(max-width:900px){.msn-shell,.msn-nav.is-floating .msn-shell{justify-content:flex-start}.msn-label{display:none}.msn-links{margin-left:auto;gap:2px}.msn-links a,.msn-actions a{padding:0 10px}.msn-actions:before{display:block}.msn-nav.is-floating .msn-shell{max-width:680px}.msn-nav.is-compact .msn-shell{max-width:470px}}
@media(max-width:560px){.msn-nav{padding:0 12px}.msn-shell,.msn-nav.is-floating .msn-shell,.msn-nav.is-compact .msn-shell{gap:8px;height:60px;padding:0 8px 0 10px}.msn-nav.is-floating .msn-shell,.msn-nav.is-compact .msn-shell{height:52px}.msn-brand,.msn-nav.is-compact .msn-brand{font-size:21px}.msn-links a,.msn-actions a,.msn-nav.is-compact .msn-links a,.msn-nav.is-compact .msn-actions a{padding:0 8px}.msn-actions:before{margin:0 4px}}
@media(prefers-reduced-motion:reduce){.msn-nav *,.msn-shell{transition-duration:.01ms!important}}
`
