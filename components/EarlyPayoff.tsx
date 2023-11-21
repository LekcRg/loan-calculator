import type { EarlyPayoff } from '@/types/Calculator';

import React from 'react';
import styled from 'styled-components';

import RInput from '@/components/ui/RInput';
import RDatePicker from '@/components/ui/RDatePicker';
import RButton from '@/components/ui/RButton';
import RSelect from '@/components/ui/RSelect';

type Props = {
  item: EarlyPayoff;
  index: number;
  onChangeValues: (value: Number | string, name: String) => void;
  onClickRemove: (index: number) => void;
}

const Payoff = styled.li`
  display: flex;
  border-radius: 8px;
  padding: 32px;
  list-style-type: none;
  background: ${({ theme }) => theme.colors.dark2};

  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const Index = styled.div`
  font-size: 64px;
  opacity: .1;
  width: 120px;
  margin-right: 64px;
  align-self: flex-start;
`;

const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  gap: 16px;
  margin-right: 32px;
`;

const FormItem = styled.div`
  width: calc(50% - 8px);
`;

const Input = styled(RInput)`
  /* margin-bottom: 12px; */
`;

const DatePicker = styled(RDatePicker)`
  /* margin-bottom: 12px; */
`;

const Button = styled(RButton)`
  /* margin-top: 18px; */
  align-self: flex-end;
`;

const EarlyPayoff = (props: Props) => {
  const {
    item,
    index,
    onChangeValues,
    onClickRemove,
  } = props;
  
  return (
    <Payoff
      key={item.id}
    >
      <Index>{ index + 1 }</Index>

      <Form>
        <FormItem>
          <DatePicker
            value={item.date}
            name={`payoff-date-${index}`}
            type="month"
            label="Date"
            onChange={onChangeValues}
          />
        </FormItem>

        <FormItem>
          <Input
            numbers
            value={item.amount}
            label="Amount"
            placeholder="Amount"
            name={`payoff-amount-${index}`}
            autoComplete="off"
            onChange={onChangeValues}
          />
        </FormItem>

        <FormItem>
          <RSelect
            options={[
              {
                label: 'One-time',
                value: 'one-time',
              },
              {
                label: 'Every month',
                value: 'month',
              },
            ]}
            label="Frequency"
            name={`payoff-frequency-${index}`}
            value={item.frequency}
            onChange={onChangeValues}
          />
        </FormItem>

        <FormItem>
          <RSelect
            options={[
              {
                label: 'Reduce loan term',
                value: 'term',
              },
              {
                label: 'Lower monthly payments',
                value: 'payment',
              },
            ]}
            label="Type early payoff"
            name={`payoff-type-${index}`}
            value={item.type}
            onChange={onChangeValues}
          />
        </FormItem>
      </Form>

      <Button
        icon="delete"
        type="red"
        onClick={() => onClickRemove(index)}
      />
    </Payoff>
  );
};

export default EarlyPayoff;