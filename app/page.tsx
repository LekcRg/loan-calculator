'use client';

import { useState } from 'react';
import styled from 'styled-components';

import type { LoanMonth } from '@/types/Calculator';

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
  const [ calculatorState, setCalculatorState ] = useState<LoanMonth[]>();

  return (
    <MainBlock>
      <Calculator
        onChange={setCalculatorState}
      />
      <CalaculatorTable 
        calculateData={calculatorState}
      />
    </MainBlock>
  );
}
