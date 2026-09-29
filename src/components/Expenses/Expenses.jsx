import { useState } from 'react';
import './Expenses.css';
import ExpenseItem from './ExpenseItem.jsx';
import ExpensesFilter from './ExpensesFilter.jsx';

const Expenses = (props) => {
    const [filteredYear, setFilteredYear] = useState('2024');

    const filteredYearHandler = (filteredYear) => {
        setFilteredYear(filteredYear);
    }

    const filteredExpenses = props.expenses.filter(
        (expense) => expense.date.getFullYear().toString() === filteredYear
    );

    return (
        <div className='expenses'>
            <ExpensesFilter selected={filteredYear} onChangeFilter={filteredYearHandler}/>
            {
                filteredExpenses.map((expense) => {
                    return <ExpenseItem data={expense} key={expense.id} />;
                })
            }
        </div>
    );
};

export default Expenses;
