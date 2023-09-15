'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    padding-top: 20px;
    padding-bottom: 40px;
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) => theme.colors.light1};
    background: ${({ theme }) => theme.colors.dark1};
  }

  #__next {
    width: 100%;
    height: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;

    @media screen and (max-width: 1232px) {
      padding-right: 16px;
      padding-left: 16px;
    }
  }
`;

export default GlobalStyles;
