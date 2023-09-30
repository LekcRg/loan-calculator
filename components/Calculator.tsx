import styled from 'styled-components';
import { media } from '@/styles/mixnis';

import bgImage from '@/assets/images/calculator-image.png';

import type { CalculateTableData, LoanData } from '@/types/Calculator';

import CalculatorAsideComponent from './Calculator/CalculatorAside';
import CalculatorForm from './Calculator/CalculatorForm';
import { useEffect, useRef, useState } from 'react';


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

const Shadow = styled.div<{$transormTransition: boolean}>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: calc(100% - 110px);
  height: calc(100% - 110px);
  box-shadow: 0 0 150px 5px rgba(103, 173, 165, .66);
  z-index: -1;
  will-change: transform;
  transition: box-shadow .3s ease${({ $transormTransition }) => $transormTransition ? ', transform .2s ease' : ''};
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

  const [ shadowPos, setShadowPos ] = useState<{x: number, y: number} | null>(null);
  const wrapperEl = useRef<HTMLDivElement | null>(null);

  const shadowStyles = {
    transform: shadowPos ? `translate(${shadowPos?.x || 0}px, ${shadowPos?.y || 0}px)` : '',
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mouseMove = (ev: MouseEvent) => {
      if (!wrapperEl?.current) {
        return;
      }
      const wrapperSizes = wrapperEl.current.getBoundingClientRect();
  
      const yOffset = ev.clientY - wrapperSizes.y;
      const xOffset = ev.clientX - wrapperSizes.x;
  
      let y = Math.round((yOffset / wrapperSizes.height - .5) * 10000) / 100;
      y = y > 50 ? 50 : y;
      y = y < -50 ? -50 : y;
      let x = Math.round((xOffset / wrapperSizes.width - .5) * 10000) / 100;
      x = x > 50 ? 50 : x;
      x = x < -50 ? -50 : x;
      setShadowPos({
        x: x,
        y: y,
      });
    };

    document.addEventListener('mousemove', mouseMove);

    return () => {
      document.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  return (
    <CalculatorBlock
      ref={wrapperEl}
      className={`container ${className}`}
    >
      <Wrapper>
        <Shadow
          style={shadowStyles}
          $transormTransition={shadowPos === null}
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
