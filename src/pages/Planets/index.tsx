import { FC } from 'react';

import { Header } from '~/shared/components/Header';
import { Planet } from '~/pages/Planets/components/Planet';
import { GridPlanets } from '~/pages/Planets/components/GridPlanets';
import { useModeView } from '~/hooks/modeView';

import { Wrapper } from './styles';

export const Planets: FC = () => {
  const { modeView } = useModeView();
  return (
    <Wrapper>
      <Header title="Planetas" renderModeView />
      {modeView.mode === 'table' ? <GridPlanets /> : <Planet />}
    </Wrapper>
  );
};
