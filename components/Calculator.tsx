import styled from 'styled-components';

import type { LoanData } from '@/types/Calculator';
import { roundAndSplitThousands } from '@/assets/ts/textUtils';

import RInput from '@/components/ui/RInput';

type Props = {
  onChange: Function,
  state: LoanData,
  monthly: number | undefined | null,
}

const CalculatorBlock = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled(RInput)`
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const Result = styled.div`
  margin-top: 12px;
  font-size: 20px;
  text-align: center;

  span {
    color: #0f0;
  }
`;

export default function Calculator(props: Props) {
  const {
    onChange,
    state,
    monthly,
  } = props;

  const onInput = (
    value: string | number,
    key: string,
    ev: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!key) {
      console.warn('onInputAmount: Empty key');
    }

    onChange({
      ...state,
      [key]: Number(value),
    });
  };

  return (
    <CalculatorBlock className="container">
      <Wrapper>
        <Input
          numbers
          value={state.amount}
          label="Loan amount"
          placeholder="Loan amount"
          name="amount"
          autoComplete="off"
          onInput={onInput}
        />

        <Input
          numbers
          value={state.term}
          label="Term (years)"
          placeholder="Term"
          name="term"
          autoComplete="off"
          onInput={onInput}
        />

        <Input
          numbers
          value={state.rate}
          label="Rate"
          placeholder="Rate"
          name="rate"
          autoComplete="off"
          onInput={onInput}
        />

        <Input
          value={state.date}
          label="Date (mm.dd.yyyy)"
          placeholder="Date"
          name="date"
          autoComplete="off"
          disabled
          onInput={onInput}
        />
      </Wrapper>

      {
        monthly ?
          (
            <Result>
              Monthly payments:{' '}
              <span>{roundAndSplitThousands(Math.round(monthly * 100) / 100)}</span>
            </Result>
          )
          : (
            <Result>
              <span>Fill in all the fields</span>
            </Result>
          )
      }
    </CalculatorBlock>
  );
}
