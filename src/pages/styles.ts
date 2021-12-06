import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  overflow-y: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 15px;
  }

  &::-webkit-scrollbar-track-piece {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 20px;
    border: 1px solid ${({ theme }) => theme.colors.grayDark};
  }
`;
