import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { Header } from './Header';

describe('Header', () => {
  test('renders a header', () => {
    render(<Header />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('header-logo')).toBeInTheDocument();
  });
});
