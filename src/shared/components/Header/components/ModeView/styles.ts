import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;

  gap: 40px;

  position: absolute;
  left: 40px;
  bottom: 10px;

  @media (max-width: ${({ theme }) => theme.resolutions.medium}) {
    gap: 30px;
    left: 30px;
  }

  @media (max-width: ${({ theme }) => theme.resolutions.small}) {
    gap: 20px;
    left: 20px;
    bottom: 8px;
  }
`;

type TIcon = {
  isActive: boolean;
};

export const Icon = styled.p<TIcon>`
  font-size: 35px;
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.secondary : theme.colors.grayLight};
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.resolutions.medium}) {
    font-size: 20px;
  }

  @media (max-width: ${({ theme }) => theme.resolutions.small}) {
    font-size: 14px;
  }
`;

export const LinkBack = styled(Link)`
  border-right: solid ${(p) => p.theme.colors.secondary} 1.5px;
  padding-right: 20px;
`;
