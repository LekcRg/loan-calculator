'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { roundAndSplitThousands } from '@/assets/ts/textUtils';

import type { LoanData, TableRow } from '@/types/Calculator';

type Props = {
  className?: string,
  calculateData?: LoanData,
  monthly?: number,
}

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
`;

const HeadCell = styled.th`
  padding: 16px 0 10px;
  border-bottom: 1px solid #ddd;
`;

const Row = styled.tr`
  background: rgba(20, 20, 20, 0);
  transition: background .2s ease;

  &:hover {
    background: rgba(20, 20, 20, 1);
  }
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

  useEffect(() => {
    if (!calculateData || !monthly || !calculateData?.amount || !calculateData?.rate || !calculateData?.term) {
      return;
    }

    let amount = calculateData.amount;
    const result:TableRow[] = [];
    const calcuateDate = new Date(calculateData.date.replace(/\./g, '/'));

    let currentDate = calcuateDate;
    let year = calcuateDate.getFullYear();
    let month = calcuateDate.getMonth();
    const day = calcuateDate.getDate();

    const msToDay = 1000 * 60 * 60 * 24;

    while (amount > 0) {
      const currentYear = new Date(year, 0, 1);
      const nextYear = new Date(year + 1, 0, 1);
      const yearDays = (nextYear.getTime() - currentYear.getTime()) / msToDay;

      if (month < 11) {
        month++;
      } else {
        year++;
        month = 0;
      }

      const nextDate = new Date(year, month, day);
      const monthDays = (nextDate.getTime() - currentDate.getTime()) / msToDay;

      const interest = amount * calculateData.rate * monthDays / yearDays / 100;

      const principal = monthly < amount
        ? monthly - interest
        : amount;
      const ending = monthly < amount ? ((amount - principal) * 100) / 100 : 0;

      if (principal <= 0) {
        return;
      }

      const prettyDay = day > 9 ? day : `0${day}`;
      const prettyMonth = month + 1 > 9 ? month + 1 : `0${month + 1}`;

      result.push({
        interest,
        principal,
        date: `${prettyDay}.${prettyMonth}.${year}`,
        amount: amount > monthly
          ? monthly
          : principal + interest,
        ending: ending > 0
          ? ending
          : 0,
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
            Date
          </HeadCell>
          <HeadCell>
            Full payment
          </HeadCell>
          <HeadCell>
            Principal
          </HeadCell>
          <HeadCell>
            Interest
          </HeadCell>
          <HeadCell>
            Ending balance
          </HeadCell>
        </tr>
        {
          tableState.map((item, i) => (
            <Row key={i}>
              <Cell>
                { i + 1 }
              </Cell>
              <Cell>
                { item.date }
              </Cell>
              <Cell>
                { roundAndSplitThousands(item.amount) }
              </Cell>
              <Cell>
                { roundAndSplitThousands(item.principal) }
              </Cell>
              <Cell>
                { roundAndSplitThousands(item.interest) }
              </Cell>
              <Cell>
                {
                  roundAndSplitThousands(item.ending)
                }
              </Cell>
            </Row>
          ))
        }
      </tbody>
    </Table>
  );
};

export default CalculatorTable;
