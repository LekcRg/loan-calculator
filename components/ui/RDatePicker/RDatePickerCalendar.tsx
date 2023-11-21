import styled, { css } from 'styled-components';

import type { DatePickerHooks } from '@/types/RDatePicker';

import { Calendar, CalendarElement, CalendarButton } from '@/styles/datePicker';

type Props = {
  datePickerHooks: DatePickerHooks,
}

const Wrapper = styled.div`
  padding: 0 16px;
`;

const Width = css`
  width: 14.28%;
`;

const Day = styled(CalendarElement)`
  ${Width}
`;

const Weekdays = styled.ul`
  display: flex;
  padding: 8px 0;
`;

const Weekday = styled.li`
  ${Width}
  list-style-type: none;
  text-align: center;
  color: ${({ theme }) => theme.colors.light3};
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
    <Wrapper>
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
        {days.map((dpDay) => (
          <Day
            $selected={dpDay.selected}
            $notCurrent={!dpDay.inCurrentMonth}
            key={dpDay.$date.toDateString()}
          >
            <CalendarButton
              {...dayButton(dpDay)}
            >
              {dpDay.day}
            </CalendarButton>
          </Day>
        ))}
      </Calendar>
    </Wrapper>
  );
};

export default RDatePickerCalendar;