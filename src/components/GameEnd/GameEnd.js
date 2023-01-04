import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../contexts/LanguageContext';
import { SoundContext } from '../../contexts/SoundContext';
import useOnClickConfetti from '../../hooks/useOnClickConfetti';
import useFireworksConfetti from '../../hooks/useFireworksConfetti';
import { calculateScore } from '../../helper/calculateScore';
import Button from '../Common/Button';
import Stopwatch from '../Common/Stopwatch';
import './GameEnd.css';


export default function GameEnd({ title, score, time }) {
    const navigate = useNavigate();
    const { translate } = useContext(LanguageContext);
    const { sounds } = useContext(SoundContext);
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
                    <p className='game-title'>{title}</p>
                </article>
                <article className="score">
                    <p className='game-end-score'>{translate('Score', 'misc')}:
                        {
                            <span style={{ color: colors.score || 'var(--primary)' }}>
                                {` ${score.value}`}
                            </span>
                        }
                        {`/${score.max}`}
                    </p>
                    <Stopwatch on={time.on} time={time.value} color={colors.stopwatch} />
                </article>
                <p className='game-end-score' style={{ color: colors.points || 'var(--primary)' }}>
                    {translate('Points', 'misc')}: {points === Math.floor(points) ? points : points.toFixed(1)}
                </p>
                <Button onClick={() => navigate('/')}>{translate('Home', 'misc')}</Button>
            </section>
        </>
    )
}