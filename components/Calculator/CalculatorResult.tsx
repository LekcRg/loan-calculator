import styled, { css } from 'styled-components';
import { RNumber } from '@/components/ui/RNumber';
import { CalculateTableData } from '@/types/Calculator';

type Props = {
  monthly?: number | null,
  tableState: CalculateTableData,
}

const Result = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 50px;
  padding: 24px;
  gap: 40px 0;
  margin-top: 12px;
  border-radius: 6px;
  list-style-type: none;
  background: ${({ theme }) => theme.colors.accent4};
`;

interface ResultValueProps {
  $big?: boolean;
  $percent?: boolean;
};

const ResultValue = css<ResultValueProps>`
  line-height: 1;
  font-size: ${props => props.$big ? '32px' : '24px'};
  font-weight: 700;
  height: 24px;

  ${props => props.$percent ? `
    margin-left: 10px;
    opacity: .3;
  ` : ''}
`;

const ResultItem = styled.li<{ $big?: boolean, $error?: boolean }>`
  font-size: 20px;

  ${props => props.$big ? `
    width: 100%;
  ` : ''}

  ${props => props.$error ? `
    opacity: .5;
  ` : ''}
`;

const ResultLabel = styled.div`
  font-size: 12px;
  line-height: 1;
  margin-bottom: 8px;
`;

const ResultNum = styled(RNumber)<ResultValueProps>`${ResultValue}`;

const ResultStr = styled.span<ResultValueProps>`${ResultValue}`;

const CalculatorResult = (props: Props) => {
  const {
    monthly,
    tableState,
  } = props;

  return (
    <Result>
      {
        monthly ?
          (
            <>
              <ResultItem $big>
                <ResultLabel>
                Monthly payments:
                </ResultLabel>
                <ResultNum
                  $big
                  num={monthly}
                  lastSymbol=' €'
                />
              </ResultItem>

              {
                tableState?.totalPayments ? 
                  (
                    <ResultItem>
                      <ResultLabel>
                        Total payments:
                      </ResultLabel>
                      <ResultNum
                        num={tableState.totalPayments}
                        lastSymbol=' €'
                      />
                    </ResultItem>
                  ) : (
                    <ResultItem $error>
                      <ResultLabel>
                        Total payments, overpayment:
                      </ResultLabel>
                      <ResultStr>
                        Calculation is not possible
                      </ResultStr>
                    </ResultItem>
                  )
              }

              {/* {
                tableState?.overPayment && tableState.overPaymentPercent ? 
                  (
                    <ResultItem>
                      <ResultLabel>
                        Overpayment:
                      </ResultLabel>
                      <div>
                        <ResultNum
                          num={tableState.overPayment}
                          lastSymbol=' €'
                        />
                        <ResultNum
                          $percent
                          num={tableState.overPaymentPercent}
                          lastSymbol='%'
                        />
                      </div>
                    </ResultItem>
                  ) : ''
              } */}
            </>
          ) : (
            <Result>
              <span>Fill in all the fields</span>
            </Result>
          )
      }
    </Result>
  );
  
};

export default CalculatorResult;