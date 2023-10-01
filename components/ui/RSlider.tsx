import type { ReactSliderProps } from 'react-slider';

import styled from 'styled-components';
import { useState, useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import ReactSlider from 'react-slider';

import { splitThousands } from '@/assets/ts/textUtils';

import RInputDashed from './RInputDashed';

type Props = {
  value: number,
  name: string,
  suffix?: string,
  label?: string,
  min?: ReactSliderProps['min'],
  max?: ReactSliderProps['max'],
  step?: ReactSliderProps['step'],
  marks?: number[],
  className?: string,
  withInput?: Boolean,
  inputIgnoreMax?: Boolean,
  onChange?: ((value: string | number, name: string) => void),
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-bottom: 18px;
`;

const Error = styled.div`
  position: absolute;
  right: 0;
  bottom: 40px;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.accent2};
`;

const Slider = styled(ReactSlider)`
  width: 100%;
  height: 8px;
  margin-top: 10px;
  cursor: pointer;
`;

const StyledTrack = styled.div`
  height: 2px;
  background: rgba(249, 249, 249, .4);
  border-radius: 2px;
  top: 0;
  bottom: 0;
  margin: auto;

  &:first-child {
    border-radius: 2px 0 0 2px;
  }
`;

const Track: ReactSliderProps['renderTrack'] = (props, state) => (
  <StyledTrack {...props} key={props.key}/>
);

const StyledThumb = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent2};
  cursor: pointer;
  outline: none;
  transition: background .3s ease;
`;

const Thumb: ReactSliderProps['renderThumb'] = (props, state) => (
  <StyledThumb {...props} key={state.index} tabIndex={-1}/>
);


const StyledMark = styled.div<{ $first?: boolean, $last?: boolean }>`
  top: calc(100% + 6px);
  color: ${({ theme }) => theme.colors.light1};
  font-family: Inter;
  font-size: 8px;
  font-style: normal;
  letter-spacing: -0.12px;
  opacity: .5;
  white-space: nowrap;

  ${props => props.$last && `
    transform: translateX(7px) translateX(-100%);
  `}
`;

const RSlider = (props: Props) => {
  const {
    value,
    name,
    min = 0,
    max,
    marks,
    step,
    label,
    className,
    withInput,
    suffix,
    onChange,
    inputIgnoreMax,
  } = props;

  const [ error, setError ] = useState<string | null>(null);
  const startErrTr = useRef<HTMLDivElement | null>(null);
  const endErrTr = useRef<HTMLDivElement | null>(null);
  const nodeRef = error ? startErrTr : endErrTr;

  const Mark: ReactSliderProps['renderMark'] = (props) => marks?.length ? (
    <StyledMark
      {...props}
      key={props.key}
      $first={props.key === marks[0]}
      $last={props.key === marks[marks.length - 1]}
    >
      {props.key && !isNaN(Number(props.key)) && splitThousands(props.key)}
    </StyledMark>
  ) : null;

  const onChangeSlider: ReactSliderProps['onChange'] = (value, index) => {
    if (onChange) {
      setError(null);
      onChange(value, name);
    }
  };

  return (
    <Wrapper className={className}>
      { withInput && (
        <RInputDashed
          numbers
          max={inputIgnoreMax ? undefined : max}
          label={label}
          name={name}
          value={value}
          suffix={suffix}
          onChange={onChange}
          onError={setError}
        />
      )}

      <Slider
        value={value}
        min={min}
        max={max}
        marks={marks}
        renderTrack={Track}
        renderThumb={Thumb}
        renderMark={Mark}
        onChange={onChangeSlider}
        step={step}
      />

      <SwitchTransition>
        <CSSTransition
          key={error}
          nodeRef={nodeRef}
          classNames="fade"
          addEndListener={(done) => {
            if (nodeRef?.current) {
              nodeRef.current.addEventListener("transitionend", done, false);
            }
          }}
        >
          <Error ref={nodeRef}>{error}</Error>
        </CSSTransition>
      </SwitchTransition>
    </Wrapper>
  );
};

export default RSlider;