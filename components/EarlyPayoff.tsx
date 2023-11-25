import type { EarlyPayoff } from '@/types/Calculator';

import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

import RInput from '@/components/ui/RInput';
import RDatePicker from '@/components/ui/RDatePicker';
import RButton from '@/components/ui/RButton';
import RSelect from '@/components/ui/RSelect';
import { media } from '@/styles/mixins';

type Props = {
  item: EarlyPayoff;
  index: number;
  loanDate: string;
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

  ${media.pc} {
    flex-direction: column;
    gap: 18px;
  }

  ${media.mobile} {
    padding: 16px;
  }
`;

const Index = styled.div`
  font-size: 64px;
  opacity: .1;
  width: 120px;
  margin-right: 64px;
  align-self: flex-start;

  span {
    display: none;

    ${media.pc} {
      display: inline;
    }
  }

  ${media.pc} {
    font-size: 24px;
    width: 100%;
    opacity: 1;
  }
`;

const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  gap: 16px;
  margin-right: 32px;

  ${media.pc} {
    flex-direction: column;
    flex-wrap: nowrap;
    margin-right: 0;
  }
`;

const FormItem = styled.div<{$flex?: boolean}>`
  width: calc(50% - 8px);

  ${({ $flex }) => $flex && css`
      display: flex;
      gap: 8px;

      ${media.mobile} {
        flex-direction: column;
        gap: 16px;
      }
  `}

  ${media.pc} {
    width: 100%;
  }
`;

const Input = styled(RInput)`
  /* margin-bottom: 12px; */
`;

const DatePicker = styled(RDatePicker)`
  flex: 1;
`;

const Button = styled(RButton)`
  /* margin-top: 18px; */
  align-self: flex-end;
`;

const EarlyPayoff = (props: Props) => {
  const {
    item,
    index,
    loanDate,
    onChangeValues,
    onClickRemove,
  } = props;

  const paymentDay = useMemo(() => Number(loanDate.split('-')[2]), [ loanDate ]);

  return (
    <Payoff
      key={item.id}
    >
      <Index>
        <span>Payoff </span>{ index + 1 }
      </Index>

      <Form>
        <FormItem $flex>
          <DatePicker
            value={item.date}
            paymentDay={paymentDay}
            name={`payoff-date-${index}`}
            type="month"
            minDate={loanDate}
            minDateErrorText="Value exceeds start loan"
            label={item.frequency === 'month' ? 'Start date' : 'Date'}
            onChange={onChangeValues}
          />
          {
            item.frequency === 'month' && 
              <DatePicker
                value={item.dateEnd}
                paymentDay={paymentDay}
                name={`payoff-dateEnd-${index}`}
                type="month"
                label="End date"
                clearable
                placeholder="Till loan ends"
                minDate={item.date}
                minDateErrorText="Value exceeds start payoff"
                onChange={onChangeValues}
              />
          }
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
      >

      </Button>
    </Payoff>
  );
};

export default EarlyPayoff;