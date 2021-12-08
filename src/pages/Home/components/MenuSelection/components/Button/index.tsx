import { FC } from 'react';

import { useTheme } from 'styled-components';

import { Text } from '~/components/Text';

import { Wrapper, Image } from './styles';

type TButton = {
  image: any;
  title: string;
  description: string;
};

export const Button: FC<TButton> = ({
  image,
  title,
  description,
}): JSX.Element => {
  const { colors, fontWeight } = useTheme();
  return (
    <Wrapper to="/planets">
      <Image src={image} />
      <Text
        size="2rem"
        title={title}
        color={colors.secondary}
        weight={fontWeight.bold}
      />
      <Text
        title={description}
        size="1.5rem"
        color={colors.grayDark}
        weight={fontWeight.bold}
        paddingX="20px"
      />
    </Wrapper>
  );
};
