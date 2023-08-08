import React, { useEffect } from 'react';
import styled from 'styled-components';

import type { LoanMonth } from '@/types/Calculator';

type Props = {
  className?: string,
  calculateData?: LoanMonth[],
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
  } = props;

  const data = [
    {
      amount: 23536.74,
      interest: 18440.85,
      principal: 5095.89,
    },
    {
      amount: 23536.74,
      interest: 18440.85,
      principal: 5095.89,
    },
    {
      amount: 23536.74,
      interest: 18440.85,
      principal: 5095.89,
    },
    {
      amount: 23536.74,
      interest: 18440.85,
      principal: 5095.89,
    },
    {
      amount: 23536.74,
      interest: 18440.85,
      principal: 5095.89,
    },
  ];

  // useEffect(() => {
  //   // calculate here
  // }, [ calculateData ]);

  return (
    <Table className="container">
      <tbody>
        <tr>
          <HeadCell>
            Amount
          </HeadCell>
          <HeadCell>
            Interest
          </HeadCell>
          <HeadCell>
            Principal
          </HeadCell>
        </tr>
        {
          data.map((item, i) => (
            <tr key={i}>
              <Cell>
                { item.amount }
              </Cell>
              <Cell>
                { item.interest }
              </Cell>
              <Cell>
                { item.principal }
              </Cell>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
};

export default CalculatorTable;
