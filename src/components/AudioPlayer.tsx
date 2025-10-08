import React from 'react';

interface AudioPlayerProps {
  src: string;
  controls?: boolean;
  loop?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, controls = false, loop = false }) => {
  return (
    <audio
      autoPlay
      loop={loop}
      src={src}
      controls={controls}
    >
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;