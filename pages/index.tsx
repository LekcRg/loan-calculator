import styled from 'styled-components';

import Head from 'next/head';

const MainBlock = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 64px;
  font-weight: 400;
  color: #0f0;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Hello world!</title>
        <meta name="description" content="Hello world! From next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainBlock>
        <Title>
          Deployed
        </Title>
      </MainBlock>
    </>
  );
}
