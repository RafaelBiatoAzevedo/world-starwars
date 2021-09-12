import styled from 'styled-components';
import darthVadenImage from '../../images/darthVaden.jpg';

export const WrapperGrid = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const Grid = styled.div`
  align-content: flex-start;
  display: grid;
  grid-template-columns: repeat(9, 2fr) 1fr;
  width: 100%;

  &.title {
    background-color: ${({ theme }) => theme.grayDark};
    padding-right: 15px;
  }

  &.scroll {
    height: 91%;
    overflow-y: auto;
    scroll-behavior: smooth;
    background-image: url(${darthVadenImage});
    background-size: cover;

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
  }
`;

type TContentGrid = {
  value?: string;
};

export const ContentGrid = styled.div<TContentGrid>`
  border-bottom: solid 1px ${({ theme }) => theme.grayDark};
  align-items: center;
  display: flex;
  justify-content: center;

  color: ${({ theme }) => theme.primary};
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  height: 70px;

  &.title {
    color: ${({ theme }) => theme.secondary};
    cursor: pointer;
    text-transform: uppercase;
  }
`;

export const Icon = styled.p`
  align-items: center;
  display: flex;
  cursor: pointer;
  justify-content: center;

  border-radius: 100%;
  border: none;
  box-shadow: 0px 1px 5px 2px ${({ theme }) => theme.grayDark};
  color: ${({ theme }) => theme.primary};
  font-size: 35px;

  &.sequence {
    color: ${({ theme }) => theme.secondary};
    margin-right: 5px;
  }
`;
