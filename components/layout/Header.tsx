'use client';

import styled from 'styled-components';

// import Image from 'next/image';

import logoImg from '@/assets/icons/logo.svg';
import githubImg from '@/assets/icons/github.svg';

const HeaderBlock = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  padding: 0px 16px;
  background: ${({ theme }) => theme.colors.dark2};
  border-radius: 4px;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Logo = styled.svg`
  position: relative;
  padding-right: 10px;
  height: 24px;
  color: ${({ theme }) => theme.colors.accent}
`;

const Title = styled.h2`
  position: relative;
  display: block;
  padding-left: 10px;
  color: ${({ theme }) => theme.colors.light3};
  font-size: 18px;
  font-weight: 400;
  line-height: 100%;

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 100%;
    width: 1px;
    height: 18px;
    background: ${({ theme }) => theme.colors.light3};
  }
`;

const Links = styled.ul`
  display: flex;
`;

const LinkItem = styled.li`
  /*  */
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const LinkImage = styled(Image)`
//   width: 20px;
//   height: 20px;
// `;

const SvgLink = styled.svg`
  width: 20px;
  height: 20px;
`;

const Header = () => {
  return (
    <HeaderBlock className="container">
      <Container>
        <LogoWrapper>
          <Logo viewBox="0 0 106 24">
            <use xlinkHref="#logo"></use>
          </Logo>

          <Title>Loan calculator</Title>
        </LogoWrapper>

        <Link 
          target="_blank"
          href="https://github.com/LekcRg/loan-calculator"
        >
          <SvgLink viewBox="0 0 16 16">
            <use xlinkHref="#github"></use>
          </SvgLink>
        </Link>
      </Container>
    </HeaderBlock>
  );
};

export default Header;
