import { FC } from 'react';

import { Header } from '~/components/Header';

import { MenuSelection } from './components/MenuSelection';

import { Wrapper } from './styles';

export const Home: FC = (): JSX.Element => {
  return (
    <Wrapper>
      <Header title="World" />
      <MenuSelection />
    </Wrapper>
  );
};
