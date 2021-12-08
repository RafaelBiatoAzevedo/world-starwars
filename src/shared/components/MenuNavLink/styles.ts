import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  padding: 10px 40px;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.grayDark};

  @media (max-width: ${(p) => p.theme.resolutions.medium}) {
    padding: 10px 30px;
  }

  @media (max-width: ${({ theme }) => theme.resolutions.small}) {
    padding: 10px 20px;
  }
`;

export const Icon = styled.p`
  align-items: center;
  display: flex;
  justify-content: center;

  font-size: 40px;
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 100%;
  box-shadow: 0px 1px 5px 2px ${({ theme }) => theme.colors.grayDark};

  @media (max-width: ${(p) => p.theme.resolutions.medium}) {
    font-size: 30px;
  }

  @media (max-width: ${({ theme }) => theme.resolutions.small}) {
    font-size: 25px;
  }
`;
