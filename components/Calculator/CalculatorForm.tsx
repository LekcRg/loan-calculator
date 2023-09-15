import styled from 'styled-components';

import type { LoanData } from '@/types/Calculator';

import CalculatorResult from './CalculatorResult';
import RDatePicker from '@/components/ui/RDatePicker';
import RInput from '@/components/ui/RInput';

type Props = {
  state: LoanData;
  monthly: number | undefined | null;
  onInput: Function;
}

const Form = styled.form`
  flex-direction: column;
  margin-bottom: 20px;
  flex: 1;
`;

const Input = styled(RInput)`
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const CalculatorForm = (props: Props) => {
  const {
    state,
    monthly,
    onInput,
  } = props;

  return (
    <Form
      onSubmit={ev => ev.preventDefault()}
    >
      <Input
        blue
        numbers
        value={state.amount}
        label="Loan amount"
        placeholder="Loan amount"
        name="amount"
        autoComplete="off"
        onInput={onInput}
      />

      <Input
        blue
        numbers
        value={state.term}
        label="Term (years)"
        placeholder="Term"
        name="term"
        autoComplete="off"
        onInput={onInput}
      />

      <Input
        blue
        numbers
        value={state.rate}
        label="Rate"
        placeholder="Rate"
        name="rate"
        autoComplete="off"
        onInput={onInput}
      />

      <RDatePicker
        blue
        value={state.date}
        label="Date"
        name="date"
        onChange={onInput}
      />

      <CalculatorResult monthly={monthly}/>
    </Form>
  );
};

export default CalculatorForm;