import { FC } from 'react';

import { BrowserRouter } from 'react-router-dom';

import { PlanetsProvider } from './planets';

import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { ModeViewProvider } from './modeView';
import { FilmsProvider } from './films';

export const AppProvider: FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <PlanetsProvider>
          <FilmsProvider>
            <ModeViewProvider>{children}</ModeViewProvider>
          </FilmsProvider>
        </PlanetsProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
