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
    const calcuateDate = new Date(calculateData.date);

    let currentDate = calcuateDate;
    let year = calcuateDate.getFullYear();
    let month = calcuateDate.getMonth();
    const day = calcuateDate.getDate();

    while (amount > 0) {
      if (month < 11) {
        month++;
      } else {
        year++;
        month = 0;
      }

      const nextDate = new Date(year, month, day);
      const days = Math.round((nextDate.getTime() - currentDate.getTime()) / 1000 / 60 / 60 / 24);

      const principal = roundNumber((amount * ((calculateData.rate / 100) / 365)) * days);
      const interest = roundNumber(
        monthly < amount
          ? monthly - principal
          : amount - principal
      );
      const ending = monthly < amount ? roundNumber(amount - interest) : 0;

      if (interest <= 0) {
        return;
      }

      const prettyDay = day > 9 ? day : `0${day}`;
      const prettyMonth = month + 1 > 9 ? month + 1 : `0${month + 1}`;

      result.push({
        amount: amount > monthly ? monthly : amount,
        interest,
        principal,
        ending,
        date: `${prettyDay}.${prettyMonth}.${year}`,
      });

      amount = ending;
      currentDate = nextDate;
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
            date
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
                { i + 1 }
              </Cell>
              <Cell>
                { item.date }
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
