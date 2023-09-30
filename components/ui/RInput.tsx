import styled from 'styled-components';

import RLabel from '@/components/ui/RLabel';
import RBaseInput from '@/components/ui/RBaseInput';

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
  onChange?: (value: string | number, name: string) => void,
  onInput?: Function,
  id?: string,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled(RBaseInput)<{ $blue?: boolean }>`
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
        id={id || `input-${name}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onInput={onInput}
        autoComplete={autoComplete}
        disabled={disabled}
        numbers={numbers}
      />
    </Wrapper>
  );
};

export default RInput;