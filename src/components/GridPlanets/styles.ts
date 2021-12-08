import styled from 'styled-components';

import darthVadenImage from '~/shared/assets/images/darthVaden.jpg';

export const WrapperGrid = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.grayDark};
  width: 100%;
  flex: 1;
`;

export const Grid = styled.div`
  align-content: flex-start;
  display: grid;
  grid-template-columns: repeat(9, 2fr) 1fr;
  width: 100%;

  &.title {
    background-color: ${({ theme }) => theme.colors.grayDark};
  }

  &.scroll {
    height: 93%;
    overflow-y: auto;
    scroll-behavior: smooth;
    background-image: url(${darthVadenImage});
    background-size: 100%;

    &::-webkit-scrollbar {
      width: 12px;
    }

    &::-webkit-scrollbar-track-piece {
      background-color: ${({ theme }) => theme.colors.primary};
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.secondary};
      border-radius: 20px;
      border: 1px solid ${({ theme }) => theme.colors.grayDark};
    }
  }

  @media (max-width: ${({ theme }) => theme.resolutions.medium}) {
    grid-template-columns: repeat(6, 1.4fr) 2fr 2fr 2fr 1fr;
    &.scroll {
      height: 93.5%;
    }
  }

  @media (max-width: ${({ theme }) => theme.resolutions.small}) {
    grid-template-columns: repeat(6, 1.4fr) 2fr 2fr 2fr 1fr;
    &.scroll {
      height: 96%;
    }
  }
`;

type TContentGrid = {
  value?: string;
};

export const ContentGrid = styled.div<TContentGrid>`
  border-bottom: solid 1px ${({ theme }) => theme.colors.grayDark};
  align-items: center;
  display: flex;
  justify-content: center;

  color: ${({ theme }) => theme.colors.primary};
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  height: 60px;

  &.title {
    color: ${({ theme }) => theme.colors.secondary};
    cursor: pointer;
    text-transform: uppercase;
  }

  @media (max-width: ${({ theme }) => theme.resolutions.medium}) {
    font-size: 10px;
    height: 34px;
  }

  @media (max-width: ${({ theme }) => theme.resolutions.small}) {
    font-size: 9px;
    height: 26px;
  }
`;

export const Icon = styled.p`
  align-items: center;
  display: flex;
  cursor: pointer;
  justify-content: center;

  border-radius: 100%;
  border: none;
  box-shadow: 0px 1px 5px 2px ${({ theme }) => theme.colors.grayDark};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 36px;

  @media (max-width: ${({ theme }) => theme.resolutions.medium}) {
    font-size: 16px;
  }

  @media (max-width: ${({ theme }) => theme.resolutions.small}) {
    font-size: 12px;
  }
`;

export const Loading = styled.p`
  align-items: center;
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 70px;
  font-weight: bold;
  width: 100%;
  flex: 1;

  @media (max-width: ${({ theme }) => theme.resolutions.medium}) {
    font-size: 40px;
  }

  @media (max-width: ${({ theme }) => theme.resolutions.small}) {
    font-size: 30px;
  }
`;
