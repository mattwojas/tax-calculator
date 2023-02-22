import { render, screen } from '@testing-library/react';
import Header from './header';

test('renders heading text', () => {
  render(<Header />);
  const heading = screen.getByText(/Marginal Tax Bracket Calculator/i);
  expect(heading).toBeInTheDocument();
});
