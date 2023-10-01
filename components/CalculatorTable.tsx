'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { roundAndSplitThousands } from '@/assets/ts/textUtils';
import { calculateTable } from '@/assets/ts/calculator';

import type { LoanData, TableRow, EarlyPayoff, CalculateTableData } from '@/types/Calculator';

type Props = {
  className?: string,
  calculateData?: LoanData,
  monthly?: number,
  initialState: CalculateTableData,
  payoffs: EarlyPayoff[],
}

const Wrapper = styled.section`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Title = styled.h4`
  font-weight: 400;
  font-size: 32px;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
`;

const HeadCell = styled.th`
  padding: 16px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.dark3};
  color: ${({ theme }) => theme.colors.light3};
  width: 20%;
  font-weight: 600;

  &:first-child {
    width: 50px;
  }
`;

const Cell = styled.td`
  text-align: center;
  width: 20;
  padding: 16px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.dark3};
  transition: all .2s ease;

  &:first-child {
    width: 50px;
  }
`;

const CellValue = styled.div`
  font-size: 14px;
  font-weight: 400;
  transition: all .3s ease;
`;

const Row = styled.tr`
  background: rgba(20, 20, 20, 0);
  transition: all .3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.dark2};

    ${CellValue} {
      font-weight: 600;
      transform: scale(1.15);
    }
  }

  &._payoff {
    background-color: ${({ theme }) => theme.colors.accent5};
    color: ${({ theme }) => theme.colors.accent};

    &:hover {
      background-color: ${({ theme }) => theme.colors.accent6};
    }
  }
`;

const CalculatorTable = (props: Props) => {
  const {
    className,
    calculateData,
    monthly,
    initialState,
    payoffs,
  } = props;

  const [ tableState, setTableState ] = useState<CalculateTableData>(initialState);

  useEffect(() => {
    if (!calculateData || !monthly || !calculateData?.amount || !calculateData?.rate || !calculateData?.term) {
      return;
    }

    const result:CalculateTableData = calculateTable(calculateData, monthly, payoffs);
    setTableState(result);
  }, [ calculateData, setTableState, monthly, payoffs ]);

  return (
    <Wrapper className={`container ${className}`}>
      <Header>
        <Title>
          Loan table
        </Title>
      </Header> 
      <Table>
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
            tableState?.months?.map((item, i) => (
              <Row
                key={i}
                className={item.isPayoff ? '_payoff' : ''}
              >
                <Cell>
                  <CellValue>
                    {
                      !item.isPayoff && (item?.index !== undefined)
                        ? item.index + 1 
                        : ''
                    }
                  </CellValue>
                </Cell>
                <Cell>
                  <CellValue>
                    { item.date }
                  </CellValue>
                </Cell>
                <Cell>
                  <CellValue>
                    { roundAndSplitThousands(item.amount) }
                  </CellValue>
                </Cell>
                <Cell>
                  <CellValue>
                    { roundAndSplitThousands(item.principal) }
                  </CellValue>
                </Cell>
                <Cell>
                  <CellValue>
                    { roundAndSplitThousands(item.interest) }
                  </CellValue>
                </Cell>
                <Cell>
                  <CellValue>
                    {
                      roundAndSplitThousands(item.ending)
                    }
                  </CellValue>
                </Cell>
              </Row>
            ))
          }
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default CalculatorTable;
