import styled from 'styled-components';

const FakeInput = styled.span`
  width: auto;
  border-bottom: 1px dashed #fff;
  align-self: flex-start;
  outline: none;
`;

const RHugInput = () => {

  // const onFocus = (ev) => {
  //   console.log(ev);
  // };

  return (
    <>
      <FakeInput
        role="textbox"
        contentEditable
        suppressContentEditableWarning
        // onFocus={onFocus}
      >250 000</FakeInput>
    </>
  );
};

export default RHugInput;