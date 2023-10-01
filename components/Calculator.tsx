import styled from 'styled-components';
import { media } from '@/styles/mixins';

import bgImage from '@/assets/images/calculator-image.png';

import type { CalculateTableData, LoanData } from '@/types/Calculator';

import CalculatorAsideComponent from './Calculator/CalculatorAside';
import CalculatorForm from './Calculator/CalculatorForm';
import { useRef } from 'react';
import CalculatorShadow from './Calculator/CalculatorShadow';


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

  ${media.tablet} {
    width: 100%;
  }
`;

const CalculatorAside = styled(CalculatorAsideComponent)`
  ${media.pc} {
    margin-bottom: 20px;
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

  ${media.pc} {
    flex-direction: column;
  }

  ${media.mobile} {
    padding: 16px;
  }

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

    ${media.pc} {
      transform: scale(-1);
      background-size: 200px auto;
    }

    ${media.mobile} {
      content: none;
    }
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

  const onChangeValues = (
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

  const wrapperEl = useRef<HTMLDivElement | null>(null);

  return (
    <CalculatorBlock
      ref={wrapperEl}
      className={`container ${className}`}
    >
      <Wrapper>
        <CalculatorShadow
          element={wrapperEl}
        />

        <CalculatorAside/>

        <CalculatorForm
          state={state}
          monthly={monthly}
          tableState={tableState}
          onChange={onChangeValues}
        />
      </Wrapper>
    </CalculatorBlock>
  );
}
