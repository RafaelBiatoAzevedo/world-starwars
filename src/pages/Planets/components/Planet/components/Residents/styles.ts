import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 40px;
  gap: 20px;

  @media (max-width: ${(p) => p.theme.resolutions.medium}) {
    padding: 30px;
  }

  @media (max-width: ${(p) => p.theme.resolutions.small}) {
    padding: 20px;
  }
`;

export const Title = styled.p`
  align-items: center;
  display: flex;

  font-family: StarJedi;
  font-size: 40px;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.secondary};
  width: 100%;

  &::before {
    content: '';
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.secondary};
    margin-right: 20px;
  }

  &::after {
    content: '';
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.secondary};
    margin-left: 20px;
  }
`;
