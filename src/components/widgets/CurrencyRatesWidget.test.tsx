import { render, screen } from '@testing-library/react';
import CurrencyRatesWidget from './CurrencyRatesWidget';

test('віджет показує заглушку при завантаженні', () => {
  render(<CurrencyRatesWidget />);
  expect(screen.getByText(/Завантажуємо валюту/)).toBeInTheDocument();
});