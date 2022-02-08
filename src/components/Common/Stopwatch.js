import { useState, useEffect } from 'react';
import './Stopwatch.css';

export default function Stopwatch({ run, on }) {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval;
        if (run) {
            interval = setInterval(() => setTime(time + 1), 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [run, time])

    const formatTime = () => {
        let minutes = String(Math.floor(time / 60)).padStart(2, '0');
        let seconds = String(time - minutes * 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    return (

        <article className="stopwatch">
            <i className="fas fa-stopwatch running" style={!on ? { color: 'var(--text-secondary)' } : {}} />
            <p className="time">
                {on ? formatTime(time) : '--:--'}
            </p>
        </article>
    )
}