import './Button.css'

export default function Button({ children, onClick }) {
    return (
        <button className='btn' type="button" onClick={onClick}>
            {children}
        </button>
    )
}