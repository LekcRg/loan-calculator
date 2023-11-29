import { useState, useEffect, useRef, MouseEvent, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import { useDatePicker } from '@rehookify/datepicker';

import type { ActiveCalendar } from '@/types/RDatePicker';


import RLabel from './RLabel';
import RDatePickerHeader from '@/components/ui/RDatePicker/RDatePickerHeader';
import RDatePickerCalendar from '@/components/ui/RDatePicker/RDatePickerCalendar';
import RDatePickerInner from '@/components/ui/RDatePicker/RDatePickerInner';
import {
  dateNowUTC,
  dateToString,
  dateUTC,
  getCorrectDayInMonth,
  getPrettyDate,
  stringToDate,
} from '@/assets/ts/dateUtils';

type Props = {
  name: string,
  label?: string,
  value?: string,
  placeholder?: string,
  onChange?: Function,
  type?: ActiveCalendar,
  className?: string,
  blue?: boolean,
  clearable?: boolean;
  paymentDay?: number,
  minDate?: string,
  minDateErrorText?: string,
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

const Button = styled.button<{ $blue?: boolean, $error?: boolean }>`
  position: relative;
  text-align: left;
  width: 100%;
  background: ${({ $blue, theme }) => $blue
    ? theme.colors.accent4
    : theme.colors.dark3};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.light1};
  padding: 15px;
  border-radius: 4px;
  outline: none;
  border: 1px ${({ $blue, theme }) => $blue
    ? theme.colors.accent4
    : theme.colors.dark3} solid;
  cursor: pointer;
  transition: border-color .3s ease;

  ${({ $blue, $error }) => !$blue && !$error && css`

    &:hover {
      border-color: ${({ theme }) => theme.colors.dark4};
    }

    &:focus {
      border-color: ${({ theme }) => theme.colors.accent};
    }
  `}

  ${({ $error }) => $error && css`
    border-color: ${({ theme }) => theme.colors.red1};
  `}
`;

const ErrorText = styled.div`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  color: ${({ theme }) => theme.colors.red1};
  font-size: 12px;
`;

const Clear = styled.svg`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 11px;
  width: 16px;
  height: 16px;
  margin: auto 0;
  color: ${({ theme }) => theme.colors.light3};
  transform: rotate(45deg);
  transition: color .3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.light1};
  }
`;

const DatePicker = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  width: 290px;
  background-color: ${({ theme }) => theme.colors.dark2};
  border-radius: 8px;
  z-index: 2;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.20);
`;

const RDatePicker = (props: Props) => {
  const {
    label,
    value,
    name,
    onChange,
    className,
    placeholder = 'Date is not select',
    clearable = false,
    type = 'date',
    blue = false,
    paymentDay,
    minDate,
    minDateErrorText,
  } = props;

  let date = useMemo(() => {
    if (clearable) {
      return value ? stringToDate(value) : null;
    }

    return value ? stringToDate(value) : dateNowUTC();
  }, [ clearable, value ]);

  const [ activeCalendar, changeActiveCalendar ] = useState<ActiveCalendar>(type);
  const [ selectedDates, onDatesChange ] = useState<Date[]>(date ? [ date ] : []);
  const [ offsetDate, onOffsetChange ] = useState<Date>();
  const [ isShow, changeIsShow ] = useState<boolean>(false);
  const [ error, changeError ] = useState<string | null>(null);
  const datePickerEl = useRef<HTMLDivElement | null>(null);
  const errorEl = useRef<HTMLDivElement | null>(null);

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

  const title = useMemo(() => activeCalendar === 'year' ?
    `${years[0].year} - ${years[years.length - 1].year}` :
    undefined,
  [ activeCalendar, years ]);

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

  const clickOverlay = (ev: MouseEvent<HTMLOrSVGElement>) => {
    ev.stopPropagation();
    changeIsShow(false);
  };

  const onChangeCalendar = (nextActiveCalendar: ActiveCalendar, newDate: Date): void => {
    if (type !== activeCalendar) {
      changeActiveCalendar(nextActiveCalendar);
    } else {
      const year = newDate.getUTCFullYear();
      const month = newDate.getUTCMonth() + 1;
      let day = date ? date.getUTCDate() : (paymentDay || newDate.getUTCDate());
      day = getCorrectDayInMonth(year, month, day);

      onDatesChange([ new Date(Date.UTC(year, month, day)) ]);
    }
  };

  const clearDate = () => {
    if (clearable) {
      onDatesChange([]);
    }
  };

  const prettyDate = date ? getPrettyDate(date) : placeholder;

  useEffect(() => {
    if (onChange) {
      const newValue = selectedDates[0] ? dateToString(selectedDates[0]) : null;

      if (value === newValue) {
        return;
      }

      onChange(newValue, name);
    }
  }, [ selectedDates, onChange, name, value ]);

  const parsedMinDate = useMemo(() => minDate && stringToDate(minDate), [ minDate ]);

  useEffect(() => {
    if (selectedDates[0] && parsedMinDate && parsedMinDate > selectedDates[0]) {
      changeError(minDateErrorText ? minDateErrorText : `Value must exceed ${minDate}`);
    } else if (error) {
      changeError(null);
    }
  }, [ selectedDates, parsedMinDate, minDateErrorText, minDate, error, changeError ]);

  useEffect(() => {
    if (!selectedDates[0] || !paymentDay) {
      return;
    }

    const year = selectedDates[0].getUTCFullYear();
    const month = selectedDates[0].getUTCMonth();
    const currentDay = selectedDates[0].getUTCDate();
    const newDay = getCorrectDayInMonth(year, month, paymentDay);

    if (currentDay === newDay) {
      return;
    }

    const newDate = dateUTC(year, month, newDay);

    if (selectedDates[0].getTime() !== newDate.getTime()) {
      onDatesChange([ newDate ]);
    }
  }, [ selectedDates, paymentDay, onDatesChange ]);

  return (
    <Wrapper className={className}>
      <Overlay
        className={isShow ? '_visible' : ''}
        onClick={clickOverlay}
      />

      {
        label ?
          <RLabel
            onClick={() => changeIsShow(!isShow)}
          >
            { label }
          </RLabel>
          : ''
      }

      <Button
        $blue={blue}
        $error={Boolean(error)}
        onClick={() => changeIsShow(!isShow)}
        // onFocus={() => changeIsShow(true)}
        // onBlur={() => changeIsShow(false)}
      >
        { prettyDate }

        {clearable && date && (
          <Clear onClick={clearDate}>
            <use xlinkHref="#plus"></use>
          </Clear>
        )}
      </Button>

      <CSSTransition
        in={isShow}
        nodeRef={datePickerEl}
        timeout={200}
        classNames="fade"
        unmountOnExit
      >
        <DatePicker
          ref={datePickerEl}
        >
          <RDatePickerHeader
            prevProps={headerPrevProps}
            nextProps={headerNextProps}
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
                changeActiveCalendar={onChangeCalendar}
              />
              : ''
          }
        </DatePicker>
      </CSSTransition>

      <CSSTransition
        in={Boolean(error)}
        nodeRef={errorEl}
        timeout={200}
        classNames="fade"
        unmountOnExit
      >
        <ErrorText ref={errorEl}>
          { error }
        </ErrorText>
      </CSSTransition>
    </Wrapper>
  );
};

export default RDatePicker;