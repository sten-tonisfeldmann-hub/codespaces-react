import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders expense list with item titles', () => {
  render(<App />);

  expect(screen.getByText('New book')).toBeInTheDocument();
  expect(screen.getByText('New jeans')).toBeInTheDocument();
});
