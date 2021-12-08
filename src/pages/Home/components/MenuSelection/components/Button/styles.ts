import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const Wrapper = styled(Link)`
  align-items: center;
  display: flex;
  border-radius: 6px;
  flex-direction: column;
  cursor: pointer;

  text-decoration: none;

  gap: 20px;
  box-shadow: 0px 2px 15px 5px ${(p) => p.theme.colors.grayDark};
  width: 25%;

  &:hover {
    box-shadow: 0px 2px 15px 5px ${(p) => p.theme.colors.primary};
  }
`;

export const Image = styled.img`
  border-radius: 6px;
  width: 30%;
`;
