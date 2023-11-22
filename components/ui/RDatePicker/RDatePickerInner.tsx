import styled from 'styled-components';

import type { ReactNode } from 'react';

import { Calendar, CalendarElement, CalendarButton } from '@/styles/datePicker';

import type { DatePickerHooks, ActiveCalendar } from '@/types/RDatePicker';

type Props = {
  datePickerHooks: DatePickerHooks,
  activeCalendar: ActiveCalendar,
  changeActiveCalendar: Function,
};

const Element = styled(CalendarElement)`
  width: 33.33%;
`;

const Wrapper = styled(Calendar)`
  padding-left: 16px;
  padding-right: 16px;
`;

const RDatePickerInner = (props: Props) => {
  const {
    datePickerHooks,
    activeCalendar,
    changeActiveCalendar,
  } = props;

  const {
    data: { 
      months,
      years,
    },
    propGetters: {
      monthButton,
      yearButton,
    },
  } = datePickerHooks;

  const afterSelect: ActiveCalendar = activeCalendar === 'year' ? 'month' : 'date';

  return (
    <Wrapper>
      {activeCalendar === 'year' ?
        years.map((dbYear) => (
          <CalendarElementBlock
            selected={dbYear.selected}
            key={dbYear.$date.toDateString()}
            buttonProps={yearButton(dbYear, {
              onClick: () => changeActiveCalendar(afterSelect, dbYear.$date),
            })}
          >
            { dbYear.year }
          </CalendarElementBlock>
        )) : (
          months.map((dbMonth) => (
            <CalendarElementBlock
              selected={dbMonth.selected}
              key={dbMonth.$date.toDateString()}
              buttonProps={monthButton(dbMonth, {
                onClick: () => changeActiveCalendar(afterSelect, dbMonth.$date),
              })}
            >
              { dbMonth.month }
            </CalendarElementBlock>
          ))
        )}
    </Wrapper>
  );
};

const CalendarElementBlock = (props: {
  children: ReactNode,
  selected: boolean,
  buttonProps: Object,
}) => {
  const {
    children,
    selected,
    buttonProps,
  } = props;

  return (
    <Element
      $selected={selected}
    >
      <CalendarButton
        {...buttonProps}
        tabIndex={-1}
      >
        {children}
      </CalendarButton>
    </Element>
  );
};

export default RDatePickerInner;