import { createElement, FC } from 'react';

import { IconType } from 'react-icons';

import { useTheme } from 'styled-components';

import { Text } from '~/shared/components/Text';

import { Wrapper } from './styles';

type TButton = {
  to: string;
  icon: IconType;
  title: string;
};

export const Link: FC<TButton> = ({ icon, title, to }): JSX.Element => {
  const { colors, fontWeight } = useTheme();
  return (
    <Wrapper to={to}>
      <Text title="" color={colors.grayDark} size="5rem">
        {createElement(icon)}
      </Text>
      <Text
        size="2rem"
        title={title}
        color={colors.secondary}
        weight={fontWeight.bold}
      />
    </Wrapper>
  );
};
