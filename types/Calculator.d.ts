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
  // type: 'payment' | 'term';
  type: {
    value: 'payment' | term;
    label: string;
  };
  frequency: {
    value: 'one-time' | 'month';
    label: string;
  };
  addedEvery?: Boolean;
  id: number;
}
