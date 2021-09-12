import { FC } from 'react';

import { BrowserRouter } from 'react-router-dom';

import { PlanetsProvider } from './planets';

import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { ModeViewProvider } from './modeView';

export const AppProvider: FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <PlanetsProvider>
          <ModeViewProvider>{children}</ModeViewProvider>
        </PlanetsProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
