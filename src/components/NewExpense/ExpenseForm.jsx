import { Fragment, useRef, useState } from "react";
import './ExpenseForm.css'
import Error from "../UI/Error.jsx";

const ExpenseForm = (props) => {
    const [error, setError] = useState(null);

    const titleInputRef = useRef();
    const amountInputRef = useRef();
    const dateInputRef = useRef();

    const clearHandler = () => {
        titleInputRef.current.value = '';
        amountInputRef.current.value = '';
        dateInputRef.current.value = '';
    }

    const errorHandler = () => {
        setError(null);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredAmount = amountInputRef.current.value;
        const enteredDate = dateInputRef.current.value;
        const amount = Number(enteredAmount);
        const date = new Date(enteredDate);

        if (enteredTitle.trim().length === 0 || enteredAmount.trim().length === 0 ||
            !Number.isFinite(amount) || amount <= 0 || enteredDate.trim().length === 0 ||
            Number.isNaN(date.getTime())) {
            setError({
                title: 'Invalid Input',
                message: 'Please enter a valid title, amount, and date.'
            });
            return;
        }

        const expenseData = {
            title: enteredTitle.trim(),
            price: amount,
            date
        }
        clearHandler();
        props.onSaveExpenseData(expenseData);
    }
    return (
        <Fragment>
            {error && (
                <Error
                    title={error.title}
                    message={error.message}
                    onConfirm={errorHandler}
                />
            )}
            <form onSubmit={submitHandler}>
                <div className="new-expense__controls">
                    <div className="new-expense__control">
                        <label htmlFor="expense-title">Title</label>
                        <input
                            id="expense-title"
                            type="text"
                            ref={titleInputRef}
                        />
                    </div>
                    <div className="new-expense__control">
                        <label htmlFor="expense-price">Amount</label>
                        <input
                            id="expense-price"
                            type="number"
                            step="any"
                            ref={amountInputRef}
                        />
                    </div>
                    <div className="new-expense__control">
                        <label htmlFor="expense-date">Date</label>
                        <input
                            id="expense-date"
                            type="date"
                            ref={dateInputRef}
                        />
                    </div>
                </div>
                <div className="new-expense__actions">
                    <button type="submit">Add Expense</button>
                    <button type="button" onClick={props.onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </Fragment>
    )
}

export default ExpenseForm