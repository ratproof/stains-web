import { useEffect, useState, type ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { BOT_NAME, INVITE_URL } from "@/config"

export type ScrollNavLink = { label: string; href: string }

export type MorphingScrollNavbarProps = {
  brand?: ReactNode
  links?: ScrollNavLink[]
  inviteUrl?: string
}

const DEFAULT_LINKS: ScrollNavLink[] = [
  { label: "Commands", href: "/commands" },
  { label: "Embeds", href: "/embeds" },
  { label: "Status", href: "/status" },
  { label: "Support", href: "/support" },
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
              const active = isHash ? activeHref === link.href : pathname === link.href
              return isHash ? (
                <a aria-current={active ? "location" : undefined} href={link.href} key={link.href}>{link.label}</a>
              ) : (
                <Link aria-current={active ? "page" : undefined} to={link.href} key={link.href}>{link.label}</Link>
              )
            })}
          </div>
          <div className="msn-actions">
            <a className="msn-button msn-cta" href={inviteUrl} target="_blank" rel="noreferrer" aria-label="Invite the bot (opens in a new tab)">Invite</a>
          </div>
        </div>
      </nav>
    </>
  )
}

const STYLES = `
.msn-nav{--paper:#121413;--surface:#1b1e1c;--ink:#edf1ee;--muted:#9aa49e;--line:rgba(255,255,255,.1);--accent:#5fc9a1;position:fixed;z-index:100;top:0;right:0;left:0;display:flex;justify-content:center;padding:0 20px;pointer-events:none;font-family:"Geist Variable",ui-sans-serif,system-ui,sans-serif;color:var(--ink)}
.msn-nav *{box-sizing:border-box}.msn-nav a{color:inherit;text-decoration:none}.msn-shell{pointer-events:auto;display:flex;align-items:center;justify-content:space-between;gap:22px;width:100%;max-width:1180px;height:68px;margin-top:0;padding:0 12px 0 22px;border:1px solid transparent;border-radius:20px;background:transparent;transition:max-width .5s cubic-bezier(.34,1.32,.5,1),height .38s cubic-bezier(.34,1.2,.5,1),margin-top .38s ease,padding .38s ease,background-color .3s ease,border-color .3s ease,box-shadow .4s ease}
.msn-nav.is-floating .msn-shell{max-width:960px;height:58px;margin-top:12px;padding:0 10px 0 20px;border-color:color-mix(in srgb,var(--ink) 10%,transparent);background:color-mix(in srgb,var(--paper) 35%,transparent);-webkit-backdrop-filter:saturate(160%) blur(20px);backdrop-filter:saturate(160%) blur(20px)}
.msn-nav.is-compact .msn-shell{max-width:560px;height:52px}.msn-brand{display:inline-flex;align-items:center;gap:10px;flex:none;font-size:25px;font-weight:800;line-height:1;letter-spacing:-.045em;transition:font-size .38s cubic-bezier(.34,1.2,.5,1),transform .18s ease}.msn-brand img{border-radius:50%}.msn-brand:hover{transform:translateY(-1px)}.msn-nav.is-compact .msn-brand{font-size:22px}
.msn-links{display:flex;gap:28px;max-width:640px;overflow:hidden;opacity:1;transition:max-width .45s cubic-bezier(.34,1.2,.5,1),opacity .28s ease,transform .3s ease,gap .35s ease}.msn-nav.is-compact .msn-links{max-width:0;gap:0;opacity:0;transform:translateY(-8px);pointer-events:none}.msn-links a{position:relative;color:var(--muted);font-size:14px;font-weight:480;white-space:nowrap;transition:color .15s ease}.msn-links a:after{content:"";position:absolute;right:0;bottom:-5px;left:0;height:2px;border-radius:2px;background:var(--ink);transform:scaleX(0);transform-origin:0 50%;transition:transform .28s cubic-bezier(.2,.7,.2,1)}.msn-links a:hover,.msn-links a[aria-current]{color:var(--ink)}.msn-links a:hover:after,.msn-links a[aria-current]:after{transform:scaleX(1)}
.msn-actions{display:flex;flex:none;align-items:center;gap:10px}.msn-button{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:42px;padding:0 18px;border:1px solid var(--line);border-radius:9px;background:var(--surface);color:var(--ink);font-size:13.5px;font-weight:620;white-space:nowrap;transition:height .38s ease,font-size .38s ease,padding .38s ease,background-color .18s ease,transform .18s ease,box-shadow .22s ease}.msn-button svg{width:17px;height:17px}.msn-button:hover{background:color-mix(in srgb,var(--surface) 80%,var(--paper));transform:none}.msn-button:active{transform:translateY(0) scale(.97)}.msn-cta{border-color:transparent;background:var(--ink);color:var(--paper)}.msn-cta:hover{background:color-mix(in srgb,var(--ink) 85%,var(--paper))}.msn-nav.is-compact .msn-button{height:36px;padding:0 14px;font-size:12.5px}
@media(max-width:900px){.msn-links{display:none}.msn-nav.is-floating .msn-shell{max-width:680px}.msn-nav.is-compact .msn-shell{max-width:520px}}
@media(max-width:560px){.msn-nav{padding:0 12px}.msn-shell,.msn-nav.is-floating .msn-shell,.msn-nav.is-compact .msn-shell{gap:12px;height:60px;padding:0 4px 0 10px}.msn-nav.is-floating .msn-shell,.msn-nav.is-compact .msn-shell{height:52px}.msn-brand,.msn-nav.is-compact .msn-brand{font-size:23px}.msn-actions{gap:7px}.msn-button,.msn-nav.is-compact .msn-button{height:40px;padding:0 13px;font-size:13px}.msn-nav.is-floating .msn-button,.msn-nav.is-compact .msn-button{height:36px}}
@media(prefers-reduced-motion:reduce){.msn-nav *,.msn-shell,.msn-shell{transition-duration:.01ms!important}}
`
