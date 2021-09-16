import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 320px;
  padding: 0 40px;
  width: 100%;
`;

export const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
`;

export const Image = styled.img`
  height: 100%;
  border-radius: 4px;
`;

export const Text = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  padding: 8px;
  background-color: ${({ theme }) => theme.secondary};
  border: 1px solid white;
  width: 360px;

  &.title {
    font-weight: bold;
    background-color: ${({ theme }) => theme.grayDark};
    color: ${({ theme }) => theme.secondary};
    text-transform: uppercase;
    width: 210px;
  }
`;
