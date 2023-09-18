import styled from 'styled-components';

import bgImage from '@/assets/images/calculator-image.png';

import type { CalculateTableData, LoanData } from '@/types/Calculator';

import CalculatorAside from './Calculator/CalculatorAside';
import CalculatorForm from './Calculator/CalculatorForm';

type Props = {
  onChange: Function;
  state: LoanData;
  tableState: CalculateTableData,
  monthly: number | undefined | null;
  className?: string;
}

const CalculatorBlock = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  padding: 32px;
  background-color: ${({ theme }) => theme.colors.accent3};
  background-image: radial-gradient(
      48% 81% at 9% 77%,
      rgba(255, 255, 255, .1) 0%,
      rgba(255, 255, 255, 0) 100%);
  border-radius: 8px;
  box-shadow: 0 100px 150px -100px rgba(103, 173, 165, .66);
  transition: box-shadow .3s ease;

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${bgImage.src});
    background-repeat: no-repeat;
    background-size: 430px auto;
    background-position: bottom left;
    mix-blend-mode: screen;
    pointer-events: none;
  }

  &:hover {
    box-shadow: 0 110px 150px -100px rgba(103, 173, 165, .66);
  }
`;

export default function Calculator(props: Props) {
  const {
    onChange,
    state,
    monthly,
    tableState,
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
        <CalculatorAside/>

        <CalculatorForm
          state={state}
          monthly={monthly}
          tableState={tableState}
          onInput={onInput}
        />
      </Wrapper>
    </CalculatorBlock>
  );
}
