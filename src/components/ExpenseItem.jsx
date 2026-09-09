import ExpenseDate from './ExpenseDate.jsx'
import './ExpenseItem.css'
import './Card.css'

const ExpenseItem = (props) => {

    return (
        <div className='card expense-item'>
                <ExpenseDate date={props.data.date}/>
                <div className='expense-item__description'>
                    <h2>{props.data.title}</h2>
                    <div className='expense-item__price'>{props.data.price}</div>
            </div>
        </div>
    );
}

export default ExpenseItem