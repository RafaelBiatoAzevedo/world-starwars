import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  width: 100%;
  height: 320px;

  @media (max-width: ${(p) => p.theme.resolutions.medium}) {
    height: 280px;
    padding: 0 30px;
  }

  @media (max-width: ${(p) => p.theme.resolutions.small}) {
    padding: 0 20px;
  }
`;

export const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
`;

type TWrapperImage = {
  urlImage?: string;
};

export const WrapperImage = styled.div<TWrapperImage>`
  background-image: url(${(p) => p.urlImage});
  background-size: cover;
  border-radius: 4px;
  width: 32%;
  height: 100%;

  @media (max-width: ${(p) => p.theme.resolutions.medium}) {
    width: 30%;
  }

  @media (max-width: ${(p) => p.theme.resolutions.small}) {
    width: 27%;
  }
`;

export const Image = styled.img``;

export const Text = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid white;
  width: 360px;

  &.title {
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.grayDark};
    color: ${({ theme }) => theme.colors.secondary};
    text-transform: uppercase;
    width: 210px;
  }

  @media (max-width: ${(p) => p.theme.resolutions.medium}) {
    font-size: 12px;
    width: 300px;

    &.title {
      width: 180px;
    }
  }
`;
