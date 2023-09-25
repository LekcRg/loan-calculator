import styled from 'styled-components';

import type { CalculateTableData, LoanData } from '@/types/Calculator';

import CalculatorResult from './CalculatorResult';
import RDatePicker from '@/components/ui/RDatePicker';
import RInput from '@/components/ui/RInput';
import RSlider from '@/components/ui/RSlider';

type Props = {
  state: LoanData;
  monthly: number | undefined | null;
  tableState: CalculateTableData;
  onInput: ((value: string | number, name: string) => void);
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
    tableState,
    onInput,
  } = props;

  return (
    <Form
      onSubmit={ev => ev.preventDefault()}
    >
      <RSlider
        label="Loan amount"
        name="amount"
        withInput
        max={900000}
        marks={[ 0, 300000, 600000, 900000 ]}
        step={10}
        value={state.amount}
        onChange={onInput}
      />

      <RSlider
        label="Term (years)"
        name="term"
        withInput
        max={35}
        marks={[ 0, 12, 24, 35 ]}
        value={state.term}
        onChange={onInput}
      />

      <RSlider
        label="Rate"
        name="rate"
        withInput
        marks={[ 0, 25, 50, 75 ]}
        max={75}
        value={state.rate}
        onChange={onInput}
      />

      <RDatePicker
        blue
        value={state.date}
        label="Date"
        name="date"
        onChange={onInput}
      />

      <CalculatorResult
        monthly={monthly}
        tableState={tableState}
      />
    </Form>
  );
};

export default CalculatorForm;