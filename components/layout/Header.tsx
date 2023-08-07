'use client';

import styled from 'styled-components';

import ContainerBlock from '@/components/ui/Container';

const HeaderBlock = styled.header`
  display: flex;
  width: 100%;
`;

const Container = styled(ContainerBlock)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 400;
  color: #0f0;
  margin-bottom: 20px;
  text-align: center;

  @media screen and (max-width: 800px) {
    font-size: 32px;
  }
`;

const Header = () => {
  return (
    <HeaderBlock>
      <Container>
        <Title>
          Loan calculator
        </Title>
      </Container>
    </HeaderBlock>
  );
};

export default Header;
