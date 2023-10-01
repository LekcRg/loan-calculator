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
  align-items: center;
  width: 100%;
  padding: 10px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.dark4};
  user-select: none;
`;

const HeaderTitle = styled.div`
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

const HeaderArrow = styled.svg`
  width: 18px;
  height: 18px;
  outline: none;
  cursor: pointer;

  &._prev {
    transform: rotate(180deg);
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
      {/* <HeaderArrow 
        className="_prev"
        {...prevProps()}
      /> */}

      <HeaderArrow 
        {...prevProps()}
        className="_prev"
        viewBox="0 0 18 18"
      >
        <use xlinkHref="#arr-right"></use>
      </HeaderArrow>

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

      {/* <HeaderArrow
        {...nextProps()}
      /> */}

      <HeaderArrow 
        {...nextProps()}
        viewBox="0 0 18 18"
      >
        <use xlinkHref="#arr-right"></use>
      </HeaderArrow>
    </Header>
  );
};

export default RDatePickerHeader;