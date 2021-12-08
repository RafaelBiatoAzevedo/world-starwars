import { FC } from 'react';

import { Routes } from './routes';

import { AppProvider } from './hooks';

import { GlobalStyle } from './styles/global';

const App: FC = () => {
  return (
    <AppProvider>
      <Routes />
      <GlobalStyle />
    </AppProvider>
  );
};

export default App;
