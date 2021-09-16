import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 40px;
  gap: 20px;
`;

export const Title = styled.p`
  align-items: center;
  display: flex;

  font-family: StarJedi;
  font-size: 40px;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.secondary};
  width: 100%;

  &::before {
    content: '';
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.secondary};
    margin-right: 20px;
  }

  &::after {
    content: '';
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.secondary};
    margin-left: 20px;
  }
`;
