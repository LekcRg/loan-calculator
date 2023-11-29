import styled from 'styled-components';

import type { DropdownIndicatorProps } from 'react-select';
import Select, { ActionMeta } from "react-select";

import RLabel from './RLabel';

type Props = {
  label?: string,
  name: string,
  value: {
    label: string,
    value: string,
  },
  options: {
    label: string,
    value: string,
  }[],
  onChange?: Function,
}

const Wrapper = styled.div`
  position: relative;
`;

const ArrowWrapper = styled.div`
  width: 18px;
  height: 18px;
  transition: transform .3s ease;
`;

const ArrowStyled = styled.svg`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.light3};
  transform: rotate(90deg);
`;

const StyledSelect = styled(Select)`
  .Select {
    &__control {
      display: flex;
      margin-top: 12px;
      width: 100%;
      outline: none;
      background: ${({ theme }) => theme.colors.dark3};
      font-size: 18px;
      color: ${({ theme }) => theme.colors.light1};
      padding: 15px;
      border-radius: 4px;
      cursor: pointer;
      border: 1px ${({ theme }) => theme.colors.dark3} solid;
      transition: border-color .3s ease;

      &:not(&--is-focused):hover {
        border-color: ${({ theme }) => theme.colors.dark4};
      }

      &--is-focused {
        border-color: ${({ theme }) => theme.colors.accent};
      }

      &--menu-is-open ${ArrowWrapper} {
        transform: rotate(180deg);
      }
    }

    &__menu {
      top: calc(100% + 8px);
      background-color: ${({ theme }) => theme.colors.dark3};
      border: 1px solid ${({ theme }) => theme.colors.dark4};
      box-shadow: 0px 4px 10px 2px rgba(34, 34, 34, 0.40);
      border-radius: 4px;
      overflow: hidden;
    }

    &__option {
      padding: 11px;
      cursor: pointer;

      &:not(:last-child) {
        border-bottom: 1px solid ${({ theme }) => theme.colors.dark4};
      }

      &--is-focused,
      &:hover {
        background-color: ${({ theme }) => theme.colors.dark4};
      }

      &--is-selected {
        color: ${({ theme }) => theme.colors.accent}
      }
    }
  }
`;

const Arrow = (props: DropdownIndicatorProps) => {
  const {
    innerProps,
  } = props;

  return (
    <ArrowWrapper
      {...innerProps}
    >
      <ArrowStyled>
        <use xlinkHref="#arr-right"></use>
      </ArrowStyled>
    </ArrowWrapper>
  );
};

const RSelect = (props: Props) => {
  const {
    label,
    name,
    value,
    options,
    onChange,
  } = props;

  const onChangeSelect = (newValue: unknown, actionMeta: ActionMeta<unknown>) => {
    if (onChange) {
      onChange(newValue, name);
    }
    console.log(newValue);
    console.log(actionMeta);
  };

  return (
    <Wrapper>
      {label ?
        <RLabel>
          {label}
        </RLabel>
        : ''
      }

      <StyledSelect
        unstyled
        components={{
          DropdownIndicator: Arrow,
        }}
        instanceId={`${name}-id`}
        name={name}
        classNamePrefix="Select"
        options={options}
        value={value}
        onChange={onChangeSelect}
        isSearchable={false}
      />
    </Wrapper>
  );
};

export default RSelect;