import { useState, useEffect, MouseEvent } from 'react';
import styled from 'styled-components';

import type { EarlyPayoff } from '@/types/Calculator';

import RInput from '@/components/ui/RInput';
import RButton from '@/components/ui/RButton';
import RDatePicker from '@/components/ui/RDatePicker';

type Props = {
  onChange: Function;
  payoffs: EarlyPayoff[];
  date: string;
};

const Title = styled.h4`
  font-size: 18px;
  font-weight: normal;
  text-align: center;
  margin-bottom: 8px;
`;

const List = styled.ul`
  margin-bottom: 15px;
`;

const Input = styled(RInput)`
  margin-bottom: 12px;
`;

const PayoffItem = styled.li`
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 16px;
  list-style-type: none;

  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const Button = styled(RButton)`
  margin-top: 18px;
`;

const addMonth = (toAddDate: string) => {
  const newDate: (string | number)[] = toAddDate.split('-');
  const month = Number(newDate[1]);

  if (month >= 12) {
    newDate[1] = month + 1;
    newDate[2] = Number(newDate[2]) + 1;
  } else {
    newDate[1] = month + 1;
  }

  return newDate.join('-');
};

const CalculatorEarlyPayoff = (props: Props) => {
  const { onChange, date } = props;

  const [payoffs, setPayoffs] = useState<EarlyPayoff[]>(props.payoffs);
  const [id, setId] = useState<number>(
    payoffs?.length ? payoffs[payoffs.length - 1].id + 1 : 1,
  );

  const onAddEarlyPayoff = (ev: React.MouseEvent<HTMLButtonElement>) => {
    let nextPayoffDate = addMonth(
      payoffs?.length ? payoffs[payoffs.length - 1].date : date,
    );

    setPayoffs([
      ...payoffs,
      {
        amount: 0,
        date: nextPayoffDate,
        id,
      },
    ]);

    setId(id + 1);
  };

  const onClickRemove = (index: number) => {
    setPayoffs([
      ...[...payoffs].splice(0, index),
      ...[...payoffs].splice(index + 1),
    ]);
  };

  const onInput = (value: Number | string, name: String) => {
    const nameArr = name.split('-');
    const nameObj = {
      key: nameArr[1],
      index: Number(nameArr[2]),
    };

    setPayoffs([
      ...[...payoffs].splice(0, nameObj.index),
      {
        ...payoffs[nameObj.index],
        [nameObj.key]: value,
      },
      ...[...payoffs].splice(nameObj.index + 1),
    ]);
  };

  useEffect(() => {
    onChange(payoffs);
  }, [payoffs, onChange]);

  return (
    <div className="container">
      <List>
        {payoffs.map((item, i: number) => (
          <PayoffItem key={item.id}>
            <Title>Early payoff #{i + 1}</Title>

            <Input
              numbers
              value={item.amount}
              label="Amount"
              placeholder="Amount"
              name={`payoff-amount-${i}`}
              autoComplete="off"
              onInput={onInput}
            />

            <RDatePicker
              value={item.date}
              name={`payoff-date-${i}`}
              type="month"
              label="Date"
              onChange={onInput}
            />

            <Button
              onClick={(ev: MouseEvent<HTMLButtonElement>) => onClickRemove(i)}
            >
              Remove
            </Button>
          </PayoffItem>
        ))}
      </List>

      <RButton onClick={onAddEarlyPayoff}>Add early payoff</RButton>
    </div>
  );
};

export default CalculatorEarlyPayoff;
