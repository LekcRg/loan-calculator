import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useDatePicker } from '@rehookify/datepicker';

import type { ActiveCalendar } from '@/types/RDatePicker';

import RDatePickerHeader from '@/components/ui/RDatePicker/RDatePickerHeader';
import RDatePickerCalendar from '@/components/ui/RDatePicker/RDatePickerCalendar';
import RDatePickerInner from '@/components/ui/RDatePicker/RDatePickerInner';

type Props = {
  name: string,
  label?: string,
  value?: string,
  onChange?: Function,
}

const Wrapper = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  &._visible {
    pointer-events: all;
  }
`;

const Label = styled.div`
  font-size: 16px;
  color: #ddd;
  margin-bottom: 5px;
`;

const Button = styled.button`
  text-align: left;
  width: 100%;
  background: #3b3b3b;
  font-size: 18px;
  color: #ddd;
  padding: 12px;
  border-radius: 4px;
  outline: none;
  border: none;
  cursor: pointer;
`;

const DatePicker = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  padding: 10px;
  width: 270px;
  background-color: #000;
  z-index: 2;
  opacity: 0;
  pointer-events: none;

  &._visible {
    opacity: 1;
    pointer-events: all;
  }
`;

const RDatePicker = (props: Props) => {
  const {
    label,
    value,
    name,
    onChange,
  } = props;

  const parsedDate = value ? value.split('-') : null;
  const UTCDate = parsedDate?.length 
    ? Date.UTC(Number(parsedDate[0]), Number(parsedDate[1]) - 1, Number(parsedDate[2]))
    : null;

  const now = new Date();
  const nowUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

  const date = UTCDate ? new Date(UTCDate) : new Date(nowUTC);

  const [ activeCalendar, changeActiveCalendar ] = useState<ActiveCalendar>('date');
  const [ selectedDates, onDatesChange ] = useState<Date[]>([ date ]);
  const [ offsetDate, onOffsetChange ] = useState<Date>(date);
  const [ isShow, changeIsShow ] = useState<boolean>(false);

  const datePickerHooks = useDatePicker({
    selectedDates,
    onDatesChange,
    // we want to manipulate with offsetDate outside of the hook
    offsetDate,
    onOffsetChange,
    calendar: {
      startDay: 1,
    },
  });

  const {
    data: { 
      calendars,
      years,
    },
    propGetters: {
      addOffset,
      subtractOffset,
      nextYearsButton,
      previousYearsButton,
    },
  } = datePickerHooks;

  const title = activeCalendar === 'year' 
    ? `${years[0].year} - ${years[years.length - 1].year}`
    : undefined;

  const headerNextProps = () => {
    if (activeCalendar === 'date') {
      return addOffset({ months: 1 });
    } else if (activeCalendar === 'month') {
      return addOffset({ years: 1 });
    } else if (activeCalendar === 'year') {
      return nextYearsButton();
    }
  };
  
  const headerPrevProps = () => {
    if (activeCalendar === 'date') {
      return subtractOffset({ months: 1 });
    } else if (activeCalendar === 'month') {
      return subtractOffset({ years: 1 });
    } else if (activeCalendar === 'year') {
      return previousYearsButton();
    }
  };

  const clickOverlay = () => {
    changeIsShow(false);
  };

  let day = date.getUTCDate();
  let month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const prettyDay = day > 9 ? day : `0${day}`;
  const prettyMonth = month > 9 ? month : `0${month}`;
  const prettyDate = `${prettyDay}.${prettyMonth}.${year}`;

  useEffect(() => {
    if (onChange) {
      const date = selectedDates[0];

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      onChange(`${year}-${month}-${day}`, name);
    }
  }, [ selectedDates, onChange, name ]);

  return (
    <Wrapper>
      <Overlay
        className={isShow ? '_visible' : ''}
        onClick={clickOverlay}
      />

      {
        label ?
          <Label
            onClick={() => changeIsShow(!isShow)}
          >
            { label }
          </Label>
          : ''
      }

      <Button
        onClick={() => changeIsShow(!isShow)}
      >
        { prettyDate }
      </Button>

      {isShow ? (
        <DatePicker className="_visible">
          <RDatePickerHeader
            prevProps={() => headerPrevProps()}
            nextProps={() => headerNextProps()}
            calendars={calendars}
            activeCalendar={activeCalendar}
            changeActiveCalendar={changeActiveCalendar}
            title={title}
          />
          {
            activeCalendar === 'date' ?
              <RDatePickerCalendar
                datePickerHooks={datePickerHooks}
              />
              : ''
          }

          {
            activeCalendar === 'month' || activeCalendar === 'year' ?
              <RDatePickerInner
                datePickerHooks={datePickerHooks}
                activeCalendar={activeCalendar}
                changeActiveCalendar={changeActiveCalendar}
              />
              : ''
          }
        </DatePicker>
      ) : ''}
    </Wrapper>
  );
};

export default RDatePicker;