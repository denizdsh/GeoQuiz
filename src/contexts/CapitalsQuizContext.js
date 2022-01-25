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
        const capitalsData = service.capitals(region);
        setCapitals(capitalsData);
        return nextQuestion('', capitalsData);
    }

    const checkAnswer = (country, answer) => {
        return capitals.find(x => Object.keys(x)[0] === country)[country] === answer;
    }

    const answerQuestion = (country, answer) => {
        setAnswered(answered.concat(country));
        const isCorrect = checkAnswer(country, answer);
        if (isCorrect) {
            setScore(score + 1);
        }
        return isCorrect;
    }

    const nextQuestion = (country, capitalsData = capitals) => {
        console.log(answered.concat(country));
        const capitalsLeft = capitalsData.filter(x => !answered.includes(Object.keys(x)[0]) & country !== Object.keys(x)[0]);
        const question = service.generateQuestion(capitalsLeft, capitals.length > 0 ? capitals : capitalsData);
        return question;
    }

    return (
        <CapitalsQuizContext.Provider value={{ capitals, startGame, answerQuestion, nextQuestion, score }}>
            {children}
        </CapitalsQuizContext.Provider>
    )
}