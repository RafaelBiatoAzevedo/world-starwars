import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;

  gap: 40px;

  position: absolute;
  left: 40px;
  bottom: 10px;
`;

type TIcon = {
  isActive: boolean;
};

export const Icon = styled.p<TIcon>`
  font-size: 35px;
  color: ${({ isActive, theme }) =>
    isActive ? theme.secondary : theme.grayDark};
  cursor: pointer;
`;
