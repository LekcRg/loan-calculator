import styled from 'styled-components';

import type { CalculateTableData, LoanData } from '@/types/Calculator';

import CalculatorResult from './CalculatorResult';
import RDatePicker from '@/components/ui/RDatePicker';
// import RInput from '@/components/ui/RInput';
import RSlider from '@/components/ui/RSlider';
import { media } from '@/styles/mixnis';

type Props = {
  state: LoanData;
  monthly: number | undefined | null;
  tableState: CalculateTableData;
  onChange: (value: string | number, name: string) => void;
}

const Form = styled.form`
  flex-direction: column;
  flex: 1;
`;

// const Input = styled(RInput)`
//   width: 100%;

//   &:not(:last-child) {
//     margin-bottom: 12px;
//   }
// `;

const Slider = styled(RSlider)`
  margin-bottom: 20px;


  ${media.mobile} {
    margin-bottom: 12px;
  }
`;

const CalculatorForm = (props: Props) => {
  const {
    state,
    monthly,
    tableState,
    onChange,
  } = props;

  return (
    <Form
      onSubmit={ev => ev.preventDefault()}
    >
      <Slider
        label="Loan amount"
        name="amount"
        max={900000}
        marks={[ 0, 300000, 600000, 900000 ]}
        step={10}
        suffix=" €"
        withInput
        inputIgnoreMax
        value={state.amount}
        onChange={onChange}
      />

      <Slider
        label="Term (years)"
        name="term"
        withInput
        suffix=" years"
        max={35}
        marks={[ 0, 12, 24, 35 ]}
        value={state.term}
        onChange={onChange}
      />

      <Slider
        label="Rate"
        name="rate"
        withInput
        suffix="%"
        marks={[ 0, 25, 50, 75 ]}
        max={75}
        value={state.rate}
        onChange={onChange}
      />

      <RDatePicker
        blue
        value={state.date}
        label="Date"
        name="date"
        onChange={onChange}
      />

      <CalculatorResult
        monthly={monthly}
        tableState={tableState}
      />
    </Form>
  );
};

export default CalculatorForm;