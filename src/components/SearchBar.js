import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa'; // Import the search icon

const SearchBar = ({ songs, setFilteredSongs }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter the songs based on the search term
    const filtered = songs.filter(
      (song) =>
        song.name.toLowerCase().includes(term) ||
        song.artist.toLowerCase().includes(term)
    );

    setFilteredSongs(filtered);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search Song, Artist"
        value={searchTerm}
        onChange={handleSearch}
      />
      <SearchIcon />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  position: relative; /* Position the container relative */
  width: 100%;
  padding: 20px;
  margin-top: 0px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 40px 10px 10px; /* Add padding to the right to make space for the icon */
  border-radius: 5px;
  border: none;
  background: #333;
  color: white;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 30px; /* Position the icon 10px inside the right edge of the input */
  top: 50%;
  transform: translateY(-50%);
  color: white;
`;

export default SearchBar;
