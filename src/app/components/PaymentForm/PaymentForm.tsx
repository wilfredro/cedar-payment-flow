'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import * as Yup from 'yup';

import { usePaymentFlowContext } from '@/app/providers/Context';
import { Button } from '../Button/Button';
import { InputField } from './Field';

interface FormValues {
  cardNumber: string;
  expiration: string;
  securityCode: string;
  name: string;
  zipCode: string;
}

export const paymentInformationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .min(16, '16 digits required')
    .matches(/^\d+$/, 'Numbers only')
    .required('This field is required'),
  expiration: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})+$/, 'Invalid format/range')
    .required('This field is required'),
  securityCode: Yup.string().matches(/^\d+$/, 'Numbers only').required('This field is required'),
  name: Yup.string().required('This field is required'),
  zipCode: Yup.string().min(5, '5 digits required').matches(/^\d+$/, 'Numbers only').required('This field is required'),
});

export function PaymentForm() {
  const initialValues: FormValues = {
    cardNumber: '',
    expiration: '',
    securityCode: '',
    name: '',
    zipCode: '',
  };

  const { updateCreditCard } = usePaymentFlowContext();
  const router = useRouter();

  return (
    <div className="max-w-lg mx-auto overflow-hidden md:max-2xl:rounded-2xl bg-white p-8 md:max-2xl:mt-8">
      <div className="flex flex-row gap-2 mb-4 items-center">
        <div className="bg-[#3667E9] rounded-full w-6 h-6 text-white text-center">1</div>
        <h1 className="font-bold text-lg">Payment information</h1>
      </div>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        validateOnChange={false}
        validateOnMount={false}
        validationSchema={paymentInformationSchema}
        onSubmit={(values) => {
          updateCreditCard(values);
          router.push('/review');
        }}
      >
        <Form data-testid="payment-form">
          <div className="flex flex-col gap-y-4">
            <InputField
              type="text"
              maxLength={16}
              id="cardNumber"
              name="cardNumber"
              label="Card number"
              aria-label="Card number"
              aria-required="true"
            />
            <div className="flex-row flex gap-x-4">
              <InputField
                type="text"
                maxLength={5}
                id="expiration"
                name="expiration"
                label="Expires (MM/YY)"
                aria-label="Expires (MM/YY)"
                aria-required="true"
              />
              <InputField
                type="text"
                maxLength={4}
                id="securityCode"
                name="securityCode"
                label="Security code (CVV)"
                aria-label="Security code (CVV)"
                aria-required="true"
              />
            </div>
            <InputField
              type="text"
              maxLength={255}
              id="name"
              name="name"
              label="Name on card"
              aria-label="Name on card"
              aria-required="true"
            />
            <InputField
              type="text"
              maxLength={5}
              id="zipCode"
              name="zipCode"
              label="Zip code"
              aria-label="Zip code"
              aria-required="true"
            />
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
