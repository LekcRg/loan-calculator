'use client';

import { useState } from 'react';
import styled from 'styled-components';

import type { LoanData } from '@/types/Calculator';

import CalculatorComponent from '@/components/Calculator';
import CalaculatorTable from '@/components/CalculatorTable';

const MainBlock = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Calculator = styled(CalculatorComponent)`
  margin-bottom: 20px;
`;

export default function Home() {
  const [ calculatorState, setCalculatorState ] = useState<LoanData>();
  const [ monthly, setMonthly ] = useState<number | undefined>();

  const onChangeCalculator = (state: LoanData, monthly: number) => {
    setCalculatorState(state);
    setMonthly(monthly);
  };

  return (
    <>
      <Calculator
        onChange={onChangeCalculator}
      />
      <CalaculatorTable
        calculateData={calculatorState}
        monthly={monthly}
      />
    </>
  );
}

export function getStaticProps() {
  return {
    props: {
      test: 1,
    },
  };
}
