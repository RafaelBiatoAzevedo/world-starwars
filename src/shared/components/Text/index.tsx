import { FC } from 'react';

import { TextStyle } from './styles';

type TText = {
  title: string | JSX.Element;
  color?: string;
  size?: string;
  padddingY?: string;
  paddingX?: string;
  weight?: string;
  mLeft?: string;
  fontFamily?: string;
};

export const Text: FC<TText> = ({
  children,
  title,
  color = '#000',
  size = '1rem',
  padddingY = '0px',
  paddingX = 'opx',
  weight = '400',
  mLeft = '0px',
  fontFamily = 'Opens Sans',
}): JSX.Element => {
  return (
    <TextStyle
      color={color}
      size={size}
      paddingY={padddingY}
      paddingX={paddingX}
      weight={weight}
      mLeft={mLeft}
      fontFamily={fontFamily}
    >
      {title}
      {children}
    </TextStyle>
  );
};

Text.defaultProps = {
  color: undefined,
  size: undefined,
  padddingY: undefined,
  paddingX: undefined,
  weight: undefined,
  mLeft: undefined,
  fontFamily: undefined,
};
