import { useContext } from 'react';
import { SoundContext } from '../../contexts/SoundContext';
import './Switch.css';

export default function Switch({ isChecked, onSwitch, children }) {
    const { sounds } = useContext(SoundContext);

    return (
        <label className="switch" onClick={() => sounds.switch()}>
            <input type="checkbox" defaultChecked={isChecked} onChange={onSwitch} />
            <span className="slider round">
                {children}
            </span>
        </label>
    )
}