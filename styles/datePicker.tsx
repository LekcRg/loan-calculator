import styled from 'styled-components';

export const Calendar = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;


export const CalendarButton = styled.button`
  width: 100%;
  height: 30px;
  border: 1px solid #ddd;
  cursor: pointer;
  background: #3b3b3b;
  transition: background .2s ease;

  &:hover {
    background: #121212;
  }
`;

export const CalenadarElement = styled.li`
  list-style-type: none;

  &._not-current ${CalendarButton} {
    opacity: .5;
  }

  &._selected ${CalendarButton} {
    background: #0f0;
  }
`;
