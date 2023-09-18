import styled from 'styled-components';
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

const ResultItem = styled.li<{ $big?: boolean }>`
  font-size: 20px;

  ${props => props.$big ? `
    width: 100%;
  ` : ''}
`;

const ResultLabel = styled.div`
  font-size: 12px;
  line-height: 1;
  margin-bottom: 8px;
`;

const ResultNum = styled(RNumber)<{ $big?: boolean, $percent?: boolean }>`
  line-height: 1;
  font-size: ${props => props.$big ? '32px' : '24px'};
  font-weight: 700;
  line-height: 100%;

  ${props => props.$percent ? `
    margin-left: 10px;
    opacity: .3;
  ` : ''
}
`;

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
                  ) : ''
              }

              {
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
              }
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