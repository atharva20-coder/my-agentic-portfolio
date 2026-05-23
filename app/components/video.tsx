import React from 'react';

interface VideoProps {
  src: string;
  title?: string;
  style?: React.CSSProperties;
}

export const VideoComponent: React.FC<VideoProps> = ({ src, title, style }) => {
  return (
    <div className="my-8">
      <video
        src={src}
        controls
        className="rounded-lg w-full"
        style={style}
        title={title}
      >
        Your browser does not support the video element.
      </video>
    </div>
  );
};