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
  outline: none;
  border: none;
  padding: 12px;
  border-radius: 4px;
`;

const RInput = (props: {
    placeholder?: string,
    name?: string,
    label?: string,
    numbers?: boolean,
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
      onInput(returnValue, ev);
    }
  };

  const onChangeInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const returnValue = getReturnValue(lazyValue);
    if (onChange) {
      onChange(returnValue, ev);
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      setLazyValue(prettyNumber(value));
    }
  }, [ value ]);

  useEffect(() => {
    if (value !== undefined) {
      setLazyValue(prettyNumber(value));
    }
  }, [ value ]);

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
      />
    </Wrapper>
  );
};

export default RInput;