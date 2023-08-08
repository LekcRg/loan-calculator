import { Metadata } from 'next';

import StyledComponentsRegistry from '@/lib/registry';
import fonts from '@/styles/fonts';
import Header from '@/components/layout/Header';
import { Providers } from './providers';

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
          <Providers>
            <Header />
            {children}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
