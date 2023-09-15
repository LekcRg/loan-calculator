import type { ReactNode, MouseEvent } from 'react';

import styled from 'styled-components';

type Props = {
    children: ReactNode,
    htmlFor?: string,
    onClick?: Function,
}

const Label = styled.label`
  display: block;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.light1};
  margin-bottom: 5px;
`;

const RLabel = (props: Props) => {
  const {
    children,
    htmlFor,
    onClick,
  } = props;

  const onClickLabel = (ev: MouseEvent<HTMLLabelElement>) => {
    if (onClick) {
      onClick(ev);
    }
  };

  return (
    <Label 
      htmlFor={htmlFor}
      onClick={onClickLabel}
    >
      {children}
    </Label>
  );
};

export default RLabel;