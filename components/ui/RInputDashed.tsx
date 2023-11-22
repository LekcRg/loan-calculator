import styled from 'styled-components';
import { useState } from 'react';
import { inputFloat } from "@/assets/ts/textUtils";

import RLabel from '@/components/ui/RLabel';
import RBaseInput from '@/components/ui/RBaseInput';

type Props = {
  value: number;
  name: string;
  suffix?: string,
  label?: string;
  numbers?: boolean;
  max?: number;
  onError?: (error: string | null) => void,
  onInput?: ((value: string | number, name: string) => void);
  onChange?: ((value: string | number, name: string) => void);
}

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled(RBaseInput)`
  width: auto;
  outline: none;
  background: transparent;
  border: none;
  font-size: 16px;
  padding: 0;
  padding-bottom: 1px;
  margin: 0;
  line-height: 1;
  width: 100%;

  &:disabled {
    opacity: .7;
    color: inherit;
  }
`;

const Dashed = styled.div`
  font-size: 16px;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  pointer-events: none;
  line-height: 1;
  border-bottom: 1px dashed rgba(249, 249, 249, 0.20);
  color: rgba(255,255,255, 0);
  user-select: none;
`;

const RInputDashed = (props: Props) => {
  const {
    value,
    name,
    label,
    suffix,
    max = 999999999,
    numbers = false,
    onChange,
    onInput,
    onError,
  } = props;

  const [ lazyValue, setLazyValue ] = useState(`${numbers ? inputFloat(value, max) : value}${suffix || ''}`);

  return (
    <InputWrapper>
      { label &&
        <RLabel
          small
          htmlFor={`input-${name}`}
        >
          { label }
        </RLabel>
      }
      <Input
        max={max}
        name={name}
        value={value}
        numbers={numbers}
        suffix={suffix}
        onInput={onInput}
        onChange={onChange}
        onError={onError}
        onChangeLazyValue={setLazyValue}
      />

      <Dashed>{lazyValue}</Dashed>
    </InputWrapper>
  );
};

export default RInputDashed;