import { Metadata } from 'next';

import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyles from '@/styles/GlobalStyled';
import fonts from '@/styles/fonts';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Loan calculator | loan.minimite.me',
  description: 'Loan calculator | loan.minimite.me',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fonts.className}>
        <StyledComponentsRegistry>
          <Header />
          {children}
          <GlobalStyles />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
