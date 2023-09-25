import type { ReactNode, MouseEvent } from 'react';

import styled from 'styled-components';

type Props = {
  children: ReactNode;
  small?: boolean;
  htmlFor?: string;
  onClick?: Function;
}

const Label = styled.label<{ $small?: boolean }>`
  display: block;
  font-size: ${props => props.$small ? '10px' : '16px'};
  color: ${({ theme }) => theme.colors.light1};
  margin-bottom: 5px;
`;

const RLabel = (props: Props) => {
  const {
    children,
    small = false,
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
      $small={small}
      htmlFor={htmlFor}
      onClick={onClickLabel}
    >
      {children}
    </Label>
  );
};

export default RLabel;