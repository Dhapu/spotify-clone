// src/App.js
import React, { useEffect, useState } from 'react';
import { GlobalStyles } from './styles/GlobalStyles';
import SongList from './components/SongList';
import SearchBar from './components/SearchBar';
import Tabs from './components/Tabs';
import SongDetails from './components/SongDetails'; // Import the new component
import { fetchSongs } from './services/api';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const LeftPanel = styled.div`
  width: 50%;
  padding: 10px;
overflow:hidden;
  display: flex;
  flex-direction: row;
`;
const SongsContainer = styled.div`
  display: flex;
  width: 100%;
  margin-left: 200px;
  margin-top: -10px;
  margin-bottom: 10px;
  flex-direction: column;
  overflow-y: auto;
`;
const RightPanel = styled.div`
  width: 50%;
  padding: 20px;
  margin-left: 20px;
 overflow:hidden;
  display: flex;
  flex-direction: column;
`;

function App() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const response = await fetchSongs();
        if (response && Array.isArray(response.data) && response.data.length > 0) {
          setSongs(response.data);
          setFilteredSongs(response.data); // Initialize filteredSongs with the full list
          setCurrentSong(response.data[0]); // Set the first song as the current song
        } else {
          console.error('No songs found or data is not an array');
        }
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    };

    loadSongs();
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
  };

  const playPrevious = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
  };

  return (
    <AppContainer>
      <GlobalStyles />
      <LeftPanel>
        <Sidebar />
        <SongsContainer>
        <Tabs />
        <SearchBar songs={songs} setFilteredSongs={setFilteredSongs} />
        <SongList
          songs={filteredSongs}
          setCurrentSong={setCurrentSong}
          setIsPlaying={setIsPlaying}
          currentSong={currentSong}
        />
        </SongsContainer>
      </LeftPanel>
      <RightPanel>
        {currentSong && (
          <SongDetails
            song={currentSong}
            isPlaying={isPlaying}
            togglePlayPause={togglePlayPause}
            playNext={playNext}
            playPrevious={playPrevious}
          />
        )}
      </RightPanel>
    </AppContainer>
  );
}

export default App;
