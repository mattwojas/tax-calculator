import { render, screen } from '@testing-library/react';
import TaxesOwed from './TaxesOwed';

test('renders TaxesOwed heading', () => {
  render(<TaxesOwed />);
  const heading = screen.getByText(/Taxes Owed/i);
  expect(heading).toBeInTheDocument();
});
test('renders TaxesOwed amount', () => {
  render(<TaxesOwed owed="300" />);
  const heading = screen.getByText(/300/i);
  expect(heading).toBeInTheDocument();
});
