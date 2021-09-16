import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  padding: 10px 40px;
  width: 100%;

  background-color: ${({ theme }) => theme.grayDark};
`;

export const Icon = styled.p`
  align-items: center;
  display: flex;
  justify-content: center;

  font-size: 40px;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 100%;
  box-shadow: 0px 1px 5px 2px ${({ theme }) => theme.grayDark};
`;

export const Planet = styled.p`
  color: ${({ theme }) => theme.secondary};
  font-size: 45px;
  font-weight: bold;
`;
