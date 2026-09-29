import { useState } from 'react';
import './Expenses.css';
import ExpenseItem from './ExpenseItem.jsx';
import ExpensesFilter from './ExpensesFilter.jsx';

const Expenses = (props) => {
    const filteredYearHandler = (filteredYear) => {
        console.log('Year Data in Expenses.jsx' + filteredYear  );
    }

    props.expenses.map((expense) => {
        console.log(expense)
    })

    const filteredExpenses = props.items.filter(
        (expense) => expense.date.getFullYear().toString() === filteredYear
    );

    return (
        <div className='expenses'>
            <ExpensesFilter  onChangeFilter={filteredYearHandler}/>
            {
                props.expenses.map((expense) => {
                    return <ExpenseItem expenseData={expense} key={expense.id} />;
                })
            }
        </div>
    );
};

export default Expenses;
