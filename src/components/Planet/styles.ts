import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  overflow: hidden;
  width: 100%;
`;

export const WrapperContent = styled.div`
  height: 100%;
  width: 100%;
`;

export const WrapperDescription = styled.div`
  align-items: center;
  display: flex;
  padding: 40px;
  width: 100%;
  height: 400px;

  @media (max-width: ${(p) => p.theme.resolutions.medium}) {
    height: 320px;
    padding: 30px;
  }

  @media (max-width: ${({ theme }) => theme.resolutions.small}) {
    height: 250px;
    padding: 20px;
  }
`;

export const Image = styled.img`
  border-radius: 4px;
  height: 100%;
`;

export const Text = styled.p`
  font-size: 24px;
  line-height: 1.3em;
  height: 100%;
  padding: 40px;
  letter-spacing: 1px;

  @media (max-width: ${(p) => p.theme.resolutions.medium}) {
    font-size: 18px;
  }

  @media (max-width: ${({ theme }) => theme.resolutions.small}) {
    font-size: 14px;
  }
`;
