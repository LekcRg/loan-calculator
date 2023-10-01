'use client';

import { PropsWithChildren } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

const darkTheme: DefaultTheme = {
  colors: {
    accent: '#76B8B0',
    accent2: '#BFEEE8',
    accent3: '#4B9A91',
    accent4: 'rgba(118, 184, 176, .25)', // rgba(${accent}, .25)
    accent5: '#0E1515',
    accent6: '#1B322F',
    dark1: '#0D0E0F',
    dark2: '#181818',
    dark3: '#222',
    light1: '#F9F9F9',
    light3: '#929292',
  },
  fontFamily: '\'Montserrat\', sans-serif',
};

const Theme = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={darkTheme}>
      {children}
    </ThemeProvider>
  );
};

export default Theme;