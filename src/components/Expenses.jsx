import ExpenseItem from './ExpenseItem.jsx';
import './Expenses.css';

const Expenses = (props) => {
    return (
        <div className='expenses'>
            {props.items.map((expense) => (
                <ExpenseItem key={expense.title} data={expense} />
            ))}
        </div>
    );
};

export default Expenses;
