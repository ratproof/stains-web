import { useEffect, useState, type ReactNode } from "react";
import {
  AtSign, BadgeCheck, BookOpen, Check, Clock, Crown, EyeOff, Folder, Gamepad2, Gift, Headphones, LayoutGrid, Link2, Lock, Mail,
  MessageSquare, Mic, MousePointerClick, Music, Palette, Pencil, RefreshCw, Flag, Terminal, TriangleAlert, Unlock, UserCheck, UserPlus, Users, UserX, Volume2, X,
  type IconType,
} from "../ui/Icons";

const chip = "flex min-w-[8.75rem] items-center gap-2.5 whitespace-nowrap rounded-xl border border-white/10 bg-[#17171d] py-2 pl-2 pr-4 text-[13px] font-medium shadow-[0_6px_18px_rgba(0,0,0,.45)]";
const panel = "mx-auto w-full max-w-sm rounded-2xl border border-white/10 bg-[#15151a] p-4";
const hi = "text-accent-soft";
const gPanel = `${panel} flex h-72 flex-col shadow-[0_10px_40px_rgba(0,0,0,.45)]`;
const ok = "text-emerald-400", bad = "text-red-400";

// Small tinted tile that holds the icon inside a chip
function Tile({ Icon, tone = hi }: { Icon: IconType; tone?: string }) {
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-gradient-to-b from-white/[0.12] to-white/[0.04]">
      <Icon className={`h-[18px] w-[18px] ${tone}`} />
    </span>
  );
}

interface Node { x: number; y: number; label: string; Icon: IconType; tone?: string }
// Center icon with dotted elbow lines to chips. Coordinates are in a 400x240 box.
function Diagram({ center: Center, nodes }: { center: IconType; nodes: Node[] }) {
  return (
    <div className="relative mx-auto aspect-[5/3] w-full max-w-md">
      <svg viewBox="0 0 400 240" className="absolute inset-0 h-full w-full" aria-hidden>
        <g fill="none" stroke="#fff" strokeOpacity=".3" strokeDasharray="3 5" strokeLinecap="round">
          {nodes.map((n) => <path key={n.label} d={`M200 120H${n.x}V${n.y}`} />)}
        </g>
      </svg>
      <span className="icon-circle absolute -translate-x-1/2 -translate-y-1/2 shadow-[0_0_44px_rgba(106,160,255,.28)]" style={{ left: "50%", top: "50%" }}><Center className="h-8 w-8 text-accent-soft" /></span>
      {nodes.map(({ x, y, label, Icon, tone }) => (
        <span key={label} className={`${chip} absolute -translate-x-1/2 -translate-y-1/2`} style={{ left: `${x / 4}%`, top: `${y / 2.4}%` }}>
          <Tile Icon={Icon} tone={tone} />{label}
        </span>
      ))}
    </div>
  );
}

const Chip = ({ Icon, label, className = "", style }: { Icon: IconType; label: string; className?: string; style?: React.CSSProperties }) => (
  <span className={`${chip} absolute ${className}`} style={style}><Tile Icon={Icon} />{label}</span>
);

export const FilterDiagram = () => (
  <div className="relative mx-auto aspect-[5/3] w-full max-w-md">
    <svg viewBox="0 0 400 240" className="absolute inset-0 h-full w-full" fill="none" stroke="#fff" strokeOpacity=".16" strokeDasharray="2 4" aria-hidden>
      <path d="M200 0V240M120 100H200M300 52V105H200M100 195H150V105M250 195V125H200" />
    </svg>
    <Chip Icon={Link2} label="Links" style={{ left: "14%", top: "34%" }} />
    <Chip Icon={AtSign} label="Mass Mentions" style={{ right: "4%", top: "14%" }} />
    <Chip Icon={TriangleAlert} label="Spoilers" style={{ left: "4%", top: "76%" }} />
    <Chip Icon={Mail} label="Invites" style={{ left: "52%", top: "78%" }} />
  </div>
);
export const ShieldArt = () => (
  <svg viewBox="0 0 260 220" className="mx-auto h-56" aria-hidden>
    <defs><linearGradient id="sg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#cfe0ff" /><stop offset="1" stopColor="#14306b" /></linearGradient></defs>
    <path d="M20 40H240M20 190H240M60 8V212M200 8V212" stroke="#fff" strokeOpacity=".16" strokeDasharray="2 4" fill="none" />
    <path d="M130 22 192 44V112C192 150 164 176 130 190 96 176 68 150 68 112V44Z" fill="url(#sg)" stroke="#10203f" strokeWidth="8" strokeLinejoin="round" />
    <circle cx="130" cy="96" r="14" fill="none" stroke="#0a1426" strokeWidth="6" />
    <path d="M130 110V152M130 130H144M130 146H142" stroke="#0a1426" strokeWidth="6" strokeLinecap="round" fill="none" />
  </svg>
);
export const AutoroleArt = () => <Diagram center={UserPlus} nodes={[
  { x: 80, y: 50, label: "@Member", Icon: BadgeCheck }, { x: 325, y: 50, label: "@Verified", Icon: Check }, { x: 200, y: 200, label: "@Updates", Icon: Mail }]} />;
export const ReactionRolesArt = () => <Diagram center={MousePointerClick} nodes={[
  { x: 80, y: 50, label: "Gamer", Icon: Gamepad2 }, { x: 325, y: 50, label: "Artist", Icon: Palette },
  { x: 80, y: 190, label: "Music", Icon: Music }, { x: 325, y: 190, label: "Reader", Icon: BookOpen }]} />;
export const SetupArt = () => <Diagram center={Terminal} nodes={[
  { x: 75, y: 55, label: "Category", Icon: Folder }, { x: 325, y: 55, label: "Join to Create", Icon: Volume2 }, { x: 200, y: 200, label: "Control Panel", Icon: LayoutGrid }]} />;
export const PermissionsArt = () => <Diagram center={Mic} nodes={[
  { x: 80, y: 55, label: "@friend", Icon: Check, tone: ok }, { x: 325, y: 55, label: "@troll", Icon: X, tone: bad }, { x: 200, y: 200, label: "@guest", Icon: Check, tone: ok }]} />;
function PanelHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="icon-tile !h-10 !w-10"><Gift className="h-5 w-5 text-accent-soft" /></span>
      <div className="min-w-0"><div className="truncate text-sm font-semibold">{title}</div><div className="truncate text-xs text-muted">{sub}</div></div>
    </div>
  );
}

const reqs: [string, string, IconType][] = [["Has role", "@Member", BadgeCheck], ["Messages", "500+", MessageSquare], ["Voice time", "60 min", Clock], ["In voice", "Required", Headphones]];
export const RequirementsArt = () => (
  <div className={`${gPanel} max-w-md`}>
    <PanelHead title="Entry requirements" sub="Members must meet all of these" />
    <div className="mt-4 flex flex-1 flex-col gap-2">
      {reqs.map(([l, v, I]) => (
        <div key={l} className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3">
          <Tile Icon={I} />
          <span className="flex-1 text-[13px] font-medium">{l}</span>
          <span className="text-xs text-muted">{v}</span>
          <span className="grid h-5 w-5 place-items-center rounded-md bg-emerald-400/10"><Check className="h-3.5 w-3.5 text-emerald-400" /></span>
        </div>))}
    </div>
  </div>
);

const acts: [string, IconType, boolean][] = [["Reroll", RefreshCw, false], ["Edit", Pencil, false], ["End", Flag, true]];
export const ManageArt = () => (
  <div className={gPanel}>
    <PanelHead title="Nitro Giveaway" sub="Manage" />
    <div className="mt-4 flex flex-1 flex-col gap-2">
      {acts.map(([l, I, danger]) => (
        <div key={l} className={`flex flex-1 items-center gap-3 rounded-xl border px-3 text-[13px] font-medium ${danger ? "border-red-400/20 bg-red-400/[0.06]" : "border-white/10 bg-white/[0.03]"}`}>
          <Tile Icon={I} tone={danger ? bad : hi} />{l}
        </div>))}
    </div>
  </div>
);

const tiles: [string, IconType][] = [["Lock", Lock], ["Unlock", Unlock], ["Limit", Users], ["Rename", Pencil], ["Claim", Crown], ["Permit", UserCheck], ["Reject", UserX], ["Hide", EyeOff]];
const Avatars = () => <span className="flex -space-x-2" aria-hidden>{["#6aa0ff", "#14306b", "#a9c8ff"].map((c) => <i key={c} className="h-6 w-6 rounded-full border-2 border-[#15151a]" style={{ background: c }} />)}</span>;
export const PanelArt = () => (
  <div className={panel}>
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-sm font-medium"><Tile Icon={Mic} />Quiet Room</span><Avatars />
    </div>
    <div className="mt-4 grid grid-cols-4 gap-2">
      {tiles.map(([l, I]) => (
        <div key={l} className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] py-3 text-[11px] text-muted">
          <I className="h-5 w-5 text-accent-soft" />{l}</div>))}
    </div>
    <div className="mt-4 space-y-2 border-t border-white/10 pt-3 text-xs text-muted">
      <div className="flex justify-between"><span>Owner</span><span className="text-fg">@you</span></div>
      <div className="flex justify-between"><span>User limit</span><span className="text-fg">5</span></div>
      <div className="flex justify-between"><span>Status</span><span className="text-fg">Locked</span></div>
    </div>
  </div>
);

export function LiveGiveawayArt() {
  const total = 6 * 3600;
  const [s, setS] = useState(2 * 3600 + 14 * 60 + 9);
  useEffect(() => { const t = setInterval(() => setS((v) => (v > 0 ? v - 1 : 0)), 1000); return () => clearInterval(t); }, []);
  const parts: [string, number][] = [["Hours", Math.floor(s / 3600)], ["Min", Math.floor((s % 3600) / 60)], ["Sec", s % 60]];
  return (
    <div className={gPanel}>
      <div className="flex items-center gap-3">
        <span className="icon-tile !h-11 !w-11"><Gift className="h-6 w-6 text-accent-soft" /></span>
        <div className="min-w-0 flex-1"><div className="font-semibold">Nitro Giveaway</div><div className="text-xs text-muted">Hosted by @you</div></div>
        <span className="flex items-center gap-1.5 rounded-md bg-emerald-400/10 px-2 py-1 text-[11px] font-medium text-emerald-400">
          <i className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Live
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {parts.map(([l, n]) => (
          <div key={l} className="rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-center">
            <div className="font-mono text-2xl font-semibold tabular-nums">{String(n).padStart(2, "0")}</div>
            <div className="text-[11px] uppercase tracking-wide text-muted">{l}</div></div>))}
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-[#6aa0ff] transition-[width] duration-1000 ease-linear" style={{ width: `${(s / total) * 100}%` }} />
      </div>
      <div className="mt-auto flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs text-muted"><Avatars />128 entries</span>
        <span className="rounded-lg bg-[#6aa0ff] px-5 py-2 text-xs font-semibold text-[#0a1426]">Enter</span>
      </div>
    </div>
  );
}
export type ArtMap = Record<string, ReactNode>;
