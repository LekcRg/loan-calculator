export type LoanData = {
  amount: number;
  term: number;
  rate: number;
  date: string;
}

export type CalculateTableData = {
  months: TableRow[],
  totalPayments?: number,
  overPayment?: number,
  overPaymentPercent?: number,
}

export type TableRow = {
  index?: number;
  amount: number;
  interest: number;
  principal: number;
  ending: number;
  date: string;
  isPayoff: boolean;
}

export type EarlyPayoff = {
  amount: number;
  date: string;
  dateEnd?: string;
  type: 'payment' | 'term';
  frequency: 'one-time' | 'month';
  addedEvery?: Boolean;
  id: number;
}
