'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { roundAndSplitThousands } from '@/assets/ts/textUtils';
import { calculateTable } from '@/assets/ts/calculator';

import type { LoanData, TableRow, EarlyPayoff } from '@/types/Calculator';

type Props = {
  className?: string;
  calculateData?: LoanData;
  monthly?: number;
  initialState: TableRow[];
  payoffs: EarlyPayoff[];
};

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
  transition: background 0.2s ease;

  &._payoff {
    background-color: rgba(0, 255, 0, 0.2);
  }

  &:hover {
    background: rgba(20, 20, 20, 1);
  }
`;

const Cell = styled.td`
  text-align: center;
  padding: 8px;
`;

const CalculatorTable = (props: Props) => {
  const { className, calculateData, monthly, initialState, payoffs } = props;

  const [tableState, setTableState] = useState<TableRow[]>(initialState);

  useEffect(() => {
    if (
      !calculateData ||
      !monthly ||
      !calculateData?.amount ||
      !calculateData?.rate ||
      !calculateData?.term
    ) {
      return;
    }

    const result: TableRow[] = calculateTable(calculateData, monthly, payoffs);
    setTableState(result);
  }, [calculateData, setTableState, monthly, payoffs]);

  return (
    <Table className={`container ${className}`}>
      <tbody>
        <tr>
          <HeadCell>id</HeadCell>
          <HeadCell>Date</HeadCell>
          <HeadCell>Full payment</HeadCell>
          <HeadCell>Principal</HeadCell>
          <HeadCell>Interest</HeadCell>
          <HeadCell>Ending balance</HeadCell>
        </tr>
        {tableState.map((item, i) => (
          <Row key={i} className={item.isPayoff ? '_payoff' : ''}>
            <Cell>
              {!item.isPayoff && item?.index !== undefined
                ? item.index + 1
                : ''}
            </Cell>
            <Cell>{item.date}</Cell>
            <Cell>{roundAndSplitThousands(item.amount)}</Cell>
            <Cell>{roundAndSplitThousands(item.principal)}</Cell>
            <Cell>{roundAndSplitThousands(item.interest)}</Cell>
            <Cell>{roundAndSplitThousands(item.ending)}</Cell>
          </Row>
        ))}
      </tbody>
    </Table>
  );
};

export default CalculatorTable;
