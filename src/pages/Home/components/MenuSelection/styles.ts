import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  background-color: ${(p) => p.theme.colors.grayLight};
  flex: 1;

  padding: 30px;
  gap: 20px;
`;
