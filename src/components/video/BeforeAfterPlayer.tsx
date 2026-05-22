"use client";

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import type { TransformationVideo } from "@/lib/transformations";

type Props = {
  before: TransformationVideo;
  after: TransformationVideo;
  compact?: boolean;
  className?: string;
};

function VideoPane({
  side,
  data,
  compact,
}: {
  side: "before" | "after";
  data: TransformationVideo;
  compact?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(data.video);
  const isBefore = side === "before";

  const togglePlay = () => {
    const v = ref.current;
    if (!v || !hasVideo) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg border ${
        isBefore ? "border-border" : "border-accent/40"
      } ${compact ? "min-h-[180px]" : "min-h-[220px]"}`}
    >
      <span
        className={`absolute top-2 left-2 z-10 text-[10px] font-medium uppercase px-2 py-0.5 rounded ${
          isBefore ? "bg-background/90 text-muted" : "bg-accent/90 text-black"
        }`}
      >
        {data.label}
      </span>

      {hasVideo ? (
        <video
          ref={ref}
          className="absolute inset-0 w-full h-full object-cover"
          src={data.video}
          poster={data.poster || undefined}
          playsInline
          muted
          loop
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-surface p-4">
          <p className="text-xs text-muted text-center">
            Añade {data.label.toLowerCase()}.mp4 en public/videos/
          </p>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
        <p className="text-xs text-foreground-muted mb-2 line-clamp-2">{data.caption}</p>
        {hasVideo && (
          <button
            type="button"
            onClick={togglePlay}
            className="text-xs inline-flex items-center gap-1 text-foreground hover:text-accent"
          >
            {playing ? <Pause size={12} /> : <Play size={12} />}
            {playing ? "Pausar" : "Play"}
          </button>
        )}
      </div>
    </div>
  );
}

export function BeforeAfterPlayer({ before, after, compact, className = "" }: Props) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${className}`}>
      <VideoPane side="before" data={before} compact={compact} />
      <VideoPane side="after" data={after} compact={compact} />
    </div>
  );
}
