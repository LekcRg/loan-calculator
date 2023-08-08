'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { prettyNumber, roundNumber } from '@/assets/ts/textUtils';

import type { LoanData, TableRow } from '@/types/Calculator';

type Props = {
  className?: string,
  calculateData?: LoanData,
  monthly?: number,
}

const Table = styled.table`
  width: 100%;
`;

const HeadCell = styled.th`
  padding: 16px 0 10px;
  border-bottom: 1px solid #ddd;
`;

const Cell = styled.td`
  text-align: center;
  padding: 8px;
`;

const CalculatorTable = (props: Props) => {
  const {
    className,
    calculateData,
    monthly,
  } = props;

  const [ tableState, setTableState ] = useState<TableRow[]>([]);

  // ms to days
  // (end - start) / 1000 / 60 / 60 / 24

  useEffect(() => {
    if (!calculateData || !monthly || !calculateData?.amount || !calculateData?.rate || !calculateData?.term) {
      return;
    }

    let amount = calculateData.amount;
    const result:TableRow[] = [];

    while (amount > 0) {
      const principal = roundNumber((amount * ((calculateData.rate / 100) / 365)) * 31);
      const interest = roundNumber(monthly - principal);
      const ending = roundNumber(amount - interest);

      if (interest <= 0) {
        return;
      }

      result.push({
        amount: amount > monthly ? monthly : amount,
        interest,
        principal,
        ending,
      });

      amount = ending;
    }

    setTableState(result);
  }, [ calculateData, setTableState, monthly ]);

  return (
    <Table 
      className={`container ${className}`}
    >
      <tbody>
        <tr>
          <HeadCell>
            id
          </HeadCell>
          <HeadCell>
            Amount
          </HeadCell>
          <HeadCell>
            Interest
          </HeadCell>
          <HeadCell>
            Principal
          </HeadCell>
          <HeadCell>
            Ending balance
          </HeadCell>
        </tr>
        {
          tableState.map((item, i) => (
            <tr key={i}>
              <Cell>
                { i }
              </Cell>
              <Cell>
                { prettyNumber(item.amount) }
              </Cell>
              <Cell>
                { prettyNumber(item.interest) }
              </Cell>
              <Cell>
                { prettyNumber(item.principal) }
              </Cell>
              <Cell>
                { 
                  item.ending > 0
                    ? prettyNumber(item.ending)
                    : 0 
                }
              </Cell>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
};

export default CalculatorTable;
