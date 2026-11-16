import { useId } from "react";

export default function WaveDivider({
  lines = 12,
  gap = 4,
  className = "",
}: {
  lines?: number;
  gap?: number;
  className?: string;
}) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      aria-hidden
      className={`h-40 w-full text-white/15 ${className}`}
    >
      <defs>
        <linearGradient id={`${id}-fade`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.2" />
        </linearGradient>
        <mask id={`${id}-mask`}>
          <rect width="1440" height="200" fill={`url(#${id}-fade)`} />
        </mask>
      </defs>
      <g mask={`url(#${id}-mask)`} fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 5">
        {Array.from({ length: lines }, (_, i) => (
          <path
            key={i}
            d="M0 150 C 380 150 520 30 720 30 S 1100 150 1440 170"
            transform={`translate(0 ${i * gap})`}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
}
