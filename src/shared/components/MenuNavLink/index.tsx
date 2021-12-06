import { FC } from 'react';

import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

import { Wrapper, Icon, Title } from './styles';

type TMenuNavLink = {
  title: string;
  next: () => void;
  previus: () => void;
};

export const MenuNavLink: FC<TMenuNavLink> = ({ next, previus, title }) => {
  return (
    <Wrapper>
      <Icon onClick={previus}>
        <FaArrowAltCircleLeft />
      </Icon>
      <Title>{title}</Title>
      <Icon onClick={next}>
        <FaArrowAltCircleRight />
      </Icon>
    </Wrapper>
  );
};
