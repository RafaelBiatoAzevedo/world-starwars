import { FC } from 'react';

import { Footer } from '~/components/Footer';

import { Wrapper } from './styles';

export const Layout: FC = ({ children }): JSX.Element => {
  return (
    <Wrapper>
      {children}
      <Footer />
    </Wrapper>
  );
};
