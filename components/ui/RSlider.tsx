import styled from 'styled-components';

import ReactSlider from 'react-slider';
import type { ReactSliderProps } from 'react-slider';

import { splitThousands } from '@/assets/ts/textUtils';

import RInputDashed from './RInputDashed';

type Props = {
  value: number,
  name: string,
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
    onChange,
    inputIgnoreMax,
  } = props;

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
      onChange(value, name);
    }
  };

  return (
    <Wrapper>
      { withInput && (
        <RInputDashed
          numbers
          max={inputIgnoreMax ? undefined : max}
          label={label}
          name={name}
          value={value}
          onInput={onChange}
        />
      )}

      <Slider
        value={value}
        className={className}
        min={min}
        max={max}
        marks={marks}
        renderTrack={Track}
        renderThumb={Thumb}
        renderMark={Mark}
        onChange={onChangeSlider}
        step={step}
      />
    </Wrapper>
  );
};

export default RSlider;