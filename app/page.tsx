'use client';

import styled from 'styled-components';
import Head from 'next/head';

import Calculator from '@/components/Calculator';

const MainBlock = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 16px;
`;

export default function Home() {
  return (
    <MainBlock>
      <Calculator/>
    </MainBlock>
  );
}
