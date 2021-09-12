import { FC } from 'react';

import { Wrapper, Text } from './styles';
import { FaBuilding, FaLocationArrow } from 'react-icons/fa';
import { MdContactMail } from 'react-icons/md';

export const Footer: FC = () => {
  return (
    <Wrapper>
      <Text>
        <FaBuilding />
        ADC - Azevedo Digital Company - CNPJ: 39.324.590/0001-43
      </Text>
      <Text>
        <MdContactMail />
        rafaelazevedo321@gmail.com - (19) 997426987
      </Text>
      <Text>
        <FaLocationArrow />
        Rua Cleonice Ap. Cruz K. Thielle, 350 - Mogi Guaçú, SP
      </Text>
    </Wrapper>
  );
};
