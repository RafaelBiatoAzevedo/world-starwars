import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.primary};

  padding: 20px;
  gap: 20px;

  width: 100%;

  @media (max-width: ${({ theme }) => theme.resolutions.medium}) {
    padding: 15px;
    gap: 15px;
  }
`;
