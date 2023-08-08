'use client';

import styled from 'styled-components';

const HeaderBlock = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Title = styled.h1`
  font-size: 32px;
  line-height: 1;
  font-weight: 400;
  color: #0f0;
  text-align: center;

  @media screen and (max-width: 800px) {
    font-size: 32px;
  }
`;

const Header = () => {
  return (
    <HeaderBlock>
      <Container className="container">
        <Title>Loan calculator</Title>
      </Container>
    </HeaderBlock>
  );
};

export default Header;
