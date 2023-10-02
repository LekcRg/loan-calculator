import { MouseEventHandler, ReactNode, MouseEvent } from 'react';

import styled from 'styled-components';

type Props = {
  children: ReactNode;
  onClick?: Function;
  className?: string;
};

const Button = styled.button`
  background: #616161;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  border: none;
  outline: none;
  transition: background 0.3s ease;

  &:hover {
    background: #515151;
  }
`;

const RButton = (props: Props) => {
  const { children, onClick, className } = props;

  const onClickBtn = (ev: MouseEvent) => {
    if (onClick) {
      onClick(ev);
    }
  };

  return (
    <Button onClick={onClickBtn} className={className}>
      {children}
    </Button>
  );
};

export default RButton;
