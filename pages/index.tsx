import styled from 'styled-components';
import Head from 'next/head';

import Calculator from '@/components/Calculator';

const MainBlock = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 16px;
`;


export default function Home() {
  return (
    <>
      <Head>
        <title>Loan calculator | loan.minimite.me </title>
        <meta name="description" content="Loan calculator | Minimite.me" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainBlock>
        <Calculator/>
      </MainBlock>
    </>
  );
}
