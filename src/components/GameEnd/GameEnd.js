import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../contexts/LanguageContext';
import Button from '../Common/Button';
import Stopwatch from '../Common/Stopwatch';
import './GameEnd.css';

export default function GameEnd({ title, score, time }) {
    const navigate = useNavigate();
    const { translate } = useContext(LanguageContext);

    let points = score.value * (60 - time.value / score.value);

    let scoreColor;
    if (score.value >= score.max - Math.ceil(0.1 * score.max)) {
        scoreColor = 'green';
        points *= 2;
    } else if (score.value < score.max / 2) {
        scoreColor = 'red';
        points /= 2;
    }

    let stopwatchColor;
    if (score.value * 8 >= time.value) {
        stopwatchColor = 'green';
        points *= 1.5;
    } else if (score.value * 24 <= time.value) {
        stopwatchColor = 'red';
        points /= 1.8;
    }

    return (
        <section className='game-end'>
            <article className="title">
                <p className='game-title'>{title}</p>
            </article>
            <article className="score">
                <p className='game-end-score'>{translate('misc', 'Score')}:
                    {
                        <span style={{ color: scoreColor || 'var(--primary)' }}>
                            {` ${score.value}`}
                        </span>
                    }
                    {`/${score.max}`}
                </p>
                <Stopwatch on={time.on} time={time.value} color={stopwatchColor} />
            </article>
            <p className='game-end-score'>{translate('misc', 'Points')}: {points === Math.floor(points) ? points : points.toFixed(1)}</p>
            <Button onClick={() => navigate('/')}>{translate('misc', 'Home')}</Button>
        </section>
    )
}