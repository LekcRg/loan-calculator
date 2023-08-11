'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { roundAndSplitThousands } from '@/assets/ts/textUtils';
import { calculateTable } from '@/assets/ts/calculator';

import type { LoanData, TableRow } from '@/types/Calculator';

type Props = {
  className?: string,
  calculateData?: LoanData,
  monthly?: number,
  initialState: TableRow[], 
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
    initialState,
  } = props;

  const [ tableState, setTableState ] = useState<TableRow[]>(initialState);

  useEffect(() => {
    if (!calculateData || !monthly || !calculateData?.amount || !calculateData?.rate || !calculateData?.term) {
      return;
    }

    const result:TableRow[] = calculateTable(calculateData, monthly);
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
