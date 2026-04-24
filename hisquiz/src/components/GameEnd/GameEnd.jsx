import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOnClickConfetti from '../../hooks/useOnClickConfetti';
import useFireworksConfetti from '../../hooks/useFireworksConfetti';
import { calculateScore } from '../../helper/calculateScore';
import Button from '../Common/Button';
import Stopwatch from '../Common/Stopwatch';
import './GameEnd.css';
import { useTranslation } from '../../hooks/useTranslation';
import { useSounds } from '../../hooks/useSounds';


export default function GameEnd({ title, score, time }) {
    const navigate = useNavigate();
    const { dict } = useTranslation();
    const { sounds } = useSounds();
    const [colors, setColors] = useState({});
    const [points, setPoints] = useState(0);
    const [confetti, fire] = useOnClickConfetti();
    const [fireworks, start] = useFireworksConfetti();


    useEffect(() => {
        const { value, colors: newColors } = calculateScore(score, time);

        setPoints(value.points);
        setColors(newColors);

        if (value.average >= 1) {
            start();
            sounds.excellentScore();
        } else if (value.average < 1) {
            window.addEventListener('click', fire);
            sounds.badScore();
        }

        return () => {
            window.removeEventListener('click', fire);
        }
    }, [])


    return (
        <>
            {confetti}
            {fireworks}
            <section className='game game-end slide absolute'>
                <article className="title-container title">
                    <h2 className='game-title'>{title}</h2>
                </article>

                <p>{dict.misc.Score}:
                    {
                        <span style={{ color: colors.score || 'var(--primary)' }}>
                            {` ${score.value}`}
                        </span>
                    }
                    {`/${score.max}`}
                </p>

                <article className='score-time'>
                    <span style={{ marginRight: '2px' }}>Time:</span>
                    <Stopwatch reversed on={time.on} time={time.value} color={colors.stopwatch} />
                </article>

                <p className='game-end-score' style={{ color: colors.points || 'var(--primary)' }}>
                    {dict.misc.Points}: {points === Math.floor(points) ? points : points.toFixed(1)}
                </p>

                <Button onClick={() => navigate('/')}>{dict.misc.Home}</Button>
            </section>
        </>
    )
}