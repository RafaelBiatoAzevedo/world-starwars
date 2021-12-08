import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const Wrapper = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 6px;
  flex-direction: column;
  cursor: pointer;

  text-decoration: none;

  padding: 3rem;
  gap: 10px;
  box-shadow: 0px 2px 15px 5px ${(p) => p.theme.colors.grayDark};
  width: 35%;

  &:hover {
    box-shadow: 0px 2px 15px 5px ${(p) => p.theme.colors.primary};
  }
`;
