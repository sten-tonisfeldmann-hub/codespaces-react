import './App.css';
import { useState } from 'react';
import Expenses from './components/Expenses/Expenses.jsx';
import NewExpense from './components/NewExpense/NewExpense.jsx';

const App = () => {
  const DYMMY_EXPENSES = [
    {
      id: 'id1',
      date: new Date(2024, 10, 12),
      title: 'New book',
      price: 30.99
    },
    {
      id: 'id2',
      date: new Date(2024, 10, 12),
      title: 'New jeans',
      price: 99.99
    },
    {
      id: 'id3',
      date: new Date(2024, 10, 25),
      title: 'New Bag',
      price: 139.99
    }
  ]

  const [expenses, setExpenses] = useState(DYMMY_EXPENSES);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  }

  return (
    <div className="App">
      <NewExpense onAddExpense={addExpenseHandler}/>
      <Expenses expenses={expenses} />
    </div>
  );
};

export default App;