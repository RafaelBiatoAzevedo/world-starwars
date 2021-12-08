import { FC } from 'react';

import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

import { useTheme } from 'styled-components';

import { Text } from '~/shared/components/Text';

import { Wrapper, Icon } from './styles';

type TMenuNavLink = {
  title: string;
  next: () => void;
  previus: () => void;
};

export const MenuNavLink: FC<TMenuNavLink> = ({ next, previus, title }) => {
  const { colors, fontWeight } = useTheme();
  return (
    <Wrapper>
      <Icon onClick={previus}>
        <FaArrowAltCircleLeft />
      </Icon>
      <Text
        title={title}
        color={colors.secondary}
        size="3rem"
        weight={fontWeight.medium}
      />
      <Icon onClick={next}>
        <FaArrowAltCircleRight />
      </Icon>
    </Wrapper>
  );
};
