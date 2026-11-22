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
  { title: "#getdrained #101", artist: "*67", src: "/music/getdrained.mp3", cover: "/music/covers/getdrained.jpg" },
  { title: "FATHER (feat. Travis Scott)", artist: "Kanye West", src: "/music/FATHER.mp3", cover: "/music/covers/FATHER.jpg" },
  { title: "RAGING WOLF", artist: "Sematary", src: "/music/RAGING.mp3", cover: "/music/covers/RAGING.jpg" },
  { title: "classified", artist: "selectkill", src: "/music/classified.mp3", cover: "/music/covers/classified.jpg" },
  { title: "its easier to talk to uu in my head, i like that version of you more instead", artist: "wifiskeleton", src: "/music/easier.mp3", cover: "/music/covers/easier.jpg" },
  { title: "drama (feat. luvbackpack)", artist: "osquinn", src: "/music/drama.mp3", cover: "/music/covers/drama.jpg" },
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

/* ---------- platform logos (brand paths from simple-icons, CC0) ---------- */
const PLATFORMS: { name: string; path: string; color: string }[] = [
  {
    name: "Tidal",
    color: "#FFFFFF",
    path: "M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996 4.004 12l4.004-4.004L12.012 12l-4.004 4.004 4.004 4.004 4.004-4.004L12.012 12l4.004-4.004-4.004-4.004zM16.042 7.996l3.979-3.979L24 7.996l-3.979 3.979z",
  },
  {
    name: "Deezer",
    color: "#A238FF",
    path: "M.693 10.024c.381 0 .693-1.256.693-2.807 0-1.55-.312-2.807-.693-2.807C.312 4.41 0 5.666 0 7.217s.312 2.808.693 2.808ZM21.038 1.56c-.364 0-.684.805-.91 2.096C19.765 1.446 19.184 0 18.526 0c-.78 0-1.464 2.036-1.784 5-.312-2.158-.788-3.536-1.325-3.536-.745 0-1.386 2.704-1.62 6.472-.442-1.932-1.083-3.145-1.793-3.145s-1.35 1.213-1.793 3.145c-.242-3.76-.874-6.463-1.628-6.463-.537 0-1.013 1.378-1.325 3.535C6.938 2.036 6.262 0 5.474 0c-.658 0-1.247 1.447-1.602 3.665-.217-1.291-.546-2.105-.91-2.105-.675 0-1.221 2.807-1.221 6.272 0 3.466.546 6.273 1.221 6.273.277 0 .537-.476.736-1.273.32 2.928.996 4.938 1.776 4.938.606 0 1.143-1.204 1.507-3.11.251 3.622.875 6.195 1.602 6.195.46 0 .875-1.023 1.187-2.677C10.142 21.6 11 24 12.004 24c1.005 0 1.863-2.4 2.235-5.822.312 1.654.727 2.677 1.186 2.677.728 0 1.352-2.573 1.603-6.195.364 1.906.9 3.11 1.507 3.11.78 0 1.455-2.01 1.775-4.938.208.797.46 1.273.737 1.273.675 0 1.22-2.807 1.22-6.273-.008-3.457-.553-6.272-1.23-6.272ZM23.307 10.024c.381 0 .693-1.256.693-2.807 0-1.55-.312-2.807-.693-2.807-.381 0-.693 1.256-.693 2.807s.312 2.808.693 2.808Z",
  },
  {
    name: "Spotify",
    color: "#1ED760",
    path: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z",
  },
  {
    name: "YouTube",
    color: "#FF0000",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    name: "Apple Music",
    color: "#FA243C",
    path: "M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 011.038-2.022c.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.24.274-.063.457-.23.51-.516a.904.904 0 00.02-.193c0-1.815 0-3.63-.002-5.443a.725.725 0 00-.026-.185c-.04-.15-.15-.243-.304-.234-.16.01-.318.035-.475.066-.76.15-1.52.303-2.28.456l-2.325.47-1.374.278c-.016.003-.032.01-.048.013-.277.077-.377.203-.39.49-.002.042 0 .086 0 .13-.002 2.602 0 5.204-.003 7.805 0 .42-.047.836-.215 1.227-.278.64-.77 1.04-1.434 1.233-.35.1-.71.16-1.075.172-.96.036-1.755-.6-1.92-1.544-.14-.812.23-1.685 1.154-2.075.357-.15.73-.232 1.108-.31.287-.06.575-.116.86-.177.383-.083.583-.323.6-.714v-.15c0-2.96 0-5.922.002-8.882 0-.123.013-.25.042-.37.07-.285.273-.448.546-.518.255-.066.515-.112.774-.165.733-.15 1.466-.296 2.2-.444l2.27-.46c.67-.134 1.34-.27 2.01-.403.22-.043.442-.088.663-.106.31-.025.523.17.554.482.008.073.012.148.012.223.002 1.91.002 3.822 0 5.732z",
  },
  {
    name: "SoundCloud",
    color: "#FF5500",
    path: "M23.999 14.165c-.052 1.796-1.612 3.169-3.4 3.169h-8.18a.68.68 0 0 1-.675-.683V7.862a.747.747 0 0 1 .452-.724s.75-.513 2.333-.513a5.364 5.364 0 0 1 2.763.755 5.433 5.433 0 0 1 2.57 3.54c.282-.08.574-.121.868-.12.884 0 1.73.358 2.347.992s.948 1.49.922 2.373ZM10.721 8.421c.247 2.98.427 5.697 0 8.672a.264.264 0 0 1-.53 0c-.395-2.946-.22-5.718 0-8.672a.264.264 0 0 1 .53 0ZM9.072 9.448c.285 2.659.37 4.986-.006 7.655a.277.277 0 0 1-.55 0c-.331-2.63-.256-5.02 0-7.655a.277.277 0 0 1 .556 0Zm-1.663-.257c.27 2.726.39 5.171 0 7.904a.266.266 0 0 1-.532 0c-.38-2.69-.257-5.21 0-7.904a.266.266 0 0 1 .532 0Zm-1.647.77a26.108 26.108 0 0 1-.008 7.147.272.272 0 0 1-.542 0 27.955 27.955 0 0 1 0-7.147.275.275 0 0 1 .55 0Zm-1.67 1.769c.421 1.865.228 3.5-.029 5.388a.257.257 0 0 1-.514 0c-.21-1.858-.398-3.549 0-5.389a.272.272 0 0 1 .543 0Zm-1.655-.273c.388 1.897.26 3.508-.01 5.412-.026.28-.514.283-.54 0-.244-1.878-.347-3.54-.01-5.412a.283.283 0 0 1 .56 0Zm-1.668.911c.4 1.268.257 2.292-.026 3.572a.257.257 0 0 1-.514 0c-.241-1.262-.354-2.312-.023-3.572a.283.283 0 0 1 .563 0Z",
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

        <div className="grid gap-8 lg:grid-cols-[1fr_200px] lg:gap-12">
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
              <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                <div className="mb-4 text-right font-mono text-xs tracking-widest text-white/40">
                  {String(index + 1).padStart(2, "0")} / {String(TRACKS.length).padStart(2, "0")}
                </div>

                <div className="flex items-center gap-6">
                  <img
                    src={track.cover}
                    alt={`${track.title} cover`}
                    className="h-32 w-32 shrink-0 rounded-2xl border border-white/10 bg-white/5 object-cover sm:h-44 sm:w-44 lg:h-56 lg:w-56"
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
                    className="flex h-10 w-full cursor-pointer items-center gap-[3px] lg:h-14"
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
              <li key={p.name} className="flex items-center gap-4">
                <svg viewBox="0 0 24 24" fill={p.color} className="h-7 w-7 shrink-0" aria-hidden="true">
                  <path d={p.path} />
                </svg>
                <span className="text-lg font-medium text-white">{p.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
