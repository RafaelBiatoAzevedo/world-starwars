import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  background-color: ${({ theme }) => theme.primary};

  padding: 20px;
  gap: 50px;

  bottom: 0;
  width: 100%;
`;

export const Text = styled.div`
  align-items: center;
  display: flex;

  color: ${({ theme }) => theme.secondary};
  font-size: 20px;
  letter-spacing: 1px;

  gap: 20px;
`;
