import { useContext } from 'react';
import { SoundContext } from '../../contexts/SoundContext';
import './Switch.css';

export default function Switch({ isChecked, onSwitch, name = "", children }) {
    const sounds = useContext(SoundContext);

    return (
        <label className="switch" onClick={() => sounds.switch()}>
            <input type="checkbox" name={name} defaultChecked={isChecked} onChange={onSwitch} />
            <span className="slider round">
                {children}
            </span>
        </label>
    )
}