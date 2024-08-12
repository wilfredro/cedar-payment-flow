'use client';

import React from 'react';

type Patient = {
  name: string;
  provider_name: string;
  bill_amount: number;
  bills: number;
};

type CreditCard = {
  cardNumber: string;
  expiration: string;
  securityCode: string;
  name: string;
  zipCode: string;
};

export const mockData: Patient = {
  name: 'Taylor',
  provider_name: 'ABC Health System',
  bill_amount: 600.0,
  bills: 6,
};

interface PaymentFlowContext {
  patient: Patient;
  creditCard: CreditCard | null;
  updateCreditCard: (creditCard: CreditCard) => void;
}

const PaymentFlowContext = React.createContext({} as PaymentFlowContext);

export function PaymentFlowProvider({ children }: { children: React.ReactNode }) {
  const [creditCard, setCreditCard] = React.useState<CreditCard | null>(null);

  const updateCreditCard = (info: CreditCard) => setCreditCard(info);

  return (
    <PaymentFlowContext.Provider value={{ creditCard, patient: mockData, updateCreditCard }}>
      {children}
    </PaymentFlowContext.Provider>
  );
}

export const usePaymentFlowContext = () => React.useContext(PaymentFlowContext);
