import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CurrencyRatesWidget from './CurrencyRatesWidget';

describe('CurrencyRatesWidget', () => {
  it('показує заглушку при завантаженні', () => {
    render(<CurrencyRatesWidget />);
    expect(screen.getByText(/Завантажуємо валюту/)).toBeInTheDocument();
  });
});