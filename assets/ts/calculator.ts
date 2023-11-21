import type { LoanData, TableRow, CalculateTableData, EarlyPayoff } from '@/types/Calculator';
import { dateUTC, getPrettyDate, parseStringDate, stringToDate } from './dateUtils';

export const calculateMonthly = (state: LoanData, isMonth = false): number => {
  if (!state || !state.amount || !state.term || !state.rate) {
    return 0;
  }

  const monthRate = state.rate / 12 / 100;
  const months = isMonth ? state.term : state.term * 12;

  const monthlyPayment =
    (state.amount * monthRate * (1 + monthRate) ** months) /
    ((1 + monthRate) ** months - 1);

  if (monthlyPayment && !isNaN(monthlyPayment)) {
    return monthlyPayment;
  }

  return 0;
};

export const calculateTable = (
  calculateData: LoanData,
  monthly: number,
  payoffs: EarlyPayoff[],
): CalculateTableData => {
  if (!calculateData || !monthly || !calculateData?.amount || !calculateData?.rate || !calculateData?.term) {
    return { months: [] };
  }

  let amount = calculateData.amount;
  const result: TableRow[] = [];
  const calculateDate = stringToDate(calculateData.date);

  if (!calculateDate) {
    return { months: result };
  }

  let year = calculateDate.getUTCFullYear();
  let month = calculateDate.getUTCMonth();
  const day = calculateDate.getUTCDate();
  let index = 0;

  let newMonthly = monthly;
  let termMonth = calculateData.term * 12;
  let totalPayments = 0;
  const everyMonthPayoffs: EarlyPayoff[] = [];

  while (amount > 0) {
    if (month < 11) {
      month++;
    } else {
      year++;
      month = 0;
    }

    const payoffList = payoffs.filter(({ date }) => {
      const parsedDate = parseStringDate(date);

      return parsedDate?.month === month && parsedDate?.year === year;
    });
    payoffList.push(...everyMonthPayoffs);

    const nextDate = dateUTC(year, month, day);

    const interest = amount * calculateData.rate / 12 / 100;

    const principal = newMonthly < amount
      ? newMonthly - interest
      : amount;
    let ending = newMonthly < amount ? ((amount - principal) * 100) / 100 : 0;

    if (principal <= 0) {
      return { months: [] };
    }

    const baseItem = {
      date: getPrettyDate(nextDate),
    };
    const monthlyPayment = amount > newMonthly
      ? newMonthly
      : principal + interest;

    result.push({
      ...baseItem,
      index: index++,
      interest,
      principal,
      isPayoff: false,
      amount: monthlyPayment,
      ending: ending > 0
        ? ending
        : 0,
    });

    totalPayments += monthlyPayment;

    if (payoffList?.length || everyMonthPayoffs?.length) {
      payoffList.forEach(payoff => {
        const payoffAmount = payoff ? payoff.amount : 0;

        ending = ending - payoffAmount;

        result.push({
          ...baseItem,
          interest: 0,
          principal: payoffAmount,
          isPayoff: true,
          amount: payoffAmount,
          ending: ending,
        });

        totalPayments += payoffAmount;

        if (payoff.type === 'payment') {
          termMonth -= index;

          newMonthly = calculateMonthly({
            ...calculateData,
            term: termMonth,
            amount: ending,
          }, true);
        }

        if (!payoff.addedEvery && payoff.frequency === 'month') {
          everyMonthPayoffs.push({
            ...payoff,
            addedEvery: true,
          });
        }
      });
    }

    amount = ending;
  }

  const value: CalculateTableData = {
    months: result,
  };

  if (totalPayments) {
    value.totalPayments = totalPayments;
    value.overPayment = totalPayments - calculateData.amount;
    value.overPaymentPercent = Math.round((value.overPayment / calculateData.amount) * 1000) / 10;
  }

  return value;
};
