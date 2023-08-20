import { cookies } from 'next/headers';

import HomePage from '@/components/pages/HomePage';
import type { LoanData, EarlyPayoff } from '@/types/Calculator';

const initialState: LoanData = {
  amount: 5000000,
  term: 10,
  rate: 12,
  date: '2022-02-02',
};

const getCookiesState = (): {
  calcState: LoanData,
  calcPayoffs: EarlyPayoff[],
} => {
  const cookiesStore = cookies();
  const cookiesState = cookiesStore.get('calcState');
  const cookiesPayoffs = cookiesStore.get('calcPayoffs');

  let returnState;
  let resturnPayoffs;

  if (cookiesState && cookiesState?.value
    && cookiesState.value[0] === '{'
    && cookiesState.value[cookiesState.value?.length - 1] === '}') {
    returnState = JSON.parse(cookiesState.value);
  }

  if (cookiesPayoffs && cookiesPayoffs?.value
    && cookiesPayoffs.value[0] === '['
    && cookiesPayoffs.value[cookiesPayoffs.value?.length - 1] === ']') {
    resturnPayoffs = JSON.parse(cookiesPayoffs.value);
  }

  return {
    calcState: returnState || initialState,
    calcPayoffs: resturnPayoffs || [],
  };
};

export default function Home() {
  const cookiesValues = getCookiesState();

  const state = cookiesValues.calcState;
  const payoffs = cookiesValues.calcPayoffs;

  return (
    <HomePage 
      initialState={state}
      initialPayoffs={payoffs}
    />
  );
}
