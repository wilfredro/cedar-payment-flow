import { render } from '@testing-library/react';

import { PaymentFlowProvider } from '../providers/Context';
import Review from './page';

describe('Review page', () => {
  // TODO
  test('renders heading and form', () => {
    render(
      <PaymentFlowProvider>
        <Review />
      </PaymentFlowProvider>
    );
  });
});
