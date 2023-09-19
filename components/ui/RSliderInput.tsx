import styled from 'styled-components';
import { useState } from 'react';
import type { ChangeEvent, EventHandler } from 'react';

import RSlider from './RSlider';
import RHugInput from './RHugInput';
// import RSlider from './RSlider';

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: auto;
  outline: none;
  background: transparent;
  border: none;
  font-size: 16px;
  padding: 0;
  padding-bottom: 1px;
  margin: 0;
  line-height: 1;
  width: 100%;
`;

const Dashed = styled.div`
  font-size: 16px;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  pointer-events: none;
  line-height: 1;
  border-bottom: 1px dashed #fff;
  color: rgba(255,255,255, 0);
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const Test = styled.div`
  width: auto;
  border-bottom: 1px dashed #fff;
  align-self: flex-start;
  outline: none;
`;

const Slider = styled(RSlider)`
  width: 100%;
`;

const RSliderInput = () => {
  const [ value, setValue ] = useState(250000);
  const onInput = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(ev.target.value));
    console.log(ev);
  };

  return (
    <Wrapper>
      <InputWrapper>
        <Input
          type="text"
          value={value}
          onInput={onInput}
        />
        <Dashed>{value}</Dashed>
      </InputWrapper>

      <Slider/>
    </Wrapper>
  );
};

export default RSliderInput;