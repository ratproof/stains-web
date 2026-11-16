import type { ReactElement, SVGProps } from "react";

export type IconType = (p: SVGProps<SVGSVGElement>) => ReactElement;

// Filled 24x24 icon from one path. evenodd = cut inner shapes out.
const f = (d: string, evenodd = false): IconType => (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d={d} fillRule={evenodd ? "evenodd" : "nonzero"} clipRule={evenodd ? "evenodd" : "nonzero"} />
  </svg>
);

const person = "M9 12a4 4 0 100-8 4 4 0 000 8zm0 2c-3 0-8 1.5-8 4.5V20h9.3a6.5 6.5 0 013.1-7.4C12.2 14.2 10.4 14 9 14z";

export const AtSign = f("M12 2a10 10 0 100 20h5v-2h-5a8 8 0 118-8v1.4c0 .8-.7 1.6-1.5 1.6s-1.5-.8-1.5-1.6V12a5 5 0 10-1.5 3.5A3.5 3.5 0 0020 13.4V12A10 10 0 0012 2zm0 13a3 3 0 110-6 3 3 0 010 6z");
export const BadgeCheck = f("M23 12l-2.4-2.8.3-3.7-3.6-.8-1.9-3.2L12 3 8.6 1.5 6.7 4.7l-3.6.8.3 3.7L1 12l2.4 2.8-.3 3.7 3.6.8 1.9 3.2 3.4-1.5 3.4 1.5 1.9-3.2 3.6-.8-.3-3.7L23 12zm-12.9 4.7l-3.8-3.8 1.5-1.5 2.3 2.3 5.9-5.9 1.5 1.5-7.4 7.4z");
export const BookOpen = f("M12 6.5C10.5 5.4 8.4 5 6.5 5S3 5.4 2 6v14c1-.6 2.6-1 4.5-1s4 .4 5.5 1.5V6.5zm1 0V21c1.5-1.1 3.6-1.5 5.5-1.5s3.5.4 4.5 1V6c-1-.6-2.6-1-4.5-1S14.5 5.4 13 6.5z");
export const Check = f("M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z");
export const Clock = f("M12 2a10 10 0 100 20 10 10 0 000-20zm4.2 13.2L11 12.1V6h1.5v5.3l4.5 2.7-.8 1.2z");
export const Crown = f("M3 7l4.5 4L12 4l4.5 7L21 7l-2 12H5L3 7zm2.6 13h12.8v2H5.6v-2z");
export const EyeOff = f("M12 7c2.8 0 5 2.2 5 5 0 .7-.1 1.3-.4 1.8l2.9 2.9c1.5-1.3 2.7-2.9 3.4-4.7-1.7-4.4-6-7.5-11-7.5-1.4 0-2.7.3-4 .7l2.2 2.2c.5-.3 1.2-.4 1.9-.4zM2 4.3l2.3 2.3.5.5C3.1 8.3 1.8 10 1 12c1.7 4.4 6 7.5 11 7.5 1.6 0 3-.3 4.4-.8l.4.4L19.7 22l1.3-1.3L3.3 3 2 4.3zm5.5 5.5l1.6 1.6c-.1.2-.1.4-.1.6 0 1.7 1.3 3 3 3 .2 0 .4 0 .7-.1l1.5 1.5c-.7.3-1.4.5-2.2.5-2.8 0-5-2.2-5-5 0-.8.2-1.5.5-2.1zm4.3-.8l3.2 3.2v-.2c0-1.7-1.3-3-3-3h-.2z");
export const Folder = f("M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-8l-2-2z");
export const Gamepad2 = f("M21 6H3a2 2 0 00-2 2v8a2 2 0 002 2h18a2 2 0 002-2V8a2 2 0 00-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm4-3a1.5 1.5 0 110-3 1.5 1.5 0 010 3z");
export const Gift = f("M20 6h-2.2c.1-.3.2-.6.2-1a3 3 0 00-3-3c-1 0-2 .5-2.5 1.4L12 4.1l-.5-.7A3 3 0 009 2a3 3 0 00-3 3c0 .4.1.7.2 1H4a2 2 0 00-2 2v3h20V8a2 2 0 00-2-2zM9 6a1 1 0 110-2 1 1 0 010 2zm6 0a1 1 0 110-2 1 1 0 010 2zM3 12v7a2 2 0 002 2h6v-9H3zm10 0v9h6a2 2 0 002-2v-7h-8z");
export const Headphones = f("M12 1a9 9 0 00-9 9v7a3 3 0 003 3h3v-8H5v-2a7 7 0 1114 0v2h-4v8h3a3 3 0 003-3v-7a9 9 0 00-9-9z");
export const LayoutGrid = f("M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z");
export const Link2 = f("M3.9 12a3.1 3.1 0 013.1-3.1h4V7H7a5 5 0 000 10h4v-1.9H7A3.1 3.1 0 013.9 12zM8 13h8v-2H8v2zm9-6h-4v1.9h4a3.1 3.1 0 010 6.2h-4V17h4a5 5 0 000-10z");
export const Lock = f("M18 8h-1V6A5 5 0 007 6v2H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2zm-6 9a2 2 0 110-4 2 2 0 010 4zm3.1-9H8.9V6a3.1 3.1 0 016.2 0v2z");
export const Unlock = f("M12 17a2 2 0 100-4 2 2 0 000 4zm6-9h-1V6A5 5 0 007 6h1.9a3.1 3.1 0 016.2 0v2H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2z");
export const Mail = f("M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z");
export const MessageSquare = f("M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z");
export const Mic = f("M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3zm5.3-3c0 3-2.5 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.4 2.7 6.2 6 6.7V21h2v-3.3c3.3-.5 6-3.3 6-6.7h-1.7z");
export const MousePointerClick = f("M5 3l14 8-6.2 1.6L16.5 19l-2.6 1.3-3.5-6.4L5 18V3z");
export const Music = f("M12 3v10.6A4 4 0 1014 17V7h4V3h-6z");
export const Palette = f("M12 2a10 10 0 100 20c1.4 0 2.5-1.1 2.5-2.5 0-.6-.2-1.2-.6-1.7-.1-.1-.1-.2-.1-.3 0-.3.2-.5.5-.5H16a6 6 0 006-6c0-5-4.5-9-10-9zM6.5 12a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3-4a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3 4a1.5 1.5 0 110-3 1.5 1.5 0 010 3z", true);
export const Pencil = f("M3 17.3V21h3.8L17.8 9.9l-3.8-3.8L3 17.3zM20.7 7a1 1 0 000-1.4l-2.3-2.3a1 1 0 00-1.4 0l-1.8 1.8 3.7 3.7L20.7 7z");
export const RefreshCw = f("M17.7 6.3A8 8 0 0012 4a8 8 0 100 16c3.7 0 6.8-2.5 7.7-6h-2.1A6 6 0 1112 6c1.7 0 3.1.7 4.2 1.8L13 11h7V4l-2.3 2.3z");
export const Flag = f("M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z");
export const Terminal = f("M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm3.3 4.3L6 9.6 8.4 12 6 14.4l1.3 1.3 3.7-3.7-3.7-3.7zM12 15h6v-1.8h-6V15z", true);
export const TriangleAlert = f("M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z");
export const Users = f("M16 11a3 3 0 100-6 3 3 0 000 6zm-8 0a3 3 0 100-6 3 3 0 000 6zm0 2c-2.3 0-7 1.2-7 3.5V19h14v-2.5c0-2.3-4.7-3.5-7-3.5zm8 0c-.3 0-.6 0-1 .1 1.2.8 2 2 2 3.4V19h6v-2.5c0-2.3-4.7-3.5-7-3.5z");
export const Volume2 = f("M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8v8a4.5 4.5 0 002.5-4zM14 3.2v2.1c2.9.9 5 3.5 5 6.7s-2.1 5.8-5 6.7v2.1c4-.9 7-4.5 7-8.8s-3-7.9-7-8.8z");
export const X = f("M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4l5.6 5.6L5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6z");

export const UserPlus: IconType = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M15 12a4 4 0 100-8 4 4 0 000 8zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z" />
  </svg>
);
export const UserCheck: IconType = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d={person} />
    <path d="M16 17.5l1.9 1.9 3.6-3.7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const UserX: IconType = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d={person} />
    <path d="M16.5 15.5l4 4m0-4l-4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ---- Brand icons ----
const base = { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true } as const;
type P = SVGProps<SVGSVGElement>;

// Vinyl style disc: outer disc, hole, center dot
export const LastfmIcon = (p: P) => (
  <svg {...base} {...p}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 5.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2.5a2 2 0 100 4 2 2 0 000-4z" />
  </svg>
);

export const TikTokIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

export const InstagramIcon = (p: P) => (
  <svg {...base} {...p}>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.5 2h9A5.5 5.5 0 0122 7.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.5-3.7a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" />
  </svg>
);

export const RedditIcon = (p: P) => (
  <svg {...base} {...p}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 8c-5 0-9 2.6-9 6s4 6 9 6 9-2.6 9-6-4-6-9-6zM9 12.2a1.3 1.3 0 110 2.6 1.3 1.3 0 010-2.6zm6 0a1.3 1.3 0 110 2.6 1.3 1.3 0 010-2.6zM8.8 16.4c1.7 1.3 4.7 1.3 6.4 0l-.7-.9c-1.3.9-3.7.9-5 0l-.7.9z" />
    <path d="M12 8.2l1.2-4.2 4 1" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="18.2" cy="5.3" r="1.6" />
    <circle cx="3.8" cy="11.5" r="1.8" />
    <circle cx="20.2" cy="11.5" r="1.8" />
  </svg>
);

export const SnapchatIcon = (p: P) => (
  <svg {...base} {...p}>
    <path stroke="currentColor" strokeWidth="1" strokeLinejoin="round" d="M12 3.5c-2.8 0-4.8 2-4.8 4.8v2.2c-.8.3-2 .6-2 1.2 0 .8 1.5 1 2 1.4-.3 1.4-1.6 2.3-2.5 2.6.3.8 1.8.9 3 1.1.4.5.6 1.2 1.5 1.2.9 0 1.5-.8 2.8-.8s1.9.8 2.8.8c.9 0 1.1-.7 1.5-1.2 1.2-.2 2.7-.3 3-1.1-.9-.3-2.2-1.2-2.5-2.6.5-.4 2-.6 2-1.4 0-.6-1.2-.9-2-1.2V8.3c0-2.8-2-4.8-4.8-4.8Z" />
  </svg>
);
