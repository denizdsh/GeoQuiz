import { createContext, useState, useEffect, useCallback } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';

// THIS FILE ACTS AS A SERVICE AND CONTEXT (AND PROVIDER)

// Firebase init
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "gamegeoquiz.web.app",
    databaseURL: process.env.REACT_APP_FIREBASE_REALTIME_DATABASE_URL,
    projectId: "gamegeoquiz",
    storageBucket: "gamegeoquiz.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

// variables
const LOBBY_MIN_PLAYER_COUNT = 0;

const persistedUsername = window.localStorage.getItem('username');
const persistedAvatar = window.localStorage.getItem('avatar');

const lobbiesRef = firebase.database().ref('lobbies');

export const defaultLobby = {
    name: `Lobby-${random()}${random()}${random()}${random()}`,
    game: '/europe/flags',
    password: '',
    options: { showAnswers: true, showStopwatch: true },
    players: {},
    inGame: false,
    default: true
}

const defaultPlayer = {
    uid: null,
    username: persistedUsername || `Geographer-${random()}${random()}${random()}${random()}`,
    avatar: persistedAvatar || getRandomAvatar(),
    score: 0,
    default: true
};

// private functions
function random(max = 10) {
    return Math.floor(Math.random() * max);
}

async function initUser() {
    if (defaultPlayer.uid) {
        console.log('default uid');
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

async function getLobbies() {
    try {
        const lobbies = (await lobbiesRef.get()).val();

        if (!lobbies) {
            return [];
        }

        return lobbies;
    } catch (err) {
        console.error(err.message)
        return {};
    }
}

async function getLobbyByRef(ref) {
    const lobby = (await ref.get()).val();

    if (!lobby)
        throw new Error('Lobby not found');

    return lobby;
}

async function createLobbyFn(lobby = defaultLobby) {
    const lobbyRef = lobbiesRef.child(lobby.name);

    if ((await lobbyRef.get()).val()) {
        throw new Error(`There is already a lobby with the name ${lobby.name}.`)
    }

    lobbyRef.set(lobby);

    return lobbyRef;
}

function addLobby(ls, newLobby) {
    if (!ls) return ls;

    const newLobbies = Object.assign({}, ls);
    newLobbies[newLobby.name] = newLobby;

    return newLobbies;
}

function removeLobby(ls, name) {
    if (!ls) return ls;

    const newLobbies = Object.assign({}, ls);

    delete newLobbies[name];

    return newLobbies;
}

async function joinLobby(name, player = defaultPlayer) {
    player.uid = await initUser();

    const lobbyRef = lobbiesRef.child(name);

    const lobby = await getLobbyByRef(lobbyRef);

    if (!lobby) {
        return;
    }

    if (Object.values(lobby.players).some(p => p.username === player.username)) {
        throw new Error('There is already a player in the lobby with that username' + ' ' + player.username)
    }

    const players = lobby.players || {};
    players[player.uid] = player;

    lobbyRef.update({ players })

    const currentPlayerRef = lobbyRef.child(`players/${player.uid}`);
    currentPlayerRef.onDisconnect().remove();
}

async function startGameFn(lobbyName) {
    const lobbyRef = firebase.database().ref(`lobbies/${lobbyName}`);

    const lobby = await getLobbyByRef(lobbyRef);

    // double check with real-time data
    if (lobby.default
        || !lobby.players || Object.keys(lobby.players).length < LOBBY_MIN_PLAYER_COUNT) {
        throw new Error('Lobby must have at least 2 players to start the game');
    }

    lobby.inGame = true;
    lobbyRef.update({ inGame: true });

    return lobby;
}

function updateScoreFn(lobbyName, playerUID, score) {
    firebase.database().ref(`lobbies/${lobbyName}/players/${playerUID}`).update({ score });
}

// public functions
export function getRandomAvatar() {
    return `https://avatars.dicebear.com/api/pixel-art/${random(1000)}.svg`;
}

export async function getLobbyByName(name) {
    try {
        console.log(name)
        const ref = firebase.database().ref(`lobbies/${name}`);

        const lobby = (await ref.get()).val();

        if (!lobby)
            throw new Error('Lobby not found');

        return lobby;
    } catch (err) {
        console.error(err.message)
        throw err;
    }
}

// context
export const MultiplayerContext = createContext();

export function MultiplayerProvider({ children }) {
    const [lobbies, setLobbies] = useState(null);
    const [lobby, setLobby] = useState(defaultLobby);

    const [player, setPlayer] = useState(defaultPlayer);

    const [username, setUsername] = useState(persistedUsername ? persistedUsername : '');

    const [avatar, setAvatar] = useState(persistedAvatar || defaultPlayer.avatar);
    const [avatarHistory, setAvatarHistory] = useState([avatar || player.avatar]);

    const [questions, setQuestions] = useState([]);


    const resetLobby = () => {
        setLobby(defaultLobby);
        console.log('reset lobby');
    }

    const resetPlayer = () => {
        setPlayer(defaultPlayer);
        console.log('reset player');
    }

    const resetStates = () => {
        resetLobby();
        resetPlayer();

        setQuestions([]);
    }

    useEffect(() => { // connect when context is active and disconnect when not 
        firebase.database().goOnline();
        console.log('ACTIVATED MULTIPLAYER (ON)');

        return () => {
            firebase.database().goOffline();
            console.log('DISABLED MULTIPLAYER (OFF)');
        }
    }, [])

    useEffect(() => { // sign in anonimously  
        // auth listener 
        const authUnsubscribeFn = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                defaultPlayer.uid = user.uid;

                setPlayer(p => {
                    const newPlayer = Object.assign({}, p || defaultPlayer);
                    newPlayer.uid = user.uid;

                    return newPlayer;
                });

                console.log('anonymous user', defaultPlayer.uid.substring(0, 5));
            }
        });

        // sign in and provoke listner
        (async () => {
            console.log('signing in...');
            await initUser();
        })();

        return () => { // clear listener 
            authUnsubscribeFn();
            console.log('clear auth listener');
        };
    }, [])

    useEffect(() => { // load lobbies and add lobby listeners 
        // load lobbies
        (async () => {
            setLobbies(await getLobbies());
        })();

        const onLobbyAdded = lobbiesRef.on('child_added', (snapshot) => {
            const newLobby = snapshot.val();

            setLobbies(ls => addLobby(ls, newLobby));
        })

        const onLobbyRemoved = lobbiesRef.on('child_removed', (snapshot) => {
            const name = snapshot.val().name;

            setLobbies(ls => {
                const newLobbies = removeLobby(ls, name);

                if (!newLobbies.hasOwnProperty(lobby.name)) {
                    setLobby(defaultLobby);
                }

                return newLobbies;
            });
        })

        const onLobbyUpdated = lobbiesRef.on('child_changed', (snapshot) => {
            const changedLobby = snapshot.val();

            setLobbies(ls => {
                const withoutChanged = removeLobby(ls, changedLobby.name);
                const newLobbies = addLobby(withoutChanged, changedLobby);

                if (newLobbies.hasOwnProperty(lobby.name)) {
                    setLobby(changedLobby);
                }

                return newLobbies;
            })
        })

        return () => {
            lobbiesRef.off('child_added', onLobbyAdded);
            lobbiesRef.off('child_removed', onLobbyRemoved);
            lobbiesRef.off('child_changed', onLobbyUpdated);

            console.log('clear lobby listeners')
        }
    }, [lobby.name])

    const createPlayer = useCallback(async (join = true, additionalDataKVPs = []) => {
        const newUsername = (username || defaultPlayer.username).trim();

        if (newUsername.length > 15) {
            throw new Error('Username cannot exceed 15 characters');
        }

        const newPlayer = {
            uid: await initUser(),
            username: newUsername,
            avatar: avatar || defaultPlayer.avatar,
            score: 0
        };

        for (const kvp of additionalDataKVPs) { // add additional props to player object (admin: true; etc)
            newPlayer[kvp[0]] = kvp[1];
        }

        setPlayer(newPlayer);
        window.localStorage.setItem('username', newPlayer.username);
        window.localStorage.setItem('avatar', newPlayer.avatar);

        if (join && !lobby.default)
            await joinLobby(lobby.name, newPlayer);

        return newPlayer;
    }, [username, avatar, lobby.name, lobby.default])

    const createLobby = useCallback(async (lobbyData) => {
        const lobbyOwner = await createPlayer(false, [['admin', true]]);

        const name = (lobbyData.name || defaultLobby.name).trim();

        if (name.length > 15) {
            throw new Error('Lobby name cannot exceed 15 characters')
        }

        const newLobby = {
            name,
            game: lobbyData.game || defaultLobby.game,
            password: lobbyData.password || defaultLobby.password,
            options: lobbyData.options,
            players: { [lobbyOwner.uid]: lobbyOwner },
            inGame: false
        };

        const lobbyRef = await createLobbyFn(newLobby);

        setLobby(newLobby);

        // delete lobby when owner of lobby disconnects
        lobbyRef.onDisconnect().remove();

        return newLobby;
    }, [createPlayer])

    const startGame = useCallback(async () => {
        try {
            if (player.default || !lobby.players[player.uid].admin) {
                throw new Error('You are not authorized to start this game');
            }

            if (lobby.default
                || !lobby.players || Object.keys(lobby.players).length < LOBBY_MIN_PLAYER_COUNT) {
                throw new Error('Lobby must have at least 2 players to start the game');
            }

            const l = await startGameFn(lobby.name); // function returns current state of lobby
            setLobby(l);
        } catch (err) {
            window.alert(err.message);
        }
    }, [player.default, player.uid, lobby.default, lobby.name, lobby.players])

    const updateScore = useCallback((score) => {
        updateScoreFn(lobby.name, player.uid, score);
    }, [lobby, player])

    return (
        <MultiplayerContext.Provider value={{
            lobbies: lobbies ? Object.values(lobbies) : null,
            lobby, setLobby, createLobby, startGame, updateScore,
            player, setPlayer, createPlayer,
            username, setUsername, avatar, setAvatar,
            avatarHistory, setAvatarHistory,
            resetLobby, resetPlayer, resetStates
        }}>
            {children}
        </MultiplayerContext.Provider>
    )
}