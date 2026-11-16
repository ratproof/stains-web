import type { SVGProps } from "react";
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
