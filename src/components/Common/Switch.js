import { useContext } from 'react';
import { SoundContext } from '../../contexts/SoundContext';
import './Switch.css';

export default function Switch({ isChecked, onSwitch, disabled, children }) {
    const { sounds } = useContext(SoundContext);

    return (
        <label className="switch" onClick={() => !disabled && sounds.switch()}>
            <input type="checkbox" disabled={disabled} defaultChecked={isChecked} onChange={() => !disabled && onSwitch()} />
            <span className="slider round">
                {children &&
                    <>
                        <div className='switch-el-1' style={{ opacity: isChecked ? 1 : 0 }}>
                            {children[0]}
                        </div>
                        <div className='switch-el-2' style={{ opacity: isChecked ? 0 : 1 }}>
                            {children[1]}
                        </div>
                    </>
                }
            </span>
        </label>
    )
}