import { FC } from 'react';

import { useModeView } from '~/hooks/modeView';
import { Planet } from '~/components/Planet';
import { Header } from '~/components/Header';
import { GridPlanets } from '~/components/GridPlanets';

import { Wrapper } from './styles';

export const Planets: FC = () => {
  const { modeView } = useModeView();
  return (
    <Wrapper>
      <Header title="PLANETS" renderModeView />
      {modeView.mode === 'table' ? <GridPlanets /> : <Planet />}
    </Wrapper>
  );
};
