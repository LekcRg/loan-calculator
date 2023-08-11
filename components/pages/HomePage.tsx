'use client';

import { useState } from 'react';
import styled from 'styled-components';

import type { LoanData } from '@/types/Calculator';

import CalculatorComponent from '@/components/Calculator';
import CalaculatorTable from '@/components/CalculatorTable';
import { calculateMonthly, calculateTable } from '@/assets/ts/calculator';

type Props = {
  initialState: LoanData,
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
  } = props;

  const [ calculatorState, setCalculatorState ] = useState<LoanData>(initialState);
  const [ monthly, setMonthly ] = useState<number>(calculateMonthly(calculatorState));
  const initialTableState = calculateTable(calculatorState, monthly);

  const onChangeCalculator = (state: LoanData) => {
    setCalculatorState(state);
    setMonthly(calculateMonthly(state));

    document.cookie = `calcState=${JSON.stringify(state)}`;
  };

  return (
    <MainBlock>
      <Calculator
        state={calculatorState}
        monthly={monthly}
        onChange={onChangeCalculator}
      />
      <CalaculatorTable
        initialState={initialTableState}
        calculateData={calculatorState || initialState}
        monthly={monthly || monthly}
      />
    </MainBlock>
  );
}
