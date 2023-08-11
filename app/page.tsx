import { cookies } from 'next/headers';

import { calculateMonthly, calculateTable } from '@/assets/ts/calculator';

import HomePage from '@/components/pages/HomePage';
import { LoanData } from '@/types/Calculator';

const initialState:LoanData = {
  amount: 5000000,
  term: 10,
  rate: 12,
  date: '02.02.2022',
};

const getCookiesState = (): LoanData => {
  const cookiesStore = cookies();
  const cookiesState = cookiesStore.get('calcState');

  if (cookiesState && cookiesState?.value
    && cookiesState.value[0] === '{'
    && cookiesState.value[cookiesState.value?.length - 1] === '}') {
    return JSON.parse(cookiesState.value);
  }

  return initialState;
};

export default function Home() {
  const state = getCookiesState();

  return (
    <HomePage 
      initialState={state}
    />
  );
}
