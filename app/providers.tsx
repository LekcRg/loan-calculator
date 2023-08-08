'use client';

import { PropsWithChildren } from 'react';
import GlobalStyles from '@/styles/GlobalStyled';

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <GlobalStyles />
      {children}
    </>
  );
}