import './Switch.css';

export default function Switch({ isChecked, onSwitch, name = "" }) {
    return (
        <label className="switch">
            <input type="checkbox" name={name} checked={isChecked} onChange={onSwitch} />
            <span className="slider round">
            </span>
        </label>
    )
}