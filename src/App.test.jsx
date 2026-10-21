import { expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders expense list with item titles', () => {
  render(<App />);

  expect(screen.getByText('New book')).toBeInTheDocument();
  expect(screen.getByText('New jeans')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Add New Expense' })).toBeInTheDocument();
  expect(screen.queryByLabelText('Title')).not.toBeInTheDocument();
});

test('opens and cancels the new expense form without adding an expense', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: 'Add New Expense' }));
  expect(screen.getByLabelText('Title')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

  expect(screen.getByRole('button', { name: 'Add New Expense' })).toBeInTheDocument();
  expect(screen.queryByText('New Test Control')).not.toBeInTheDocument();
});

test('adds a valid expense and closes the form', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: 'Add New Expense' }));
  fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Test Control' } });
  fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '11.99' } });
  fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2024-01-19' } });
  fireEvent.click(screen.getByRole('button', { name: 'Add Expense' }));

  expect(screen.getByText('New Test Control')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Add New Expense' })).toBeInTheDocument();
});
