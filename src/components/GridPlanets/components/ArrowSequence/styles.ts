import styled from 'styled-components';

export const Icon = styled.p`
  align-items: center;
  display: flex;
  justify-content: center;

  border-radius: 100%;
  border: none;
  cursor: pointer;
  box-shadow: 0px 1px 5px 2px ${({ theme }) => theme.colors.grayDark};
  font-size: 46px;
  color: ${({ theme }) => theme.colors.secondary};

  @media (max-width: ${({ theme }) => theme.resolutions.medium}) {
    font-size: 34px;
  }

  @media (max-width: ${({ theme }) => theme.resolutions.small}) {
    font-size: 28px;
  }
`;
