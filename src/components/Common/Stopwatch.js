import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Stopwatch.css';

export default function Stopwatch({ run, on, time, setTime, color = 'var(--text-primary)', width = '25%' }) {
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
        <article className="stopwatch" style={{ width }}>
            <FontAwesomeIcon icon="fa-solid fa-stopwatch" className={`fas running ${on ? "active stopwatch" : "inactive"}`} />
            <p className="time" style={!on ? { color: 'var(--text-secondary)' } : { color }}>
                {on ? formatTime(time) : '--:--'}
            </p>
        </article>
    )
}