import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  overflow: hidden;
  width: 100%;
`;

export const WrapperContent = styled.div`
  height: 90%;
  width: 100%;

  overflow-y: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 15px;
  }

  &::-webkit-scrollbar-track-piece {
    background-color: ${({ theme }) => theme.primary};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.secondary};
    border-radius: 20px;
    border: 1px solid ${({ theme }) => theme.grayDark};
  }
`;

export const WrapperDescription = styled.div`
  align-items: center;
  height: 380px;
  display: flex;
  padding: 40px;
`;

export const Image = styled.img`
  height: 100%;
  border-radius: 4px;
`;

export const Text = styled.p`
  font-size: 25px;
  line-height: 1.3em;
  padding: 40px;
  letter-spacing: 1px;
`;
