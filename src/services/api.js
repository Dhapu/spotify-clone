// src/services/api.js
import axios from 'axios';

const API_URL = 'https://cms.samespace.com/items';

export const fetchSongs = async () => {
  try {
    const response = await axios.get(`${API_URL}/songs`);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching songs:', error);
  }
};
