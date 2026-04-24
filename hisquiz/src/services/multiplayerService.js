import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import { Age } from "../enums/Age";

// Firebase init
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_REALTIME_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

// variables
export const LOBBY_MIN_PLAYER_COUNT = 0;
const DEFAULT_LOBBY_NAME = `Lobby-${random(10000)}`;
const DEFAULT_GAME = `/${Age.MODERN}/flags`;
const DEFAULT_GAME_OPTIONS = { showAnswers: false, showStopwatch: true };

export const persistedUsername = window.localStorage.getItem("username");
export const persistedAvatar = window.localStorage.getItem("avatar");

export const lobbiesRef = firebase.database().ref("lobbies");

export const defaultLobby = {
  name: DEFAULT_LOBBY_NAME,
  game: DEFAULT_GAME,
  options: DEFAULT_GAME_OPTIONS,
  players: {},
  inGame: false,
  default: true,
};

export const defaultPlayer = {
  uid: null,
  username: persistedUsername || `Historian-${random(10000)}`,
  avatar: persistedAvatar || getRandomAvatar(), 
  score: 0,
  default: true,
};

//service functions

function random(max = 10) {
  return Math.floor(Math.random() * max);
}

export async function initUser() {
  if (defaultPlayer.uid) {
    console.log("default uid");
    return defaultPlayer.uid;
  }

  try {
    const res = await firebase.auth().signInAnonymously();
    defaultPlayer.uid = res.user.uid;
    return res.user.uid;
  } catch (err) {
    console.error(err.message);
  }
}

export async function getLobbies() {
  try {
    const lobbies = (await lobbiesRef.get()).val();

    if (!lobbies) {
      return [];
    }

    return lobbies;
  } catch (err) {
    console.error(err.message);
    return {};
  }
}

export async function getLobbyByRef(ref) {
  const lobby = (await ref.get()).val();

  if (!lobby) throw new Error("Lobby not found");

  return lobby;
}

export async function createLobby(lobby = defaultLobby) {
  const lobbyRef = lobbiesRef.child(lobby.name);

  if ((await lobbyRef.get()).val()) {
    throw new Error(`There is already a lobby with the name ${lobby.name}.`);
  }

  lobbyRef.set(lobby);

  return lobbyRef;
}

export function addLobby(ls, newLobby) {
  if (!ls) return ls;

  const newLobbies = Object.assign({}, ls);
  newLobbies[newLobby.name] = newLobby;

  return newLobbies;
}

export function removeLobby(ls, name) {
  if (!ls) return ls;

  const newLobbies = Object.assign({}, ls);

  delete newLobbies[name];

  return newLobbies;
}

export async function joinLobby(name, player = defaultPlayer) {
  player.uid = await initUser();

  const lobbyRef = lobbiesRef.child(name);

  const lobby = await getLobbyByRef(lobbyRef);

  if (!lobby) {
    return;
  }

  if (
    Object.values(lobby.players).some((p) => p.username === player.username)
  ) {
    throw new Error(
      "There is already a player in the lobby with that username" +
        " " +
        player.username,
    );
  }

  const players = lobby.players || {};
  players[player.uid] = player;

  lobbyRef.update({ players });

  const currentPlayerRef = lobbyRef.child(`players/${player.uid}`);
  currentPlayerRef.onDisconnect().remove();
}

export async function startGame(lobbyName) {
  const lobbyRef = firebase.database().ref(`lobbies/${lobbyName}`);

  const lobby = await getLobbyByRef(lobbyRef);

  // double check with real-time data
  if (
    lobby.default ||
    !lobby.players ||
    Object.keys(lobby.players).length < LOBBY_MIN_PLAYER_COUNT
  ) {
    throw new Error("Lobby must have at least 2 players to start the game");
  }

  lobby.inGame = true;
  lobbyRef.update({ inGame: true });

  return lobby;
}

export function updateScore(lobbyName, playerUID, score) {
  firebase
    .database()
    .ref(`lobbies/${lobbyName}/players/${playerUID}`)
    .update({ score });
}

// public functions
export function getRandomAvatar() {
  return `https://api.dicebear.com/8.x/pixel-art/svg?seed=${random(1000)}`;
}

export async function getLobbyByName(name) {
  try {
    console.log(name);
    const ref = firebase.database().ref(`lobbies/${name}`);

    const lobby = (await ref.get()).val();

    if (!lobby) throw new Error("Lobby not found");

    return lobby;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

export { firebase };