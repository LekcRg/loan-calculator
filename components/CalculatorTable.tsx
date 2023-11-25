'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { media } from '@/styles/mixins';

import { roundAndSplitThousands } from '@/assets/ts/textUtils';
import { calculateTable } from '@/assets/ts/calculator';
import RButton from '@/components/ui/RButton';

import type { LoanData, EarlyPayoff, CalculateTableData } from '@/types/Calculator';

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

const TableScroll = styled.div`
  width: 100%;

  ${media.mobile} {
    overflow: auto;
  }
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
`;

const TableHead = styled.tr`
  position: sticky;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.colors.dark1};
  z-index: 1;
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

  @media (hover:hover) {
    &:hover {
      background: ${({ theme }) => theme.colors.dark2};

      ${CellValue} {
        font-weight: 600;
        transform: scale(1.15);
      }
    }
  }

  &._payoff {
    background-color: ${({ theme }) => theme.colors.accent5};
    color: ${({ theme }) => theme.colors.accent};

    @media (hover:hover) {
      &:hover {
        background-color: ${({ theme }) => theme.colors.accent6};
      }
    }
  }
`;

const CalculatorTable = (props: Props) => {
  // TODO: Components for rows, head etc

  const {
    className,
    calculateData,
    monthly,
    initialState,
    payoffs,
  } = props;

  const [ tableState, setTableState ] = useState<CalculateTableData>(initialState);

  const exportCSV = () => {
    const arrCSV = [
      [ '#', 'Date', 'Full payment', 'Principal', 'Interest', 'Ending balance' ],
      ...tableState.months.map(item => {
        return [
          (item?.index !== undefined && !isNaN(item?.index)) ? item.index + 1 : '',
          `${item.date}`,
          Math.round(item.amount * 100) / 100,
          Math.round(item.principal * 100) / 100,
          item.isPayoff ? 'Reduce loan term' : Math.round(item.interest * 100) / 100,
          Math.round(item.ending * 100) / 100,
        ].join(',');
      }),
    ];

    const blob = new Blob([ arrCSV.join('\n') ], { type: 'text/csv' });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('href', url);

    a.setAttribute('download', 'minimite.csv');

    a.click();
  };

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

        <RButton
          type="accent-color"
          onClick={exportCSV}
        >
          Export
        </RButton>
      </Header>
      <TableScroll>
        <Table>
          <tbody>
            <TableHead>
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
            </TableHead>
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
      </TableScroll>
    </Wrapper>
  );
};

export default CalculatorTable;
