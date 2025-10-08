// This component is ideal for the Tinnitus sound, as it needs to loop.

import React from 'react';

// Define the props for the LoopingAudioPlayer component
interface LoopingAudioPlayerProps {
  src: string;
  volume: number;
  isPlaying: boolean;
}

const LoopingAudioPlayer: React.FC<LoopingAudioPlayerProps> = ({ src, volume, isPlaying }) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = volume;

      if (isPlaying) {
        audioRef.current.muted = false;
        audioRef.current.play().catch(e => console.error("Tinnitus audio play failed:", e));
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isPlaying, volume]);

  return (
    <audio
      ref={audioRef}
      src={src}
      preload="auto"
      style={{ display: 'none' }}
      aria-hidden="true"
    >
      Your browser does not support the audio element.
    </audio>
  );
};

export default LoopingAudioPlayer;