// src/components/Player.js
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';

const Player = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    // Implement next song functionality
  };

  const playPrevious = () => {
    // Implement previous song functionality
  };

  return (
    <PlayerContainer>
      <audio ref={audioRef} src={song.url} autoPlay />
      <CoverImage src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} />
      <Controls>
        <FaStepBackward onClick={playPrevious} />
        {isPlaying ? (
          <FaPause onClick={togglePlayPause} />
        ) : (
          <FaPlay onClick={togglePlayPause} />
        )}
        <FaStepForward onClick={playNext} />
      </Controls>
      <SongInfo>
        <h3>{song.name}</h3>
        <p>{song.artist}</p>
      </SongInfo>
    </PlayerContainer>
  );
};

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #282828;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const CoverImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SongInfo = styled.div`
  margin-left: 20px;
`;

export default Player;
