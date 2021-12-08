import styled from 'styled-components';

type TTextStyle = {
  color: string;
  size: string;
  paddingY: string;
  paddingX: string;
  weight: string;
  mLeft: string;
  fontFamily: string;
};

export const TextStyle = styled.p<TTextStyle>`
  align-items: center;
  display: flex;

  color: ${(p) => p.color};
  font-size: ${(p) => p.size};
  font-family: ${(p) => p.fontFamily};
  font-weight: ${(p) => p.weight};

  margin-left: ${(p) => p.mLeft};
  padding: ${(p) => p.paddingY} ${(p) => p.paddingX};
`;
