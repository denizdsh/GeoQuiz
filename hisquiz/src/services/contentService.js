import { Age } from "../enums/Age";
import { Game } from "../enums/Game";
/**
 * @param {Age[keyof typeof Age]} age
 */
const getAgeDetails = (age) => ({
  title: age,
  image: `/images/ages/${age}.webp`,
  link: `/${age}`,
});

/**
 * @param {Age[keyof typeof Age]} age
 */
const getTrivia = (age) => ({
  game: Game.TRIVIA,
  title: "Trivia",
  image: `/images/trivia.webp`,
  link: `/${age}/trivia`,
});

export const availableAges = Object.values(Age);
export const ages = availableAges.map((a) => getAgeDetails(a));
// TODO: Add actual trivia games content
export const games = {
  [Age.ALL]: [
    getTrivia(Age.ALL),
    {
      game: Game.ARTEFACTS,
      title: "Artefacts",
      image: "/images/artefacts/preview.webp",
      link: `/${Age.ALL}/artefacts`,
    },
  ],
  [Age.EGYPT]: [getTrivia(Age.EGYPT)],
  [Age.GREECE]: [getTrivia(Age.GREECE)],
  [Age.ROME]: [getTrivia(Age.ROME)],
  [Age.MIDDLE]: [getTrivia(Age.MIDDLE)],
  [Age.EXPLORATION]: [getTrivia(Age.EXPLORATION)],
  [Age.RENAISSANCE]: [getTrivia(Age.RENAISSANCE)],
  [Age.EDO]: [getTrivia(Age.EDO)],
  [Age.MODERN]: [
    getTrivia(Age.MODERN),
    {
      game: Game.FLAGS,
      title: "Flags",
      image: "/images/world/flags.png",
      link: `/${Age.MODERN}/flags`,
    },
    {
      game: Game.CAPITALS,
      title: "Capitals",
      image: "/images/world/capitals.png",
      link: `/${Age.MODERN}/capitals`,
    },
  ],
};

/**
 * @param {Age[keyof typeof Age]} age
 * @param {Game[keyof typeof Game]} game
 */
export function getGame(age, game) {
  return games[age]?.find((g) => g.game === game);
}
