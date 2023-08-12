'use client';

import { useState } from 'react';
import styled from 'styled-components';

import type { LoanData, EarlyPayoff } from '@/types/Calculator';

import { calculateMonthly, calculateTable } from '@/assets/ts/calculator';

import CalculatorComponent from '@/components/Calculator';
import CalculatorEarlyPayoff from '../CalculatorEarlyPayoff';
import CalaculatorTable from '@/components/CalculatorTable';

type Props = {
  initialState: LoanData,
  initialPayoffs: EarlyPayoff[],
}

const MainBlock = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Calculator = styled(CalculatorComponent)`
  margin-bottom: 20px;
`;

export default function Home(props: Props) {
  const {
    initialState,
    initialPayoffs,
  } = props;

  const [ calculatorState, setCalculatorState ] = useState<LoanData>(initialState);
  const [ monthly, setMonthly ] = useState<number>(calculateMonthly(calculatorState));
  const [ payoffs, setPayoffs ] = useState<EarlyPayoff[]>(initialPayoffs);
  const initialTableState = calculateTable(calculatorState, monthly, payoffs);

  const onChangeCalculator = (state: LoanData) => {
    setCalculatorState(state);
    setMonthly(calculateMonthly(state));

    document.cookie = `calcState=${JSON.stringify(state)}`;
  };

  const onChangePayoffs = (payoffs: EarlyPayoff[]) => {
    setPayoffs(payoffs);
    document.cookie = `calcPayoffs=${JSON.stringify(payoffs)}`;
  };

  return (
    <MainBlock>
      <Calculator
        state={calculatorState}
        monthly={monthly}
        onChange={onChangeCalculator}
      />
      <CalculatorEarlyPayoff
        payoffs={payoffs}
        onChange={onChangePayoffs}
      />
      <CalaculatorTable
        initialState={initialTableState}
        calculateData={calculatorState || initialState}
        monthly={monthly}
        payoffs={payoffs}
      />
    </MainBlock>
  );
}
