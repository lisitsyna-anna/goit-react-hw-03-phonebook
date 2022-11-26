import styled from 'styled-components';

export const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledText = styled.p`
  display: flex;
  align-items: center;
  gap: ${p => p.theme.space[4]}px;
`;
