import './Card.css'

const Card = (props) => {
    const { className, children, ...otherProps } = props;

    return (
        <div className={`card ${className || ''}`.trim()} {...otherProps}>
            {children}
        </div>
    )
}

export default Card