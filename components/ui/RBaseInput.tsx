import { useNumericFormat, NumberFormatBase } from "react-number-format";

import type { OnValueChange, NumberFormatValues } from 'react-number-format';

type Props = {
  name?: string;
  placeholder?: string,
  numbers?: boolean;
  suffix?: string,
  max?: number,
  disabled?: boolean;
  value: string | number;
  autoComplete?: string;
  className?: string;
  id?: string;
  lastSymbol?: string;
  onChange?: (value: string | number, name: string) => void,
  onError?: (error: string | null) => void,
  onChangeLazyValue?: Function;
  onInput?: Function;
};

const RBaseInput = (props: Props) => {
  const {
    value,
    name = 'input',
    placeholder,
    max = 999999999,
    autoComplete,
    id,
    disabled,
    suffix,
    className,
    onChangeLazyValue,
    onError,
    onChange,
  } = props;

  const onValueChange: OnValueChange = (values) => {
    let { floatValue, formattedValue } = values;

    if (!floatValue) {
      return;
    }

    if (onChange) {
      onChange(floatValue, name);
    }

    if (onChangeLazyValue) {
      onChangeLazyValue(formattedValue, name);
    }
  };

  const isAllowed = (values: NumberFormatValues) => {
    const { floatValue } = values;
    const isAllow = Boolean(max !== undefined && Number(floatValue) <= max && Number(floatValue) >= 1);
    console.log(`${Number(floatValue)} <= ${max} && ${Number(floatValue)} >= 1`);

    if (!isAllow && onError) {
      onError(`The max value is ${max}`);
    } else if (onError) {
      onError(null);
    }
    return isAllow;
  };

  const { format, ...numberFormatBaseProps } = useNumericFormat({
    isAllowed,
    suffix: suffix,
    thousandSeparator: ' ',
    allowLeadingZeros: true,
    allowNegative: false,
    decimalScale: 2,
    onValueChange: onValueChange,
  });

  const _format = (numStr: string) => {
    if (!format) {
      return numStr;
    }

    // TODO: check how to move corret
    // let newValue = Number(numStr) >= max ? String(max) : numStr;
    // newValue = Number(numStr) < 1 ? String(1) : numStr;
    const formattedValue = format(numStr);
    return formattedValue;
  };

  return (
    <NumberFormatBase
      {...numberFormatBaseProps}
      name={name}
      value={value}
      className={className}
      id={id || `input-${name}`}
      placeholder={placeholder}
      autoComplete={autoComplete}
      disabled={disabled}
      format={_format}
    />
  );
};

export default RBaseInput;
