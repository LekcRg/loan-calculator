import { useState, useEffect, useRef, MouseEvent } from 'react';
import styled, { css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import { useDatePicker } from '@rehookify/datepicker';

import type { ActiveCalendar } from '@/types/RDatePicker';

import RLabel from './RLabel';
import RDatePickerHeader from '@/components/ui/RDatePicker/RDatePickerHeader';
import RDatePickerCalendar from '@/components/ui/RDatePicker/RDatePickerCalendar';
import RDatePickerInner from '@/components/ui/RDatePicker/RDatePickerInner';
import { dateNowUTC, dateToString, getCorrectDayInMonth, getPrettyDate, stringToDate } from '@/assets/ts/dateUtils';

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

const Button = styled.button<{ $blue?: boolean }>`
  position: relative;
  text-align: left;
  width: 100%;
  background: ${({ $blue, theme }) => $blue
    ? theme.colors.accent4
    : theme.colors.dark3};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.light1};
  padding: 11px;
  border-radius: 4px;
  outline: none;
  border: 1px ${({ $blue, theme }) => $blue 
    ? theme.colors.accent4
    : theme.colors.dark3} solid;
  cursor: pointer;

  ${({ $blue }) => !$blue && css`
    transition: border-color .3s ease;

    &:hover {
      border: 1px ${({ theme }) => theme.colors.dark4} solid;
    }

    &:focus {
      border: 1px ${({ theme }) => theme.colors.accent} solid;
    }
  `}
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
  } = props;

  let date = clearable 
    ? stringToDate(value || '')
    : stringToDate(value || '') || dateNowUTC();

  const [ activeCalendar, changeActiveCalendar ] = useState<ActiveCalendar>(type);
  const [ selectedDates, onDatesChange ] = useState<Date[]>(date ? [ date ] : []);
  const [ offsetDate, onOffsetChange ] = useState<Date>();
  const [ isShow, changeIsShow ] = useState<boolean>(false);
  const datePickerEl = useRef<HTMLDivElement | null>(null);

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
      const newValue = dateToString(selectedDates[0]);

      if (value === newValue) {
        return;
      }

      onChange(newValue, name);
    }
  }, [ selectedDates, onChange, name, value ]);

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
        onClick={() => changeIsShow(!isShow)}
        // onFocus={() => changeIsShow(true)}
        // onBlur={() => changeIsShow(false)}
        $blue={blue}
      >
        { prettyDate }

        {clearable && (
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
    </Wrapper>
  );
};

export default RDatePicker;