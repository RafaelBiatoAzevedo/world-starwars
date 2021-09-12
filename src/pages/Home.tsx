import { FC } from 'react';

import { Footer } from '../components/Footer';
import { GridPlanets } from '../components/GridPlanets';
import { Header } from '../components/Header';
import { Planet } from '../components/Planet';
import { useModeView } from '../hooks/modeView';

import { Wrapper } from './styles';

export const Home: FC = () => {
  const { modeView } = useModeView();
  return (
    <Wrapper>
      <Header />
      {modeView.mode === 'table' ? <GridPlanets /> : <Planet />}
      <Footer />
    </Wrapper>
  );
};
