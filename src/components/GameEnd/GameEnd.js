import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../contexts/LanguageContext';
import { SoundContext } from '../../contexts/SoundContext';
import Button from '../Common/Button';
import Stopwatch from '../Common/Stopwatch';
import './GameEnd.css';

export default function GameEnd({ title, score, time, timePerQuestion = 6 }) {
    const navigate = useNavigate();
    const { translate } = useContext(LanguageContext);
    const { sounds } = useContext(SoundContext);
    const [colors, setColors] = useState({})

    let points = score.value * (60 - time.value / score.value) || 0;

    useEffect(() => {
        let average = 0;
        let scoreColor;
        if (score.value >= score.max - Math.ceil(0.1 * score.max)) {
            scoreColor = 'green';
            points *= 2;
            average++;
        } else if (score.value < score.max / 2) {
            scoreColor = 'red';
            points /= 2;
        } else {
            average += 0.5;
        }

        let stopwatchColor;
        if (score.value * timePerQuestion >= time.value) {
            stopwatchColor = 'green';
            points *= 1.5;
            average++;
        } else if (score.value * 3 * timePerQuestion <= time.value) {
            stopwatchColor = 'red';
            points /= 1.8;
        } else {
            average += 0.5;
        }

        setColors({ scoreColor, stopwatchColor })

        if (average >= 1) {
            sounds.excellentScore();
        } else if (average < 1) {
            sounds.badScore();
        }
    }, [])

    return (
        <section className='game game-end'>
            <article className="title-container title">
                <p className='game-title'>{title}</p>
            </article>
            <article className="score">
                <p className='game-end-score'>{translate('misc', 'Score')}:
                    {
                        <span style={{ color: colors.scoreColor || 'var(--primary)' }}>
                            {` ${score.value}`}
                        </span>
                    }
                    {`/${score.max}`}
                </p>
                <Stopwatch on={time.on} time={time.value} color={colors.stopwatchColor} />
            </article>
            <p className='game-end-score'>{translate('misc', 'Points')}: {points === Math.floor(points) ? points : points.toFixed(1)}</p>
            <Button onClick={() => navigate('/')}>{translate('misc', 'Home')}</Button>
        </section>
    )
}