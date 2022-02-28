import { FC } from 'react';

import { Header } from '~/shared/components/Header';
import { useModeView } from '~/hooks/modeView';

import { Wrapper } from './styles';

export const Films: FC = () => {
  const { modeView } = useModeView();
  return (
    <Wrapper>
      <Header title="filmes" renderModeView />
      {modeView && <h1>Em Breve</h1>}
    </Wrapper>
  );
};
