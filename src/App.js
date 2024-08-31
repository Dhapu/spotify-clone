import React, { useEffect, useState } from 'react';
import { GlobalStyles } from './styles/GlobalStyles';
import SongList from './components/SongList';
import SearchBar from './components/SearchBar';
import Tabs from './components/Tabs';
import SongDetails from './components/SongDetails';
import { fetchSongs } from './services/api';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import MenuIcon from '@mui/icons-material/Menu';
 // Use an icon library like Material-UI

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const LeftPanel = styled.div`
  width: 50%;
  padding: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    padding: 5px;
    margin-bottom: 20px;
  }
`;

const SongsContainer = styled.div`
  display: flex;
  width: 100%;
  margin-left: 200px;
  margin-top: -10px;
  margin-bottom: 10px;
  flex-direction: column;
  overflow-y: auto;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 0;
  }
`;

const RightPanel = styled.div`
  width: 50%;
  padding: 20px;
  margin-left: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
    margin-left: 0;
  }
`;

const MenuButton = styled.button`
  display: none;
  position: absolute;
  top: 10px;
  left: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuContainer = styled.div`
  display: ${props => (props.isMenuOpen ? 'block' : 'none')};
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 10;
`;

function App() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const response = await fetchSongs();
        if (response && Array.isArray(response.data) && response.data.length > 0) {
          setSongs(response.data);
          setFilteredSongs(response.data);
          setCurrentSong(response.data[0]);
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
      {isMobile && (
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <MenuIcon />
        </MenuButton>
      )}
      {isMobile && isMenuOpen && (
        <MenuContainer isMenuOpen={isMenuOpen}>
          <SongList
            songs={filteredSongs}
            setCurrentSong={setCurrentSong}
            setIsPlaying={setIsPlaying}
            currentSong={currentSong}
          />
        </MenuContainer>
      )}
      {!isMobile || !isMenuOpen ? (
        <LeftPanel>
          {!isMobile && !isMenuOpen && <Sidebar />}
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
      ) : null}
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
