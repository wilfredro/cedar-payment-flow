import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PaymentFlowProvider } from '../providers/Context';
import Payment from './page';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Payment page', () => {
  test('renders heading and form', () => {
    render(
      <PaymentFlowProvider>
        <Payment />
      </PaymentFlowProvider>
    );

    expect(screen.getByText('Payment information')).toBeInTheDocument();
    expect(screen.getByTestId('payment-form')).toBeInTheDocument();
  });

  test('valid form will route to /review', async () => {
    render(
      <PaymentFlowProvider>
        <Payment />
      </PaymentFlowProvider>
    );
    const user = userEvent.setup();

    await user.type(screen.getByRole('textbox', { name: /card number/i }), '4444567891014444');
    await user.type(screen.getByRole('textbox', { name: /expires/i }), '12/22');
    await user.type(screen.getByRole('textbox', { name: /security code/i }), '123');
    await user.type(screen.getByRole('textbox', { name: /name on card/i }), 'Foo Bar');
    await user.type(screen.getByRole('textbox', { name: /zip code/i }), '10012');

    await user.click(screen.getByRole('button', { name: /continue/i }));

    expect(await screen.findAllByTestId('check-icon')).toHaveLength(5);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/review');
    });
  });

  describe('when clicking the continue button', () => {
    test('5 fields will be required', async () => {
      render(
        <PaymentFlowProvider>
          <Payment />
        </PaymentFlowProvider>
      );

      const user = userEvent.setup();

      await user.click(screen.getByRole('button', { name: /continue/i }));

      await waitFor(() => {
        expect(screen.getAllByText('This field is required')).toHaveLength(5);
        expect(screen.getAllByTestId('error-icon')).toHaveLength(5);
      });
    });
  });
});
