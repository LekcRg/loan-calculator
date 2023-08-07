import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { prettyNumber } from '@/assets/ts/textUtils';

import RInput from '@/components/ui/RInput';

const Calculator = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled(RInput)`
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const Result = styled.div`
  margin-top: 12px;
  font-size: 20px;
  text-align: center;

  span {
    color: #0f0;
  }
`;


export default function Home() {
  const [ price, setPrice ] = useState(2000000);
  const [ years, setYears ] = useState(10);
  const [ percent, setPercent ] = useState(12);
  const [ monthly, setMonthly ] = useState(0);

  const onInputPrice = (value: string) => {
    setPrice(Number(value));
  };
  const onInputYears = (value: string) => {
    setYears(Number(value));
  };
  const onInputPercent = (value: string) => {
    setPercent(Number(value));
  };

  useEffect(() => {
    if (!price || !years || !percent) {
      return;
    }

    const monthPercent = (percent / 12) / 100;
    const months = years * 12;

    const monthlyPayment =
      (price * monthPercent * ((1 + monthPercent) ** months)) /
      (((1 + monthPercent) ** months) - 1);


    if (monthlyPayment && !isNaN(monthlyPayment)) {
      setMonthly(monthlyPayment);
    }
  }, [ price, monthly, years, percent ]);

  return (
    <Calculator>
      <Wrapper>
        <Input
          numbers
          value={price}
          label="Price"
          placeholder="Price"
          name="price"
          autoComplete="off"
          onInput={onInputPrice}
        />

        <Input
          numbers
          value={years}
          label="Years"
          placeholder="Years"
          name="years"
          autoComplete="off"
          onInput={onInputYears}
        />

        <Input
          numbers
          value={percent}
          label="Percent"
          placeholder="Percent"
          name="percent"
          autoComplete="off"
          onInput={onInputPercent}
        />
      </Wrapper>

      <Result>
          Monthly payments: <span>{prettyNumber(Math.floor(monthly * 100) / 100)}</span>
      </Result>
    </Calculator>
  );
}
