import './Button.css'

export default function Button({ children, onClick, className = '' }) {
    return (
        <button className={`btn ${className}`} type="button" onClick={onClick}>
            {children}
        </button>
    )
}