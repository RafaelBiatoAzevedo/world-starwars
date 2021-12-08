import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  align-items: center;
  display: flex;
  justify-content: center;

  gap: 20px;
  padding: 20px;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.primary};

  @media (max-width: ${({ theme }) => theme.resolutions.medium}) {
    padding: 15px;
  }

  @media (max-width: ${({ theme }) => theme.resolutions.small}) {
    padding: 10px;
  }
`;

export const Image = styled.img`
  width: 30%;
`;
