import { Metadata } from 'next';

import StyledComponentsRegistry from './registry';

import './globals.css';

import { Inter } from 'next/font/google';

import Layout from './components/Layout/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Cedar - Payment Flow`,
  description: `Pay your medical bills`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Layout>{children}</Layout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
