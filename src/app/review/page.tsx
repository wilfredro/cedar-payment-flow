'use client';

import React from 'react';

import { Button } from '../components/Button/Button';
import { VisaIcon } from '../icons';
import { usePaymentFlowContext } from '../providers/Context';

interface ReviewAndPayProps {
  billAmount: number;
  cardNumber?: string;
  setIsPaid: (isPaid: boolean) => void;
}

function ReviewAndPay(props: ReviewAndPayProps) {
  const { billAmount, cardNumber, setIsPaid } = props;
  const formattedBillAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(billAmount);
  const formattedCreditCardNumber = cardNumber?.slice(cardNumber.length - 4);

  return (
    <div className="max-w-md mx-auto overflow-hidden md:max-2xl:rounded-2xl bg-white p-8 md:max-2xl:mt-8">
      <div className="flex flex-row gap-2 mb-4 items-center">
        <div className="bg-[#3667E9] rounded-full w-6 h-6 text-white text-center">2</div>
        <h1 className="font-bold text-lg">Review and pay</h1>
      </div>

      <div className="text-md">
        {`You're about to make a payment of `}
        <span className="font-bold text-lg">{formattedBillAmount}</span>
      </div>

      {cardNumber && (
        <>
          <div className="text-sm text-[#65657B] font-bold mt-4">Payment method</div>
          <div className="text-sm flex gap-x-2">
            <span>
              <VisaIcon />
            </span>
            <span>&middot;&middot;&middot;&middot;Card ending in {formattedCreditCardNumber}</span>
          </div>
        </>
      )}
      <div className="mt-8">
        <Button onClick={() => setIsPaid(true)} disabled={!cardNumber}>{`Pay ${formattedBillAmount}`}</Button>
      </div>
    </div>
  );
}

function ThankYouMessage() {
  return (
    <div className="max-w-md mx-auto overflow-hidden my-16 md:max-2xl:mt-8">
      <h1 className="font-bold text-xl text-[#13126c] text-center">Thank you for your payment!</h1>
    </div>
  );
}

export default function ReviewContainer() {
  const { patient, creditCard } = usePaymentFlowContext();
  const [isPaid, setIsPaid] = React.useState(false);

  return (
    <section className="container mx-auto">
      {isPaid ? (
        <ThankYouMessage />
      ) : (
        <ReviewAndPay billAmount={patient.bill_amount} cardNumber={creditCard?.cardNumber} setIsPaid={setIsPaid} />
      )}
    </section>
  );
}
