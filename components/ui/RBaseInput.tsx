import { useEffect, useState, useRef } from "react";
import type { FocusEvent } from "react";

import { inputFloat } from "@/assets/ts/textUtils";

type Props = {
  name?: string;
  placeholder?: string,
  numbers?: boolean;
  max?: number,
  disabled?: boolean;
  value: string | number;
  autoComplete?: string;
  className?: string;
  id?: string;
  lastSymbol?: string;
  onChange?: Function;
  onChangeLazyValue?: Function;
  onInput?: Function;
};

const RBaseInput = (props: Props) => {
  const {
    value,
    name,
    placeholder,
    numbers,
    max = 999999999999,
    autoComplete,
    onChange,
    onChangeLazyValue,
    onInput,
    id,
    disabled,
    lastSymbol,
    className,
  } = props;

  const [
    isFocus,
    setIsFocus,
  ] = useState<boolean>(false);

  const [
    lazyValue,
    setLazyValue,
  ] = useState<string | number>('');

  const getReturnValue = (value: string | number) => {
    if (numbers && lazyValue !== undefined) {
      return !value ? 1 : Number(String(value).replace(/[^0-9.,]/g, ''));
    }

    return value;
  };

  const inputEl = useRef<HTMLInputElement | null>(null);

  const onFocusInput = (ev: FocusEvent<HTMLInputElement>) => {
    // if (!inputEl?.current) {
    //   return;
    // }
    // setIsFocus(true);
    // console.log(inputEl);
    // const currentPos = inputEl.current.selectionStart;
    // // const currentPos = inputEl.current.selectionEnd;

    // console.log(`${currentPos} === ${inputEl.current.value.length - 1}`);

    // if (currentPos === inputEl.current.value.length - 1) {
    //   return;
    // }

    // // setTimeout(() => {
    // ev.target.setSelectionRange(2, 2);
    // //   ev.target.focus();
    // // }, 1);
  };

  const onBlurInput = (ev:  FocusEvent<HTMLInputElement>) => {
    // setIsFocus(false);
    // console.log(ev);
    // ev.target.selectionStart = 2;
    // ev.target.selectionEnd = 2;
    // ev.target.setSelectionRange(2, 2);
    // ev.target.focus();
  };

  const onInputInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let value = ev.target.value;

    const newValue = numbers ? inputFloat(value, max) : value;

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
    console.log('123');
    if (value !== undefined) {
      let newValue = inputFloat(value, max);
      // newValue = isFocus || !lastSymbol ? newValue : `${newValue}${lastSymbol}`;
      if (newValue !== lazyValue) {
        console.log('change');
        setLazyValue(numbers ? newValue : value);
      }
    }
  }, [ value, setLazyValue, numbers, max, isFocus, lastSymbol, lazyValue ]);

  useEffect(() => {
    if (onChangeLazyValue) {
      onChangeLazyValue(lazyValue, name);
    }
  }, [ lazyValue, name, onChangeLazyValue ]);

  return (
    <input
      ref={inputEl}
      type="text"
      className={className}
      id={id || `input-${name}`}
      placeholder={placeholder}
      name={name}
      value={lazyValue || (numbers ? inputFloat(value, max) : value)}
      autoComplete={autoComplete}
      disabled={disabled}
      onFocus={onFocusInput}
      onBlur={onBlurInput}
      onInput={onInputInput}
      onChange={onChangeInput}
    />
  );
};

export default RBaseInput;
