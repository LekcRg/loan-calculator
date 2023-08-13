import styled from 'styled-components';

import type { DPCalendar } from '@rehookify/datepicker';

type ActiveCalendar = 'date' | 'month' | 'year';

type Props = {
  calendars: DPCalendar[];
  activeCalendar: ActiveCalendar,
  title?: string,
  prevProps: Function,
  nextProps: Function,
  changeActiveCalendar: Function,
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
`;

const HeaderTitle = styled.div`
  width: 100%;
  text-align: center;
`;

const HeaderBtn = styled.button`
  padding: 4px;
  background: transparent;
  outline: none;
  border: none;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  transition: opacity .3s ease;

  &:hover {
    opacity: .8;
  }

  &:not(:last-child) {
    margin-right: 8px;
  }
`;

const HeaderArrow = styled.div`
  width: 10px;
  height: 10px;
  border-width: 2px 2px 0 0;
  border-color: #ddd;
  border-style: solid;
  transform: rotate(45deg);
  cursor: pointer;

  &._prev {
    transform: rotate(-135deg);
  }
`;

const RDatePickerHeader = (props: Props) => {
  const {
    prevProps,
    nextProps,
    calendars,
    activeCalendar,
    changeActiveCalendar,
    title,
  } = props;

  const { year, month } = calendars[0];

  return (
    <Header>
      <HeaderArrow 
        className="_prev"
        {...prevProps()}
      />

      <HeaderTitle>
        {
          title ?
            <HeaderBtn>
              {title}
            </HeaderBtn>
            : null
        }
        {
          activeCalendar === 'date' ?
            <HeaderBtn
              onClick={() => changeActiveCalendar('month')}
            >
              {month}
            </HeaderBtn>
            : null
        }
        {
          activeCalendar === 'date' || activeCalendar === 'month' ?
            <HeaderBtn
              onClick={() => changeActiveCalendar('year')}
            >
              {year}
            </HeaderBtn>
            : ''
        }
      </HeaderTitle>

      <HeaderArrow
        {...nextProps()}
      />
    </Header>
  );
};

export default RDatePickerHeader;