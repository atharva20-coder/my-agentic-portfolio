"use client";
import YT from "react-youtube";

interface YouTubeProps {
  videoId: string;
  start?: number;
  end?: number;
}

export function YouTubeComponent({ videoId, start, end }: YouTubeProps) {
  return (
    <div className="relative w-full h-0 pb-[56.25%] my-6">
      <YT
        videoId={videoId}
        opts={{
          height: '100%',
          width: '100%',
          playerVars: {
            start: start,
            end: end,
          },
        }}
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
}
