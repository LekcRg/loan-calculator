import '@/styles/globals.css';

import StyledComponentsRegistry from '@/lib/registry';

import Header from '@/components/base/Header';

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