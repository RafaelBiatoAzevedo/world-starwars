import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  align-items: center;
  display: flex;
  justify-content: center;

  gap: 20px;
  padding: 20px;

  background-color: ${({ theme }) => theme.colors.primary};

  @media (max-width: ${({ theme }) => theme.resolutions.medium}) {
    padding: 15px;
  }

  @media (max-width: ${({ theme }) => theme.resolutions.small}) {
    padding: 10px;
  }
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: StarJedi;
  font-size: 40px;

  @media (max-width: ${({ theme }) => theme.resolutions.medium}) {
    font-size: 30px;
  }

  @media (max-width: ${({ theme }) => theme.resolutions.small}) {
    font-size: 26px;
  }
`;

export const Image = styled.img`
  width: 30%;
`;
