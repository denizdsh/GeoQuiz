import flags from "../assets/flags.json";
import capitals from "../assets/capitals.json";
import artefacts from "../assets/artefacts.json";

import { getRandomElements } from "../helper/util";

// feature can be either condition or imageURL
export function generateQuestion(data, allData) {
  console.log("length ", data.length);
  const random = Math.floor(Math.random() * data.length);
  const dataObject = data[random];
  const feature = Object.keys(dataObject)[0];
  const image = dataObject.image || Object.keys(dataObject)[0];
  const answers = generateAnswers(allData, feature);

  return {
    feature,
    answers,
    image,
    condition: dataObject.image ? feature : Object.values(dataObject)[0],
  };
}

function generateAnswers(data, feature) {
  let filteredData = data;
  const answers = [];

  let answer = data.find((x) => Object.keys(x)[0] === feature)[feature];
  let random = Math.floor(Math.random() * 4);
  filteredData = filteredData.filter((x) => Object.values(x)[0] !== answer);
  answers[random] = answer;

  for (let i = 0; i < 4; i++) {
    if (!answers[i]) {
      random = Math.floor(Math.random() * filteredData.length);
      answer = Object.values(filteredData[random])[0];
      filteredData = filteredData.filter((x) => Object.values(x)[0] !== answer);
      answers[i] = answer;
    }
  }

  return answers;
}

const functions = {
  capitals: capitalsQuiz,
  flags: flagsQuiz,
  artefacts: artefactsQuiz,
};

export function getData(game, getFullData = false) {
  return functions[game](getFullData);
}

const BASE_QUIZ_LENGTH = 20;

function artefactsQuiz() {
  return getRandomElements(artefacts, artefacts.length);
}

function capitalsQuiz(getAll = false) {
  const flat = Object.values(capitals).flat();

  if (getAll) {
    return flat;
  }

  return getRandomElements(flat, BASE_QUIZ_LENGTH);
}

function flagsQuiz(getAll = false) {
  const flat = Object.values(flags).flat();

  if (getAll) {
    return flat;
  }

  return getRandomElements(flat, BASE_QUIZ_LENGTH);
}
