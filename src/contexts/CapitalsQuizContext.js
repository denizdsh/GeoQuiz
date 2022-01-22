import { createContext, useState } from "react";

import * as service from '../services/capitalsQuizService'

export const CapitalsQuizContext = createContext();

export function CapitalsQuizProvider({ children }) {
    const [score, setScore] = useState(0);
    const [region, setRegion] = useState('');
    const [capitals, setCapitals] = useState([]);
    const [answered, setAnswered] = useState([]);

    const startGame = (region) => {
        setRegion(region);
        setCapitals(service.capitals(region));
        return nextQuestion();
    }

    const checkAnswer = (country, answer) => {
        const index = capitals.findIndex(x => Object.keys[0] === country);
        return Object.values(capitals[index])[0] === answer;
    }

    const answerQuestion = (country, answer) => {
        const isCorrect = checkAnswer(country, answer);
        setAnswered(answered.concat(answer));
        if (isCorrect) {
            setScore(score + 1);
        }
        return isCorrect;
    }

    const nextQuestion = () => {
        const capitalsLeft = capitals.filter(x => !answered.includes(Object.values(x)[0]));
        const question = service.generateQuestion(region, capitalsLeft);
        console.log(question)
        return question;
    }

    return (
        <CapitalsQuizContext.Provider value={{ capitals, startGame, answerQuestion, nextQuestion }}>
            {children}
        </CapitalsQuizContext.Provider>
    )
}