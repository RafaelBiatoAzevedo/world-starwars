import { FC } from 'react';

import { Header } from '~/shared/components/Header';
import { useModeView } from '~/hooks/modeView';

import { Wrapper } from './styles';

export const Species: FC = () => {
  const { modeView } = useModeView();
  return (
    <Wrapper>
      <Header title="Especies" renderModeView />
      {modeView && <h1>Em Breve</h1>}
    </Wrapper>
  );
};
