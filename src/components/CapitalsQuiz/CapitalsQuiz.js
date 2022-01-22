import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CapitalsQuizContext } from '../../contexts/CapitalsQuizContext';
import GameStartMenu from '../GameStartMenu/GameStartMenu';
import './CapitalsQuiz.css';

export default function CapitalsQuiz() {
    const { region } = useParams();
    console.log(region)
    const ctx = useContext(CapitalsQuizContext);
    return (
        console.log(ctx) &&
        ctx.capitals.length !== 0
            ? <p>Capitals Quiz</p>
            : <GameStartMenu content={{ title: 'Europe Flags Quiz', image: '/images/europe/flags.png' }} startGame={ctx.startGame} region={region} />
    )
}