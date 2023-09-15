import styled from 'styled-components';
import { useState, useEffect } from 'react';

import { inputFloat } from '@/assets/ts/textUtils';
import RLabel from './RLabel';

type Props = {
  placeholder?: string,
  name?: string,
  label?: string,
  numbers?: boolean,
  disabled?: boolean,
  value: string | number,
  autoComplete?: string,
  className?: string,
  blue?: boolean,
  onChange?: Function,
  onInput?: Function,
  id?: string,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input<{ $blue?: boolean }>`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.light1};
  background: ${(props) => props.$blue
    ? props.theme.colors.accent4
    : props.theme.colors.dark3};
  outline: none;
  border: none;
  padding: 12px;
  border-radius: 4px;

  &[disabled] {
    background: #121212;
    color: rgba(221, 221, 221, .75);
  }
`;

const RInput = (props: Props) => {
  const {
    placeholder,
    name,
    label,
    numbers,
    value,
    autoComplete,
    className,
    onChange,
    onInput,
    id,
    disabled,
    blue = false,
  } = props;

  const [
    lazyValue,
    setLazyValue,
  ] = useState<string | number>('');

  const getReturnValue = (value: string | number) => {
    if (numbers && lazyValue !== undefined) {
      return Number(String(value).replace(/[^0-9.,]/g, ''));
    }

    return value;
  };

  const onInputInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let value = ev.target.value;

    const newValue = numbers ? inputFloat(value) : value;

    if (lazyValue === newValue) {
      return;
    }

    setLazyValue(newValue);

    const returnValue = getReturnValue(newValue);
    if (onInput) {
      onInput(returnValue, name, ev);
    }
  };

  const onChangeInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const returnValue = getReturnValue(lazyValue);
    if (onChange) {
      onChange(returnValue, name, ev);
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      setLazyValue(numbers ? inputFloat(value) : value); 
    }
  }, [ value, setLazyValue, numbers ]);

  return (
    <Wrapper
      className={className}
    >
      {
        label ? 
          <RLabel htmlFor={id || `input-${name}`}>
            {label}
          </RLabel>
          : null
      }
      <Input
        $blue={blue}
        type="text"
        id={id || `input-${name}`}
        placeholder={placeholder}
        name={name}
        value={lazyValue || (numbers ? inputFloat(value) : value)}
        onChange={onChangeInput}
        onInput={onInputInput}
        autoComplete={autoComplete}
        disabled={disabled}
      />
    </Wrapper>
  );
};

export default RInput;