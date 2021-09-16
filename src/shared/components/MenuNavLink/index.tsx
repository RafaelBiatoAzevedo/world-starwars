import { FC } from 'react';

import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { usePlanets } from '../../../hooks/planets';

import { Wrapper, Icon, Planet } from './styles';

type TMenuNavLink = {
  next: () => void;
  previus: () => void;
};

export const MenuNavLink: FC<TMenuNavLink> = ({ next, previus }) => {
  const { planetView } = usePlanets();

  return (
    <Wrapper>
      <Icon onClick={previus}>
        <FaArrowAltCircleLeft />
      </Icon>
      <Planet>{planetView.planet?.name}</Planet>
      <Icon onClick={next}>
        <FaArrowAltCircleRight />
      </Icon>
    </Wrapper>
  );
};
