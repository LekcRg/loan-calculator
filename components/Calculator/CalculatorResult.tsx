import styled from 'styled-components';
import { RNumber } from '@/components/ui/RNumber';

type Props = {
  monthly?: number | null,
}

const Result = styled.div`
  margin-top: 50px;
  padding: 24px;
  margin-top: 12px;
  font-size: 20px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.accent4};
`;

const ResultLabel = styled.div`
  font-size: 12px;
  line-height: 1;
  margin-bottom: 8px;
`;

const ResultNum = styled(RNumber)`
  line-height: 1;
  font-size: 32px;
  font-weight: 700;
  line-height: 100%;
`;

const CalculatorResult = (props: Props) => {
  const {
    monthly,
  } = props;

  return monthly ?
    (
      <Result>
        <ResultLabel>
            Monthly payments:{' '}
          {/* <span>{roundAndSplitThousands(Math.round(monthly * 100) / 100)}</span> */}
        </ResultLabel>
        <ResultNum
          num={monthly}
          lastSymbol='€'
        />
      </Result>
    )
    : (
      <Result>
        <span>Fill in all the fields</span>
      </Result>
    );
  
};

export default CalculatorResult;