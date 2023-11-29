import { useState, useEffect, MouseEvent, useMemo } from 'react';
import styled from 'styled-components';

import type { EarlyPayoff } from '@/types/Calculator';

import RButton from '@/components/ui/RButton';
import EarlyPayoffItem from './EarlyPayoff';
import { getCorrectDayInMonth } from '@/assets/ts/dateUtils';

type Props = {
  date: string,
  payoffs: EarlyPayoff[],
  className?: string,
  onChange: Function,
}

const List = styled.ul`
  margin-bottom: 15px;
`;

const addMonth = (toAddDate: string, day: number) => {
  const newDate: (string | number)[] = toAddDate.split('-');
  const year = Number(newDate[0]);
  const month = Number(newDate[1]);
  const newDay = Number(day);

  if (month >= 12) {
    newDate[1] = month + 1;
    newDate[2] = year + 1;
  } else {
    newDate[1] = month + 1;
  }

  newDate[2] = getCorrectDayInMonth(year, month, newDay);

  return newDate.join('-');
};

const EarlyPayoffList = (props: Props) => {
  const {
    date,
    className = '',
    onChange,
  } = props;

  const [ payoffs, setPayoffs ] = useState<EarlyPayoff[]>(props.payoffs);
  const [ id, setId ] = useState<number>(payoffs?.length ? payoffs[payoffs.length - 1].id + 1 : 1);
  const paymentDay = useMemo(() => Number(date.split('-')[2]), [ date ]);

  const onAddEarlyPayoff = (ev: MouseEvent<HTMLButtonElement>) => {
    let nextPayoffDate = addMonth(
      payoffs?.length 
        ? payoffs[payoffs.length - 1].date 
        : date,
      paymentDay
    );

    setPayoffs([
      ...payoffs,
      {
        amount: 1000,
        date: nextPayoffDate,
        id,
        type: {
          label: 'Reduce loan term',
          value: 'term',
        },
        frequency: {
          label: 'One-time',
          value: 'one-time',
        },
      },
    ]);

    setId(id + 1);
  };

  const onClickRemove = (index: number) => {
    setPayoffs([
      ...[ ...payoffs ].splice(0, index),
      ...[ ...payoffs ].splice(index + 1),
    ]);
  };

  const onChangeValues = (value: Number | string, name: String) => {
    const nameArr = name.split('-');

    const nameObj = {
      key: nameArr[1],
      index: Number(nameArr[2]),
    };

    const newObj = {
      ...payoffs[nameObj.index],
      [nameObj.key]: value,
    };

    if (nameObj.key === 'frequency' && value === 'one-time') {
      delete newObj.dateEnd;
    }

    setPayoffs([
      ...[ ...payoffs ].splice(0, nameObj.index),
      newObj,
      ...[ ...payoffs ].splice(nameObj.index + 1),
    ]);
  };

  useEffect(() => {
    onChange(payoffs);
  }, [ payoffs, onChange ]);

  return (
    <div className={`container ${className}`}>
      <List>
        {
          payoffs.map((item, i: number) => (
            <EarlyPayoffItem
              key={item.id}
              item={item}
              index={i}
              loanDate={date}
              onChangeValues={onChangeValues}
              onClickRemove={onClickRemove}
            />
          ))
        }
      </List>

      <RButton
        icon="plus"
        onClick={onAddEarlyPayoff}
        type="accent"
      >
        Add early payoff
      </RButton>
    </div>
  );
};

export default EarlyPayoffList;