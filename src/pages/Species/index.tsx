import { FC } from 'react';

import { Header } from '~/shared/components/Header';

import { Wrapper } from './styles';

export const Species: FC = () => {
  return (
    <Wrapper>
      <Header title="Especies" renderModeView />
    </Wrapper>
  );
};
