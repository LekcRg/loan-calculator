import styled from 'styled-components';

import type { ChangeEvent } from 'react';

import RLabel from './RLabel';

type Props = {
  label?: string,
  name: string,
  value: string,
  options: {
    label: string,
    value: string,
  }[],
  onChange?: Function,
}

const Wrapper = styled.div`
  position: relative;
`;

const Select = styled.select`
  display: block;
  margin-top: 12px;
  width: 100%;
  border: none;
  outline: none;
  background: ${({ theme }) => theme.colors.dark3};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.light1};;
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
`;

const RSelect = (props: Props) => {
  const {
    label,
    name,
    value,
    options,
    onChange,
  } = props;

  const onChangeSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(ev.target.value, name);
    }
  };

  return (
    <Wrapper>
      {label ?
        <RLabel>
          {label}
        </RLabel>
        : ''
      }

      <Select
        value={value}
        onChange={onChangeSelect}
      >
        {
          options.map((option, i) => (
            <option
              key={i}
              value={option.value}
            >
              {option.label}
            </option>
          ))
        }
      </Select>
    </Wrapper>
  );
};

export default RSelect;