import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Home from './page';
import { PaymentFlowProvider } from './providers/Context';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Home page', () => {
  test('renders content', () => {
    render(
      <PaymentFlowProvider>
        <Home />
      </PaymentFlowProvider>
    );

    expect(screen.getByText('Hi, Taylor')).toBeInTheDocument();
    expect(screen.getByText('$600.00')).toBeInTheDocument();
    expect(screen.getByText('Total due')).toBeInTheDocument();
    expect(
      screen.getByText(
        'You have 6 medical bills ready from ABC Health System. You can pay your bills here or verify your identity to view full bill details.'
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId('pay-total-button')).toBeInTheDocument();
  });

  test('clicking button will route to /payment', async () => {
    render(
      <PaymentFlowProvider>
        <Home />
      </PaymentFlowProvider>
    );

    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /pay total/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/payment');
    });
  });
});
