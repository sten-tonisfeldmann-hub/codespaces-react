import { useState } from "react";
import './ExpenseForm.css'

const ExpenseForm = (props) => {
        const [userInput, setuserInput] = useState({
            enteredTitle: '',
            enteredPrice: '',
            enteredDate: ''
        })

        console.log(userInput)

        const titleChangeHandler = (event) => {
            setuserInput({
                ...userInput,
                enteredTitle: event.target.value
            })
        }
        
        const priceChangeHandler = (event) => {
            setuserInput({
                ...userInput,
                enteredPrice: event.target.value
            })
        }

        const dateChangeHandler = (event) => {
            setuserInput({
                ...userInput,
                enteredDate: event.target.value
            })
        }
        const submitHandler = (event) => {
            event.preventDefault();
            const expenseData = {
                title: userInput.enteredTitle,
                price: Number(userInput.enteredPrice),
                date: new Date(userInput.enteredDate)
            }
            props.onSaveExpenseData(expenseData)
        }

    return (
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label htmlFor="expense-title">Title</label>
                    <input
                        id="expense-title"
                        type="text"
                        required
                        onChange={titleChangeHandler}
                        value={userInput.enteredTitle}
                    />
                </div>
                <div className="new-expense__control">
                    <label htmlFor="expense-price">Amount</label>
                    <input
                        id="expense-price"
                        type="number"
                        min="0.01"
                        step="0.01"
                        required
                        onChange={priceChangeHandler}
                        value={userInput.enteredPrice}
                    />
                </div>
                <div className="new-expense__control">
                    <label htmlFor="expense-date">Date</label>
                    <input
                        id="expense-date"
                        type="date"
                        required
                        onChange={dateChangeHandler}
                        value={userInput.enteredDate}
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
    )
}

export default ExpenseForm