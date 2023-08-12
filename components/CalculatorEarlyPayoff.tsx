import { useState, useEffect } from 'react';
import styled from 'styled-components';

import type { EarlyPayoff } from '@/types/Calculator';

import RInput from '@/components/ui/RInput';

type Props = {
  onChange: Function,
  payoffs: EarlyPayoff[],
}

const Wrapper = styled.div`
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const currentDate = new Date();

const CalculatorEarlyPayoff = (props: Props) => {
  const {
    onChange,
  } = props;

  const [ payoffs, setPayoffs ] = useState<EarlyPayoff[]>(props.payoffs);

  const onAddEarlyPayoff = (ev: React.MouseEvent<HTMLButtonElement>) => {
    setPayoffs([
      ...payoffs,
      {
        amount: 0,
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
      },
    ]);
  };
  
  const onClickRemove = (ev: React.MouseEvent<HTMLButtonElement>, index: number) => {
    setPayoffs([
      ...[ ...payoffs ].splice(0, index),
      ...[ ...payoffs ].splice(index + 1),
    ]);
  };

  const onInput = (value: Number, name: String) => {
    const nameArr = name.split('-');
    const nameObj = {
      key: nameArr[1],
      index: Number(nameArr[2]),
    };

    setPayoffs([
      ...[ ...payoffs ].splice(0, nameObj.index),
      {
        ...payoffs[nameObj.index],
        [nameObj.key]: value,
      },
      ...[ ...payoffs ].splice(nameObj.index + 1),
    ]);
  };

  useEffect(() => {
    onChange(payoffs);
  }, [ payoffs, onChange ]);

  return (
    <Wrapper className="container">
      <button onClick={onAddEarlyPayoff}>
        Add early payoff
      </button>

      <ul>
        {
          payoffs.map((item, i: number) => (
            <li key={i}>
              <RInput
                numbers
                value={item.amount}
                label="Amount"
                placeholder="Amount"
                name={`payoff-amount-${i}`}
                autoComplete="off"
                onInput={onInput}
              />
              
              <RInput
                numbers
                value={item.month}
                label="Month"
                placeholder="Month"
                name={`payoff-month-${i}`}
                autoComplete="off"
                onInput={onInput}
              />

              <RInput
                numbers
                value={item.year}
                label="Year"
                placeholder="Year"
                name={`payoff-year-${i}`}
                autoComplete="off"
                onInput={onInput}
              />

              <button onClick={(ev) => onClickRemove(ev, i)}>
                remove
              </button>
            </li>
          ))
        }
      </ul>
    </Wrapper>
  );
};

export default CalculatorEarlyPayoff;