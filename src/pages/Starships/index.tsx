import { FC } from 'react';

import { Header } from '~/shared/components/Header';
import { useModeView } from '~/hooks/modeView';

import { Wrapper } from './styles';

export const StarShips: FC = () => {
  const { modeView } = useModeView();
  return (
    <Wrapper>
      <Header title="naves" renderModeView />
      {modeView && <h1>Em Breve</h1>}
    </Wrapper>
  );
};
