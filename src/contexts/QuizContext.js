import { createContext, useState } from "react";

import * as service from '../services/quizService'

export const QuizContext = createContext();

export function QuizProvider({ children }) {
    const [game, setGame] = useState('');
    const [score, setScore] = useState(0);
    const [data, setData] = useState([]);
    const [answered, setAnswered] = useState([]);

    const startGame = (game, region) => {
        setGame(game);

        const allData = service.getData(game, region);
        setData(allData);

        return nextQuestion('', allData);
    }

    // feature can be either country or imageURL
    const checkAnswer = (feature, answer) => {
        let correct = data.find(x => Object.keys(x)[0] === feature)[feature]
        return [correct === answer, correct];
    }

    const answerQuestion = (feature, answer) => {
        setAnswered(answered.concat(feature));
        const [isCorrect, correct] = checkAnswer(feature, answer);
        if (isCorrect) {
            setScore(score + 1);
        }
        return [isCorrect, correct];
    }

    const nextQuestion = (feature, allData = data) => {
        const dataLeft = allData.filter(x => !answered.includes(Object.keys(x)[0]) & feature !== Object.keys(x)[0])
        const question = service.generateQuestion(dataLeft, allData);
        console.log(question)
        return question;
    }

    const questionsLeft = data.length - answered.length;

    return (
        <QuizContext.Provider value={{ capitals: data, startGame, answerQuestion, nextQuestion, score, questionsLeft }}>
            {children}
        </QuizContext.Provider>
    )
}