import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.primary};

  padding: 20px;
  gap: 50px;

  bottom: 0;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.resolutions.medium}) {
    padding: 15px;
    gap: 25px;
  }
`;

export const Text = styled.div`
  align-items: center;
  display: flex;

  color: ${({ theme }) => theme.colors.secondary};
  font-size: 18px;
  letter-spacing: 1px;

  gap: 20px;

  @media (max-width: ${({ theme }) => theme.resolutions.medium}) {
    font-size: 9px;
    gap: 10px;
  }

  @media (max-width: ${({ theme }) => theme.resolutions.small}) {
    font-size: 8px;
  }
`;
