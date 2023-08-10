import { useState, useEffect } from 'react';
import styled from 'styled-components';

import type { LoanData } from '@/types/Calculator';

import { roundAndSplitThousands } from '@/assets/ts/textUtils';

import RInput from '@/components/ui/RInput';

type Props = {
  onChange?: Function,
  values?: LoanData,
}

const CalculatorBlock = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled(RInput)`
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const Result = styled.div`
  margin-top: 12px;
  font-size: 20px;
  text-align: center;

  span {
    color: #0f0;
  }
`;

const getLocalStorageState = (): LoanData | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  let localStorageItem = localStorage.getItem('calcState');
  let localStorageState:LoanData | null = null;

  if (localStorageItem 
  && localStorageItem[0] === '{'
  && localStorageItem[localStorageItem.length - 1] === '}') {
    const state:LoanData = JSON.parse(localStorageItem);

    if (state?.amount && state?.term && state?.rate && state?.date) {
      localStorageState = { ...state };
    }
  }

  return localStorageState;
};

const initialState = {
  amount: 5000000,
  term: 10,
  rate: 12,
  date: '02.02.2022',
};

export default function Calculator(props: Props) {
  const { onChange } = props;
  const [ state, setState ] = useState<LoanData>(initialState);
  const [ monthly, setMonthly ] = useState<number | undefined>();

  const onInput = (
    value: string | number,
    key: string,
    ev: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!key) {
      console.warn('onInputAmount: Empty key');
    }

    setState({
      ...state,
      [key]: Number(value),
    });
  };

  useEffect(() => {
    if (!state.amount || !state.term || !state.rate) {
      return;
    }

    const monthRate = state.rate / 12 / 100;
    const months = state.term * 12;

    const monthlyPayment =
      (state.amount * monthRate * (1 + monthRate) ** months) /
      ((1 + monthRate) ** months - 1);

    if (monthlyPayment && !isNaN(monthlyPayment)) {
      setMonthly(monthlyPayment);

      localStorage.setItem('calcState', JSON.stringify({
        ...state,
      }));

      if (onChange) {
        onChange(state, monthlyPayment);
      }
    }
  }, [ state, onChange ]);

  return (
    <CalculatorBlock className="container">
      <Wrapper>
        <Input
          numbers
          value={state.amount}
          label="Loan amount"
          placeholder="Loan amount"
          name="amount"
          autoComplete="off"
          onInput={onInput}
        />

        <Input
          numbers
          value={state.term}
          label="Term (years)"
          placeholder="Term"
          name="term"
          autoComplete="off"
          onInput={onInput}
        />

        <Input
          numbers
          value={state.rate}
          label="Rate"
          placeholder="Rate"
          name="rate"
          autoComplete="off"
          onInput={onInput}
        />

        <Input
          value={state.date}
          label="Date (mm.dd.yyyy)"
          placeholder="Date"
          name="date"
          autoComplete="off"
          disabled
          onInput={onInput}
        />
      </Wrapper>

      {
        monthly ?
          (
            <Result>
              Monthly payments:{' '}
              <span>{roundAndSplitThousands(Math.round(monthly * 100) / 100)}</span>
            </Result>
          )
          : (
            <Result>
              <span>Fill in all the fields</span>
            </Result>
          )
      }
      
    </CalculatorBlock>
  );
}
