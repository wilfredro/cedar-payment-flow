'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { usePaymentFlowContext } from '@/app/providers/Context';
import { Button } from './components/Button/Button';

export default function Home() {
  const router = useRouter();
  const { patient } = usePaymentFlowContext();

  const formattedBillAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(patient.bill_amount);

  return (
    <section className="container mx-auto">
      <div className="max-w-md mx-auto overflow-hidden px-4 py-24">
        <h1 className="text-lg lg:text-2xl xl:text-3xl text-center font-bold text-[#13126c] leading-9">{`Hi, ${patient.name}`}</h1>
        <p className="mt-4 text-sm lg:text-md text-center my-8">{`You have ${patient.bills} medical bills ready from ${patient.provider_name}. You can pay your bills here or verify your identity to view full bill details.`}</p>

        <div className="flex flex-row items-center justify-between mt-4">
          <div className="text-sm  text-[#65657B] font-bold">Total due</div>
          <div className="text-lg  lg:text-xl text-center font-bold text-[#13126c] leading-9">
            {formattedBillAmount}
          </div>
        </div>
        <div className="mt-4">
          <Button data-testid="pay-total-button" onClick={() => router.push('/payment')}>
            Pay total
          </Button>
        </div>
      </div>
    </section>
  );
}
