import { beforeEach, expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
});

test('renders expense list with item titles', () => {
  render(<App />);

  expect(screen.getByRole('button', { name: 'Add New Expense' })).toBeInTheDocument();
  expect(screen.queryByLabelText('Title')).not.toBeInTheDocument();
  expect(screen.queryByText('New book')).not.toBeInTheDocument();
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

  const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
  expect(storedExpenses).toHaveLength(1);
  expect(storedExpenses[0]).toMatchObject({
    title: 'New Test Control',
    price: 11.99,
    date: '2024-01-19T00:00:00.000Z'
  });
});

test('restores saved expenses and their dates from local storage', () => {
  localStorage.setItem('expenses', JSON.stringify([
    {
      id: 'saved-expense',
      title: 'Saved expense',
      price: 11.99,
      date: new Date(2024, 0, 19).toISOString()
    }
  ]));

  render(<App />);

  expect(screen.getByText('Saved expense')).toBeInTheDocument();
  expect(screen.getByText('January')).toBeInTheDocument();
  expect(screen.getByText('19')).toBeInTheDocument();
  expect(screen.getByText('2024', { selector: '.expense-date__year' })).toBeInTheDocument();
});

test('shows an error for invalid expense data and dismisses it without closing the form', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: 'Add New Expense' }));
  fireEvent.click(screen.getByRole('button', { name: 'Add Expense' }));

  expect(screen.getByText('Invalid Input')).toBeInTheDocument();
  expect(screen.getByText('Please enter a valid title, amount, and date.')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Okay' }));

  expect(screen.queryByText('Invalid Input')).not.toBeInTheDocument();
  expect(screen.getByLabelText('Title')).toBeInTheDocument();
});

test('shows an error when the expense amount is not positive', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: 'Add New Expense' }));
  fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Invalid Expense' } });
  fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '0' } });
  fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2024-01-19' } });
  fireEvent.click(screen.getByRole('button', { name: 'Add Expense' }));

  expect(screen.getByText('Invalid Input')).toBeInTheDocument();
  expect(screen.queryByText('Invalid Expense')).not.toBeInTheDocument();
});
