import styled from 'styled-components';
import { useState, useEffect } from 'react';

import { prettyNumber } from '@/assets/ts/textUtils';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  color: #ddd;
  margin-bottom: 5px;
`;

const Input = styled.input`
  font-size: 18px;
  color: #ddd;
  background: #3b3b3b;
  outline: none;
  border: none;
  padding: 12px;
  border-radius: 4px;

  &[disabled] {
    background: #121212;
    color: rgba(221, 221, 221, .75);
  }
`;

const RInput = (props: {
    placeholder?: string,
    name?: string,
    label?: string,
    numbers?: boolean,
    disabled?: boolean,
    value?: string | number,
    autoComplete?: string,
    className?: string,
    onChange?: Function,
    onInput?: Function,
    id?: string,
}) => {
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
  } = props;

  const [
    lazyValue,
    setLazyValue,
  ] = useState<string | number>('');

  const getReturnValue = (value: string | number) => {
    if (numbers && lazyValue !== undefined) {
      return Number(String(value).replace(/[^0-9.,]/g, ''));
    } else {
      return value;
    }
  };

  const onInputInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let value = ev.target.value;

    if (numbers) {
      setLazyValue(prettyNumber(value));
    } else {
      setLazyValue(value);
    }

    const returnValue = getReturnValue(value);
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
      setLazyValue(numbers ? prettyNumber(value) : value); 
    }
  }, [ value, setLazyValue, numbers ]);

  return (
    <Wrapper
      className={className}
    >
      {
        label ? 
          <Label htmlFor={id || `input-${name}`}>
            {label}
          </Label>
          : null
      }
      <Input 
        type="text"
        id={id || `input-${name}`}
        placeholder={placeholder}
        name={name}
        value={lazyValue}
        onChange={onChangeInput}
        onInput={onInputInput}
        autoComplete={autoComplete}
        disabled={disabled}
      />
    </Wrapper>
  );
};

export default RInput;