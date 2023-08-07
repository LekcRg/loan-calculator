import '@/styles/globals.css';
import { Metadata } from 'next';

import StyledComponentsRegistry from '@/lib/registry';

import Header from '@/components/base/Header';

export const metadata: Metadata = {
  title: 'Loan calculator | loan.minimite.me',
  description: 'Loan calculator | loan.minimite.me',
};

export default function RootLayout({
  children,
}: {
    children: React.ReactNode
  }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Header/>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}