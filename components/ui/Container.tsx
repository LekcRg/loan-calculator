import React from 'react';

import styled from 'styled-components';

type props = {
  className?: string
}

const ContainerBlock = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
`;

const Container = (props: React.PropsWithChildren<props>) => {
  const {
    children,
    className,
  } = props;

  return (
    <ContainerBlock className={className}>
      { children }
    </ContainerBlock>
  );
};

export default Container;