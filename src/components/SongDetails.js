import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeOff,
  FaVolumeUp,
  FaVolumeMute,
  FaEllipsisH,
} from 'react-icons/fa';

const SongDetails = ({
  song,
  isPlaying,
  togglePlayPause,
  playNext,
  playPrevious,
}) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false); // State to manage mute/unmute
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (song && audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [song, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      const updateTime = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
      };
      audioRef.current.addEventListener('timeupdate', updateTime);
      return () => {
        audioRef.current.removeEventListener('timeupdate', updateTime);
      };
    }
  }, [song]);

  const handleSeek = (event) => {
    const newTime = event.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const calculateBackground = () => {
    const percentage = (currentTime / duration) * 100;
    return `linear-gradient(to right, white ${percentage}%, #333 ${percentage}%)`;
  };

  return (
    <DetailsContainer>
      {song && (
        <>
          <SongInfo>
            <h1>{song.name}</h1>
            <p>{song.artist}</p>
          </SongInfo>
          <CoverImage
            src={`https://cms.samespace.com/assets/${song.cover}`}
            alt={song.name}
          />
          <Slider
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            style={{ background: calculateBackground() }}
          />
          <Controls>
            <Ellipse>
              <FaEllipsisH onClick={toggleMenu} />
            </Ellipse>
            <CenterContainer>
              <FaStepBackward onClick={playPrevious} />
              {isPlaying ? (
                <PlayPause>
                  <FaPause onClick={togglePlayPause} />
                </PlayPause>
              ) : (
                <PlayPause>
                  <FaPlay onClick={togglePlayPause} />
                </PlayPause>
              )}
              <FaStepForward onClick={playNext} />
            </CenterContainer>
            {isMuted ? (
              <Volume>
                <FaVolumeMute onClick={toggleMute} />
              </Volume>
            ) : (
              <Volume>
                <FaVolumeUp onClick={toggleMute} />
              </Volume>
            )}
          </Controls>
          <audio ref={audioRef} src={song.url} />
        </>
      )}
    </DetailsContainer>
  );
};

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  margin-top: 5px;
`;

const SongInfo = styled.div`
  margin-bottom: 10px;

  h1 {
   font-family: Inter;
font-size: 32px;
font-weight: 700;
line-height: 36px;
text-align: left;

  }

  p {
  color: #999;
    font-family: Inter;
font-size: 16px;
font-weight: 400;
line-height: 24px;
text-align: left;
  }
`;

const CoverImage = styled.img`
  width: 480px;
  height: 480px;
  margin-top: -20px;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const Slider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 480px;
  height: 6px;
  outline: none;
  margin-bottom: 10px;
  border-radius: 5px;
  transition: background 0.15s ease-in-out;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 10px;
    height: 10px;
    background: #ffffff;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.15s ease-in-out;
    margin-top: 0px;
  }

  &::-moz-range-thumb {
    width: 10px;
    height: 10px;
    background: #ffffff;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-ms-thumb {
    width: 10px;
    height: 10px;
    background: #ffffff;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const Controls = styled.div`
  cursor: pointer;
  display: flex;
  
  width: 480px;
  align-items: center;
  justify-content: space-between;
`;

const Ellipse = styled.div`
  cursor: pointer;
  margin-right: 10px;
  background-color: #333;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Volume = styled.div`
  cursor: pointer;
  margin-right: 10px;
  background-color: #333;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const PlayPause = styled.div`
  cursor: pointer;
  background-color: #fff;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
`;

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export default SongDetails;
