import { createGlobalStyle } from 'styled-components';

import '@fontsource/open-sans';

import StarJedi from '../fonts/Starjedi.ttf';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: StarJedi;
    src: local(StarJedi), url(${StarJedi}) format('truetype');
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Open Sans";
    letter-spacing: 1px;
  }
`;
