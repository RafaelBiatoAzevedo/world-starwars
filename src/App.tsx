import { FC } from 'react';
import { AppProvider } from './hooks';
import { Routes } from './routes';
import { GlobalStyle } from './styles/global';

const App: FC = () => {
  return (
    <AppProvider>
      <Routes></Routes>
      <GlobalStyle></GlobalStyle>
    </AppProvider>
  );
};

export default App;
