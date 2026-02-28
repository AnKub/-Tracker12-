import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useExchangeRates } from './useExchangeRates';

// Групуємо всі тести для useExchangeRates

describe('useExchangeRates', () => {
  // Тест 1: дефолтні курси при старті
  it('повертає дефолтні курси при старті', async () => {
    const { result } = renderHook(() => useExchangeRates());
    expect(result.current.rates).toEqual({ UAH: 1, USD: 0.025, EUR: 0.023 });
    // Чекаємо, поки loading стане false
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBeNull();
  });

  // Тест 2: rates оновлюються після fetch (мокаємо)
  it('оновлює курси після успішного fetch', async () => {
    const mockRates = { UAH: 1, USD: 0.03, EUR: 0.028 };
    // робимо кастування
 vi.spyOn(globalThis, 'fetch').mockImplementation(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({ rates: { USD: mockRates.USD, EUR: mockRates.EUR } }),
    headers: new Headers(),
    redirected: false,
    statusText: 'OK',
    type: 'basic',
    url: '',
    clone: () => undefined,
    body: null,
    bodyUsed: false,
    arrayBuffer: async () => new ArrayBuffer(0),
    blob: async () => new Blob(),
    formData: async () => new FormData(),
    text: async () => '',
  } as unknown as Response)
);

    const { result } = renderHook(() => useExchangeRates());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.rates).toEqual(mockRates);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  // Тест 3: error mock
  it('повертає error при помилці fetch', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(() => Promise.reject('API error'));

    const { result } = renderHook(() => useExchangeRates());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.rates).toEqual({ UAH: 1, USD: 0.025, EUR: 0.023 });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Не вдалося отримати курс валют. Використано стандартні значення.');
  });
});
