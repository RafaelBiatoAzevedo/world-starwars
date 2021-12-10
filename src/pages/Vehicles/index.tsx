import { FC } from 'react';

import { Header } from '~/shared/components/Header';
import { useModeView } from '~/hooks/modeView';

import { Wrapper } from './styles';

export const Vehicles: FC = () => {
  const { modeView } = useModeView();
  return (
    <Wrapper>
      <Header title="veículos" renderModeView />
    </Wrapper>
  );
};
