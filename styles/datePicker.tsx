import styled, { css } from 'styled-components';

export const Calendar = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 8px 0 16px;
  gap: 8px 0;
`;

export const CalendarButton = styled.button`
  width: 100%;
  height: 30px;
  border: none;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  transition: background .2s ease;

  &:hover {
    background: #121212;
  }
`;

export const CalenadarElement = styled.li<{
  $selected?: boolean,
  $notCurrent?: boolean
}>`
  list-style-type: none;

  ${props => props.$notCurrent && css`
    ${CalendarButton} {
      color: ${({ theme }) => theme.colors.dark4}
    }
  `}

  ${props => props.$selected && css`
    ${CalendarButton} {
      color: ${({ theme }) => theme.colors.light1};
      background: ${({ theme }) => theme.colors.accent};
    }
  `}
`;
