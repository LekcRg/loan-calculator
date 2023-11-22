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
  outline: none;
  background: ${({ theme }) => theme.colors.dark3};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.light1};
  padding: 11px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px ${({ theme }) => theme.colors.dark3} solid;
  transition: border-color .3s ease;

  &:hover {
    border: 1px ${({ theme }) => theme.colors.dark4} solid;
  }

  &:focus {
    border: 1px ${({ theme }) => theme.colors.accent} solid;
  }
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