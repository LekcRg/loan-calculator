export type LoanData = {
  amount: number,
  term: number,
  rate: number,
  date: string,
}

export type TableRow = {
  index?: number,
  amount: number,
  interest: number,
  principal: number,
  ending: number,
  date: string,
  isPayoff: boolean,
}

export type EarlyPayoff = {
  amount: number,
  date: string,
  type: 'payment' | 'loan',
  id: number
}
