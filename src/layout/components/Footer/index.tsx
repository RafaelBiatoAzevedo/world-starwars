import { FC } from 'react';

import { useTheme } from 'styled-components';

import { Text } from '../../../shared/components/Text';

import { Wrapper } from './styles';

export const Footer: FC = (): JSX.Element => {
  const { colors, fontWeight } = useTheme();
  return (
    <Wrapper>
      <Text title="" color={colors.secondary}>
        <Text
          title="AZEVEDO DIGITAL"
          color={colors.secondary}
          weight={fontWeight.bold}
          paddingX="10px"
          size="1.6rem"
        />
        Soluções personalizadas em Aplicações e sites
      </Text>
      <Text
        title="AD - Azevedo Digital / CNPJ: 39.324.590/0001-43 / Incrição Municipal:
        324439 / Rua Cleonice Ap. Cruz K. Thielle, 350 - Mogi Guaçú - SP"
        color={colors.secondary}
      />
      <Text
        title=" Email: rafaelazevedo321@gmail.com / azevedodigital321@gmail.com - Cel: (19) 997426983"
        color={colors.secondary}
      />
    </Wrapper>
  );
};
