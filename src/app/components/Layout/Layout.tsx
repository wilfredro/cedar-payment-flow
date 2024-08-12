'use client';

import { PaymentFlowProvider } from '@/app/providers/Context';
import { Header } from '../Header/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PaymentFlowProvider>
      <div className="flex flex-col min-h-[100vh]">
        <Header />
        <main className="bg-[#f2f8ff] flex-grow">{children}</main>
      </div>
    </PaymentFlowProvider>
  );
}
