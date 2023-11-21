import { ReactNode, MouseEvent } from 'react';

import styled, { css } from 'styled-components';

type Props = {
  children?: ReactNode;
  className?: string;
  icon?: string,
  type?: 'default' | 'accent' | 'accent-color' | 'red' | 'icon';
  onClick?: (ev: MouseEvent<HTMLButtonElement>) => void;
}

const Button = styled.button<{$type?: Props['type']; $withoutPadding: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 8px;
  padding: ${props => props.$withoutPadding ? 0 : `12px 24px`};
  height: ${props => props.$withoutPadding ? '48px' : `auto`};
  width: ${props => props.$withoutPadding ? '48px' : `auto`};
  cursor: pointer;
  border: none;
  outline: none;
  transition: background .3s ease;

  ${({ $type }) => ($type === 'default' || $type === 'accent-color') && css`
    background: ${({ theme }) => theme.colors.dark3};

    &:hover {
      background: ${({ theme }) => theme.colors.dark4};
    }
  `}
  
  ${({ $type }) => ($type === 'accent' || $type === 'default') && css`
    color: ${({ theme }) => theme.colors.light1};
  `}

  ${({ $type }) => $type === 'accent' && css`
    background: ${({ theme }) => theme.colors.accent};

    &:hover {
      background: ${({ theme }) => theme.colors.accent3};
    }
  `}

  ${({ $type }) => $type === 'accent-color' && css`
    color: ${({ theme }) => theme.colors.accent};
  `}

  ${({ $type }) => $type === 'red' && css`
    color: ${({ theme }) => theme.colors.red1};
    background: ${({ theme }) => theme.colors.red2};

    &:hover {
      background: ${({ theme }) => theme.colors.red3};
    }
  `}
`;

const Icon = styled.svg<{$big?: boolean}>`
  width: ${({ $big }) => $big ? '24px' : '16px'};
  height: ${({ $big }) => $big ? '24px' : '16px'};
  margin-left: ${({ $big }) => $big ? '0' : '8px'};
`;

const RButton = (props: Props) => {
  const {
    type = 'default',
    icon,
    children,
    className,
    onClick,
  } = props;

  const onClickBtn = (ev: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(ev);
    }
  };

  return (
    <Button
      $type={type}
      $withoutPadding={!children}
      onClick={onClickBtn}
      className={className}
    >
      { children }

      { icon && (
        <Icon
          $big={!children}
        >
          <use xlinkHref={`#${icon}`} viewBox="0 0 16 16"></use>
        </Icon>
      )}
    </Button>
  );
};

export default RButton;