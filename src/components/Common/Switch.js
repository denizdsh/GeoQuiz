import './Switch.css';

export default function Switch({ isChecked, onSwitch, name = "", children }) {
    return (
        <label className="switch">
            <input type="checkbox" name={name} defaultChecked={isChecked} onChange={onSwitch} />
            <span className="slider round">
                {children}
            </span>
        </label>
    )
}