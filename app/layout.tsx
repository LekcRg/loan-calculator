import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import StyledComponentsRegistry from '@/lib/registry';
import fonts from '@/styles/fonts';
import Header from '@/components/layout/Header';
import { Providers } from './providers';
import ThemeProvider from '@/styles/ThemeProvider';

export const metadata: Metadata = {
  title: 'Loan calculator | loan.minimite.me',
  description: 'Loan calculator | loan.minimite.me',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={fonts.className}>
        <ThemeProvider>
          <StyledComponentsRegistry>
            <Providers>
              <Header />
              {children}
            </Providers>
          </StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
