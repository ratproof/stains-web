import { useEffect, useState, type ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { BOT_NAME, SUPPORT_URL } from "@/config"

export type ScrollNavLink = { label: string; href: string }

export type MorphingScrollNavbarProps = {
  brand?: ReactNode
  links?: ScrollNavLink[]
  socialUrl?: string
}

const DEFAULT_LINKS: ScrollNavLink[] = [
  { label: "Commands", href: "/commands" },
  { label: "Embeds", href: "/embeds" },
  { label: "Status", href: "/status" },
  { label: "Support", href: "/support" },
]

function DiscordIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.1 14.1 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .079.01c.12.1.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"/></svg>
}

export function MorphingScrollNavbar({
  brand = <>{BOT_NAME}<span>.</span></>,
  links = DEFAULT_LINKS,
  socialUrl = SUPPORT_URL,
}: MorphingScrollNavbarProps) {
  const { pathname } = useLocation()
  const [atTop, setAtTop] = useState(true)
  const [direction, setDirection] = useState<"up" | "down">("up")
  const [progress, setProgress] = useState(0)
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

      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0)

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
      <div className="msn-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <nav className={`msn-nav${floating ? " is-floating" : ""}${compact ? " is-compact" : ""}`} aria-label="Primary navigation">
        <div className="msn-shell">
          <Link className="msn-brand" to="/" aria-label="Go to home">{brand}</Link>
          <div className="msn-links">
            {links.map((link) => {
              const isHash = link.href.startsWith("#")
              const active = isHash ? activeHref === link.href : pathname === link.href
              return isHash ? (
                <a aria-current={active ? "location" : undefined} href={link.href} key={link.href}>{link.label}</a>
              ) : (
                <Link aria-current={active ? "page" : undefined} to={link.href} key={link.href}>{link.label}</Link>
              )
            })}
          </div>
          <div className="msn-actions">
            <a className="msn-button msn-icon-button" href={socialUrl} target="_blank" rel="noreferrer" aria-label="Open Discord in a new tab"><DiscordIcon/></a>
          </div>
        </div>
      </nav>
    </>
  )
}

const STYLES = `
.msn-progress{--accent:#176247;position:fixed;z-index:101;top:0;right:0;left:0;height:2px;background:linear-gradient(90deg,var(--accent),#4fc39a);transform:scaleX(0);transform-origin:0 50%;will-change:transform}
.msn-nav{--paper:#f6f7f5;--surface:#fff;--ink:#17201c;--muted:#59635d;--line:#cbd3cd;--accent:#176247;position:fixed;z-index:100;top:0;right:0;left:0;display:flex;justify-content:center;padding:0 20px;pointer-events:none;font-family:"Geist Variable",ui-sans-serif,system-ui,sans-serif;color:var(--ink)}
.dark .msn-nav{--paper:#101310;--surface:#171b18;--ink:#edf1ee;--muted:#9aa49e;--line:#303832;--accent:#5fc9a1}
.msn-nav *{box-sizing:border-box}.msn-nav a{color:inherit;text-decoration:none}.msn-shell{pointer-events:auto;display:flex;align-items:center;justify-content:space-between;gap:22px;width:100%;max-width:1180px;height:68px;margin-top:0;padding:0 12px 0 22px;border:1px solid transparent;border-radius:20px;background:transparent;transition:max-width .5s cubic-bezier(.34,1.32,.5,1),height .38s cubic-bezier(.34,1.2,.5,1),margin-top .38s ease,padding .38s ease,background-color .3s ease,border-color .3s ease,box-shadow .4s ease}
.msn-nav.is-floating .msn-shell{max-width:960px;height:58px;margin-top:12px;padding:0 10px 0 20px;border-color:color-mix(in srgb,var(--ink) 10%,transparent);background:color-mix(in srgb,var(--paper) 74%,transparent);-webkit-backdrop-filter:saturate(170%) blur(16px);backdrop-filter:saturate(170%) blur(16px);box-shadow:0 1px 0 color-mix(in srgb,#fff 56%,transparent) inset,0 14px 40px -20px color-mix(in srgb,var(--ink) 45%,transparent)}
.msn-nav.is-compact .msn-shell{max-width:560px;height:52px}.msn-brand{flex:none;font-size:25px;font-weight:800;line-height:1;letter-spacing:-.045em;transition:font-size .38s cubic-bezier(.34,1.2,.5,1),transform .18s ease}.msn-brand span{color:var(--accent)}.msn-brand:hover{transform:translateY(-1px)}.msn-nav.is-compact .msn-brand{font-size:22px}
.msn-links{display:flex;gap:28px;max-width:640px;overflow:hidden;opacity:1;transition:max-width .45s cubic-bezier(.34,1.2,.5,1),opacity .28s ease,transform .3s ease,gap .35s ease}.msn-nav.is-compact .msn-links{max-width:0;gap:0;opacity:0;transform:translateY(-8px);pointer-events:none}.msn-links a{position:relative;color:var(--muted);font-size:14px;font-weight:480;white-space:nowrap;transition:color .15s ease}.msn-links a:after{content:"";position:absolute;right:0;bottom:-5px;left:0;height:2px;border-radius:2px;background:var(--accent);transform:scaleX(0);transform-origin:0 50%;transition:transform .28s cubic-bezier(.2,.7,.2,1)}.msn-links a:hover,.msn-links a[aria-current]{color:var(--ink)}.msn-links a:hover:after,.msn-links a[aria-current]:after{transform:scaleX(1)}
.msn-actions{display:flex;flex:none;align-items:center;gap:10px}.msn-button{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:42px;padding:0 18px;border:1px solid var(--line);border-radius:9px;background:var(--surface);color:var(--ink);font-size:13.5px;font-weight:620;white-space:nowrap;transition:height .38s ease,font-size .38s ease,padding .38s ease,background-color .18s ease,transform .18s ease,box-shadow .22s ease}.msn-button svg{width:17px;height:17px}.msn-button:hover{background:color-mix(in srgb,var(--surface) 80%,var(--paper));transform:translateY(-2px);box-shadow:0 10px 22px -17px color-mix(in srgb,var(--ink) 45%,transparent)}.msn-button:active{transform:translateY(0) scale(.97)}.msn-icon-button{width:42px;padding:0}.msn-nav.is-compact .msn-button{height:36px;padding:0 14px;font-size:12.5px}.msn-nav.is-compact .msn-icon-button{width:36px;padding:0}
@media(max-width:900px){.msn-links{display:none}.msn-nav.is-floating .msn-shell{max-width:680px}.msn-nav.is-compact .msn-shell{max-width:520px}}
@media(max-width:560px){.msn-nav{padding:0 12px}.msn-shell,.msn-nav.is-floating .msn-shell,.msn-nav.is-compact .msn-shell{gap:12px;height:60px;padding:0 4px 0 10px}.msn-nav.is-floating .msn-shell,.msn-nav.is-compact .msn-shell{height:52px}.msn-brand,.msn-nav.is-compact .msn-brand{font-size:23px}.msn-actions{gap:7px}.msn-button,.msn-nav.is-compact .msn-button{height:40px;padding:0 13px;font-size:13px}.msn-nav.is-floating .msn-button,.msn-nav.is-compact .msn-button{height:36px}.msn-icon-button,.msn-nav.is-compact .msn-icon-button{width:40px;padding:0}.msn-nav.is-floating .msn-icon-button,.msn-nav.is-compact .msn-icon-button{width:36px}}
@media(prefers-reduced-motion:reduce){.msn-nav *,.msn-shell,.msn-progress{transition-duration:.01ms!important}}
`
