// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background: #121212;
    color: white;
  }
  
  * {
    box-sizing: border-box;
  }
`;
