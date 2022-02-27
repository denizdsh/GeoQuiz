import { createContext, useState, createElement } from "react";

import * as service from '../services/quizService'

export const QuizContext = createContext();

export function QuizProvider({ children }) {
    const [game, setGame] = useState('');
    const [score, setScore] = useState(0);
    const [data, setData] = useState([]);
    const [answered, setAnswered] = useState([]);
    const [images, setImages] = useState([]);

    //preload images for quick response in quizes
    const loadImages = (game, data) => {
        const url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_URL : 'http://localhost:3000';

        let imgs = [];
        if (game === 'capitals') {
            data.forEach(x => {
                let name = Object.keys(x)[0];

                let img = new Image();
                img.src = x.image;

                imgs.push({
                    image: createElement('img', { src: img.src, className: 'game-img', alt: name, loading: 'lazy' }),
                    name
                })
            })
        } else {
            data.forEach(x => {
                let img = new Image();
                img.src = Object.keys(x)[0];

                imgs.push({
                    image: createElement('img', { src: img.src, className: 'game-img', alt: 'FLAG' }),
                    name: Object.values(x)[0]
                })
            })
        }
        setImages(imgs);
        return imgs;
    }

    const startGame = (game, region) => {
        setGame(game);
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
        if (isCorrect) {
            setScore(score + 1);
        }
        return [isCorrect, correct];
    }

    const nextQuestion = (feature, allData = data, imgs = images) => {
        const dataLeft = allData.filter(x => !answered.includes(Object.keys(x)[0]) & feature !== Object.keys(x)[0])
        const question = service.generateQuestion(dataLeft, allData);
        question.image = imgs.find(x => x.name === question.country).image
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