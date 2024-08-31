import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SongList = ({ songs, setCurrentSong, setIsPlaying, currentSong }) => {
  const [durations, setDurations] = useState({});

  useEffect(() => {
    const calculateDurations = async () => {
      const durationPromises = songs.map((song) =>
        new Promise((resolve) => {
          const audio = new Audio(song.url);
          audio.addEventListener('loadedmetadata', () => {
            resolve({ id: song.id, duration: audio.duration });
          });
        })
      );

      const durationResults = await Promise.all(durationPromises);
      const durationMap = durationResults.reduce((acc, { id, duration }) => {
        acc[id] = duration;
        return acc;
      }, {});

      setDurations(durationMap);
    };

    calculateDurations();
  }, [songs]);

  const handleSongClick = (song) => {
    setCurrentSong(song);
    setIsPlaying(true); // Start playing the song when clicked
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <ListContainer>
      {songs.map((song) => (
        <SongItem
          key={song.id}
          onClick={() => handleSongClick(song)}
          isActive={currentSong && currentSong.id === song.id}
        >
          <CoverImage src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} />
          <SongDetails>
            <h4>{song.name}</h4>
            <p>{song.artist}</p>
          </SongDetails>
          <Duration>
            {durations[song.id] ? formatDuration(durations[song.id]) : 'Loading...'}
          </Duration>
        </SongItem>
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  padding: 20px;
  margin-top: -10px;
  overflow-y: auto;
`;

const SongItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Align details and duration */
  margin-bottom: 10px;
  cursor: pointer;
  background: ${props => (props.isActive ? '#333' : 'transparent')};
  border-radius: 5px;
  padding: 10px;

  &:hover {
    background: #333;
    border-radius: 5px;
  }
`;

const CoverImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 50%;
`;

const SongDetails = styled.div`
  flex-grow: 1; /* Allow the song details to take up remaining space */
  h4 {
    margin: 0;
    font-size: 16px;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #999;
  }
`;

const Duration = styled.span`
  font-size: 14px;
  color: #999;
  margin-left: 10px;
`;

export default SongList;
