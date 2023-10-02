import styled from 'styled-components';

import type { ReactNode } from 'react';

import {
  Calendar,
  CalenadarElement,
  CalendarButton,
} from '@/styles/datePicker';

import type { DatePickerHooks, ActiveCalendar } from '@/types/RDatePicker';

type Props = {
  datePickerHooks: DatePickerHooks;
  activeCalendar: ActiveCalendar;
  changeActiveCalendar: Function;
};

const Element = styled(CalenadarElement)`
  width: 33.33%;
`;

const RDatePickerInner = (props: Props) => {
  const { datePickerHooks, activeCalendar, changeActiveCalendar } = props;

  const {
    data: { months, years },
    propGetters: { monthButton, yearButton },
  } = datePickerHooks;

  const afterSelect: ActiveCalendar =
    activeCalendar === 'year' ? 'month' : 'date';

  return (
    <Calendar>
      {activeCalendar === 'year'
        ? years.map((dbYear) => (
            <CalendarElement
              selected={dbYear.selected}
              key={dbYear.$date.toDateString()}
              buttonProps={yearButton(dbYear, {
                onClick: () => changeActiveCalendar(afterSelect, dbYear.$date),
              })}
            >
              {dbYear.year}
            </CalendarElement>
          ))
        : months.map((dbMonth) => (
            <CalendarElement
              selected={dbMonth.selected}
              key={dbMonth.$date.toDateString()}
              buttonProps={monthButton(dbMonth, {
                onClick: () => changeActiveCalendar(afterSelect, dbMonth.$date),
              })}
            >
              {dbMonth.month}
            </CalendarElement>
          ))}
    </Calendar>
  );
};

const CalendarElement = (props: {
  children: ReactNode;
  selected: boolean;
  buttonProps: Object;
}) => {
  const { children, selected, buttonProps } = props;

  let className = '';

  if (selected) {
    className += '_selected ';
  }

  return (
    <Element className={className}>
      <CalendarButton {...buttonProps}>{children}</CalendarButton>
    </Element>
  );
};

export default RDatePickerInner;
