import styled, { css } from 'styled-components';

import type { DatePickerHooks } from '@/types/RDatePicker';

import { Calendar, CalenadarElement, CalendarButton } from '@/styles/datePicker';

type Props = {
  datePickerHooks: DatePickerHooks,
}

const Width = css`
  width: 14.28%;
`;

const Day = styled(CalenadarElement)`
  ${Width}
`;

const Weekdays = styled.ul`
  display: flex;
`;

const Weekday = styled.li`
  ${Width}
  list-style-type: none;
  text-align: center;
`;

const RDatePickerCalendar = (props: Props) => {
  const {
    datePickerHooks,
  } = props;

  const {
    data: {
      calendars,
      weekDays,
    },
    propGetters: {
      dayButton,
    },
  } = datePickerHooks;

  const { month, days } = calendars[0];

  return (
    <>
      <Weekdays>
        {weekDays.map((day) => (
          <Weekday
            key={`${month}-${day}`}
          >
            {day}
          </Weekday>
        ))}
      </Weekdays>
      <Calendar>
        {days.map((dpDay) => {
          let className = '';

          if (!dpDay.inCurrentMonth) {
            className += '_not-current ';
          }

          if (dpDay.selected) {
            className += '_selected ';
          }

          return (
            <Day
              className={className}
              key={dpDay.$date.toDateString()}
            >
              <CalendarButton
                {...dayButton(dpDay)}
              >
                {dpDay.day}
              </CalendarButton>
            </Day>
          );
        })}
      </Calendar>
    </>
  );
};

export default RDatePickerCalendar;