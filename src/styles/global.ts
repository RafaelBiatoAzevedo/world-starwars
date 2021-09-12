import { createGlobalStyle } from 'styled-components';

import '@fontsource/open-sans';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: StarJedi;
    src: url('../fonts/Starjedi.ttf');
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
