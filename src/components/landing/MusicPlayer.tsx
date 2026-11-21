import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Put audio in   public/music/<file>.mp3
 * Put covers in  public/music/covers/<file>.jpg
 * Then edit TRACKS below. src/cover are served from the site root.
 */
type Track = {
  title: string;
  artist: string;
  src: string;
  cover: string;
};

const TRACKS: Track[] = [
  { title: "Run Away", artist: "d4vd", src: "/music/run-away.mp3", cover: "/music/covers/run-away.jpg" },
  { title: "introvert", artist: "Brakence", src: "/music/introvert.mp3", cover: "/music/covers/introvert.jpg" },
  { title: "PRETTY PRIVILEGE", artist: "Quadeca", src: "/music/pretty-privilege.mp3", cover: "/music/covers/pretty-privilege.jpg" },
  { title: "cant get out (fromthe...)", artist: "lieu", src: "/music/cant-get-out.mp3", cover: "/music/covers/cant-get-out.jpg" },
  { title: "Contraband", artist: "Colato, xaviersobased", src: "/music/contraband.mp3", cover: "/music/covers/contraband.jpg" },
  { title: "stick (feat. kmoe)", artist: "quannnic, kmoe", src: "/music/stick.mp3", cover: "/music/covers/stick.jpg" },
];

const BARS = 90;

/* ---------- icons (all filled) ---------- */
const Icon = ({ d, className = "h-5 w-5" }: { d: string; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d={d} />
  </svg>
);
const PLAY = "M8 5v14l11-7z";
const PAUSE = "M6 5h4v14H6zM14 5h4v14h-4z";
const PREV = "M6 6h2v12H6zM9.5 12 18 18V6z";
const NEXT = "M16 6h2v12h-2zM6 18l8.5-6L6 6z";
const SHUFFLE =
  "M10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z";
const VOLUME =
  "M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z";

/* ---------- platform logos (simplified, swap for official assets if you want) ---------- */
const PLATFORMS: { name: string; logo: JSX.Element }[] = [
  {
    name: "Tidal",
    logo: (
      <svg viewBox="0 0 24 24" fill="#fff" className="h-6 w-6" aria-hidden="true">
        <path d="M12 3.5 15.5 7 12 10.5 8.5 7zM5 7.5 8.5 11 5 14.5 1.5 11zM19 7.5 22.5 11 19 14.5 15.5 11zM12 11.5 15.5 15 12 18.5 8.5 15z" />
      </svg>
    ),
  },
  {
    name: "Deezer",
    logo: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <g fill="#A238FF">
          <rect x="1" y="17" width="4" height="3" />
          <rect x="6" y="17" width="4" height="3" />
          <rect x="11" y="17" width="4" height="3" />
          <rect x="16" y="17" width="4" height="3" />
          <rect x="6" y="13" width="4" height="3" />
          <rect x="11" y="13" width="4" height="3" />
          <rect x="16" y="13" width="4" height="3" />
          <rect x="11" y="9" width="4" height="3" />
          <rect x="16" y="9" width="4" height="3" />
          <rect x="16" y="5" width="4" height="3" />
        </g>
      </svg>
    ),
  },
  {
    name: "Spotify",
    logo: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="#1DB954" />
        <g fill="none" stroke="#0b0b0d" strokeLinecap="round">
          <path d="M6 9.2c4-1.2 8.4-.8 12 1.2" strokeWidth="1.9" />
          <path d="M6.6 12.6c3.4-1 7-.6 10 1.1" strokeWidth="1.7" />
          <path d="M7.3 15.8c2.8-.8 5.5-.5 8 .9" strokeWidth="1.5" />
        </g>
      </svg>
    ),
  },
  {
    name: "YouTube",
    logo: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <rect x="1" y="4.5" width="22" height="15" rx="4.5" fill="#FF0000" />
        <path d="M10 9v6l5.5-3z" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "Apple Music",
    logo: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <rect x="1" y="1" width="22" height="22" rx="5.5" fill="#FA243C" />
        <path
          fill="#fff"
          d="M16.5 5.5v9.2a2.4 2.4 0 1 1-1.5-2.2V8.3l-5 1.1v7.3a2.4 2.4 0 1 1-1.5-2.2V7.8z"
        />
      </svg>
    ),
  },
  {
    name: "SoundCloud",
    logo: (
      <svg viewBox="0 0 24 24" fill="#FF5500" className="h-6 w-6" aria-hidden="true">
        <rect x="1" y="12" width="1.4" height="5" />
        <rect x="3.4" y="10.5" width="1.4" height="6.5" />
        <rect x="5.8" y="9.5" width="1.4" height="7.5" />
        <rect x="8.2" y="9" width="1.4" height="8" />
        <path d="M11 17V8.5c1-.9 2.2-1.4 3.6-1.4 2.7 0 4.9 1.9 5.3 4.4h.6a2.7 2.7 0 0 1 0 5.5z" />
      </svg>
    ),
  },
];

/* ---------- helpers ---------- */
const fmt = (s: number) => {
  if (!isFinite(s) || s < 0) return "--:--";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

// deterministic pseudo random heights so each track keeps its own shape
const makeBars = (seed: string) => {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  const out: number[] = [];
  for (let i = 0; i < BARS; i++) {
    h = Math.imul(h ^ (h >>> 15), 2246822519) >>> 0;
    const base = 0.25 + (h % 1000) / 1000 * 0.75;
    const envelope = 0.55 + 0.45 * Math.sin((i / BARS) * Math.PI);
    out.push(Math.max(0.12, base * envelope));
  }
  return out;
};

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [durations, setDurations] = useState<Record<number, number>>({});

  const track = TRACKS[index];
  const bars = useMemo(() => makeBars(track.title + track.artist), [track]);
  const progress = duration > 0 ? time / duration : 0;

  // load durations for the queue
  useEffect(() => {
    TRACKS.forEach((t, i) => {
      const a = new Audio();
      a.preload = "metadata";
      a.src = t.src;
      a.onloadedmetadata = () => setDurations((d) => ({ ...d, [i]: a.duration }));
    });
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const go = useCallback((i: number, autoplay: boolean) => {
    setIndex(i);
    setTime(0);
    setDuration(0);
    setPlaying(autoplay);
  }, []);

  // keep the element in sync with state
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) a.play().catch(() => setPlaying(false));
    else a.pause();
  }, [playing, index]);

  const next = useCallback(() => {
    if (shuffle && TRACKS.length > 1) {
      let n = index;
      while (n === index) n = Math.floor(Math.random() * TRACKS.length);
      go(n, true);
    } else {
      go((index + 1) % TRACKS.length, true);
    }
  }, [shuffle, index, go]);

  const prev = () => {
    if (time > 3 && audioRef.current) {
      audioRef.current.currentTime = 0;
      return;
    }
    go((index - 1 + TRACKS.length) % TRACKS.length, true);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    a.currentTime = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * duration;
  };

  const queue = TRACKS.map((t, i) => ({ t, i }));

  return (
    <section className="relative w-full px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Play Music</h2>
          <p className="mt-3 text-base text-white/60 sm:text-lg">
            Premium audio quality and commands for a superior music experience.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_220px]">
          {/* player card */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0d]">
            <audio
              ref={audioRef}
              src={track.src}
              preload="metadata"
              onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onEnded={next}
            />

            <div className="grid md:grid-cols-[1fr_340px]">
              {/* now playing */}
              <div className="flex flex-col p-6 sm:p-8">
                <div className="mb-4 text-right font-mono text-xs tracking-widest text-white/40">
                  {String(index + 1).padStart(2, "0")} / {String(TRACKS.length).padStart(2, "0")}
                </div>

                <div className="flex items-center gap-6">
                  <img
                    src={track.cover}
                    alt={`${track.title} cover`}
                    className="h-32 w-32 shrink-0 rounded-2xl border border-white/10 bg-white/5 object-cover sm:h-44 sm:w-44"
                  />
                  <div className="min-w-0">
                    <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
                      {track.artist}
                    </div>
                    <div className="mt-1 truncate text-3xl font-semibold text-white sm:text-4xl">
                      {track.title}
                    </div>
                  </div>
                </div>

                {/* waveform */}
                <div className="mt-10">
                  <div
                    onClick={seek}
                    className="flex h-10 w-full cursor-pointer items-center gap-[3px]"
                    role="slider"
                    aria-label="Seek"
                    aria-valuemin={0}
                    aria-valuemax={Math.round(duration)}
                    aria-valuenow={Math.round(time)}
                  >
                    {bars.map((h, i) => (
                      <span
                        key={i}
                        className={`flex-1 rounded-sm ${i / BARS < progress ? "bg-white" : "bg-white/20"}`}
                        style={{ height: `${h * 100}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between font-mono text-xs text-white/50">
                    <span>{fmt(time)}</span>
                    <span>-{fmt(Math.max(0, duration - time))}</span>
                  </div>
                </div>
              </div>

              {/* up next */}
              <div className="border-t border-white/10 p-4 md:border-l md:border-t-0">
                <div className="px-2 pb-3 pt-1 font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
                  Up next
                </div>
                <ul className="space-y-1">
                  {queue.map(({ t, i }) => {
                    const active = i === index;
                    return (
                      <li key={t.src}>
                        <button
                          onClick={() => (active ? setPlaying((p) => !p) : go(i, true))}
                          className={`group flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors ${
                            active ? "bg-white/10" : "hover:bg-white/5"
                          }`}
                        >
                          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-white/5">
                            <img src={t.cover} alt="" className="h-full w-full object-cover" />
                            {active && (
                              <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                                <Icon d={playing ? PAUSE : PLAY} className="h-4 w-4" />
                              </span>
                            )}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-white">{t.title}</span>
                            <span className="block truncate text-xs text-white/50">{t.artist}</span>
                          </span>
                          <span className="font-mono text-xs text-white/40">{fmt(durations[i] ?? NaN)}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* controls */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center border-t border-white/10 px-6 py-5">
              <div>
                <button
                  onClick={() => setShuffle((s) => !s)}
                  aria-label="Shuffle"
                  aria-pressed={shuffle}
                  className={`rounded-lg p-2 transition-colors ${
                    shuffle ? "text-white" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  <Icon d={SHUFFLE} />
                </button>
              </div>

              <div className="flex items-center gap-6">
                <button onClick={prev} aria-label="Previous" className="text-white/70 transition-colors hover:text-white">
                  <Icon d={PREV} className="h-6 w-6" />
                </button>
                <button
                  onClick={() => setPlaying((p) => !p)}
                  aria-label={playing ? "Pause" : "Play"}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#0b0b0d] transition-transform hover:scale-105 active:scale-95"
                >
                  <Icon d={playing ? PAUSE : PLAY} className="h-6 w-6" />
                </button>
                <button onClick={next} aria-label="Next" className="text-white/70 transition-colors hover:text-white">
                  <Icon d={NEXT} className="h-6 w-6" />
                </button>
              </div>

              <div className="flex items-center justify-end gap-3">
                <Icon d={VOLUME} className="h-5 w-5 text-white/50" />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  aria-label="Volume"
                  className="h-1 w-24 cursor-pointer appearance-none rounded-sm bg-white/20 accent-white sm:w-32"
                />
              </div>
            </div>
          </div>

          {/* platforms */}
          <ul className="hidden grid-cols-1 content-center gap-6 lg:grid">
            {PLATFORMS.map((p) => (
              <li key={p.name} className="flex items-center justify-between gap-4">
                {p.logo}
                <span className="text-lg font-medium text-white">{p.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
