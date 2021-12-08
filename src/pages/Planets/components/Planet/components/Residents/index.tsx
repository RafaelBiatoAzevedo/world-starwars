import { FC } from 'react';

import { useTheme } from 'styled-components';

import { Text } from '~/shared/components/Text';

import { Wrapper, Title } from './styles';

export const Residents: FC = () => {
  const { colors, fontWeight } = useTheme();
  return (
    <Wrapper>
      <Title>
        <Text
          title="Residentes"
          color={colors.secondary}
          weight={fontWeight.bold}
          fontFamily="StarJedi"
          size="2.5rem"
        />
      </Title>
    </Wrapper>
  );
};
