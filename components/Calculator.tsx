import styled from 'styled-components';

import type { LoanData } from '@/types/Calculator';
import { roundAndSplitThousands } from '@/assets/ts/textUtils';

import RInput from '@/components/ui/RInput';
import RDatePicker from '@/components/ui/RDatePicker';
import { RNumber } from '@/components/ui/RNumber';

type Props = {
  onChange: Function,
  state: LoanData,
  monthly: number | undefined | null,
  className?: string,
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
    className,
  } = props;

  const onInput = (
    value: string | number,
    key: string,
  ) => {
    if (!key) {
      console.warn('onInputAmount: Empty key');
    }

    const newState = {
      ...state,
      [key]: value,
    };

    if (JSON.stringify(state) !== JSON.stringify(newState)) {
      onChange({ ...newState });
    }

  };

  return (
    <CalculatorBlock className={`container ${className}`}>
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

        <RDatePicker
          value={state.date}
          label="Date"
          name="date"
          onChange={onInput}
        />
      </Wrapper>

      {
        monthly ?
          (
            <Result>
              Monthly payments:{' '}
              {/* <span>{roundAndSplitThousands(Math.round(monthly * 100) / 100)}</span> */}
              <RNumber num={monthly}/>
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
