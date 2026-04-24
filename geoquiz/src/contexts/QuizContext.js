import { createContext, useState, createElement } from "react";

import * as service from '../services/quizService'

export const QuizContext = createContext();

export function QuizProvider({ children }) {
    const [score, setScore] = useState(0);
    const [data, setData] = useState([]);
    const [answered, setAnswered] = useState([]);
    const [images, setImages] = useState([]);

    //preload images for quick response in quizes
    const loadImages = (game, data) => {
        let imgs = {};
        if (game === 'capitals') {
            for (const x of data) {
                let name = Object.keys(x)[0];

                let img = new Image();
                img.src = x.image;

                imgs[name] = createElement('img', { src: img.src, className: 'game-img', alt: name, loading: 'lazy', draggable: 'false' });
            }
        } else {
            for (const x of data) {
                let img = new Image();
                img.src = Object.keys(x)[0];

                imgs[Object.values(x)[0]] = createElement('img', { src: img.src, className: 'game-img', alt: 'FLAG', loading: 'lazy', draggable: 'false' })
            }
        }
        setImages(imgs);
        return imgs;
    }

    const startGame = (game, region) => {
        const allData = service.getData(game, region);
        const imgs = loadImages(game, allData);
        setData(allData);

        return nextQuestion('', allData, imgs);
    }

    // feature can be either country or imageURL
    const checkAnswer = (feature, answer) => {
        let correct = data.find(x => Object.keys(x)[0] === feature)[feature]
        return [correct === answer, correct];
    }

    const answerQuestion = (feature, answer) => {
        setAnswered(answered.concat(feature));
        const [isCorrect, correct] = checkAnswer(feature, answer);

        let newScore = score;
        if (isCorrect) {
            newScore++;
            setScore(s => {
                const ns = s + 1;
                newScore = ns;
                return ns;
            });
        }
        return [isCorrect, correct, newScore];
    }

    const nextQuestion = (feature, allData = data, imgs = images) => {
        const dataLeft = allData.filter(x => !answered.includes(Object.keys(x)[0]) & feature !== Object.keys(x)[0])
        const question = service.generateQuestion(dataLeft, allData);
        question.image = imgs[question.country];
        console.log(question)
        return question;
    }

    const questionsLeft = data.length - answered.length;

    return (
        <QuizContext.Provider value={{ data, startGame, answerQuestion, nextQuestion, score, questionsLeft }}>
            {children}
        </QuizContext.Provider>
    )
}