import './Button.css'

export default function Button({ children, onClick, className = '', ...rest }) {
    return (
        <button className={`btn ${className}`} type="button" onClick={onClick} {...rest}>
            {children}
        </button>
    )
}