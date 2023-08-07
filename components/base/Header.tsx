'use client';

import styled from 'styled-components';

const HeaderBlock = styled.header`
  display: flex;
  width: 100%;
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
      <Title>Loan calculator</Title>
    </HeaderBlock>
  );
};

export default Header;
