import { createContext, useState, useEffect, useCallback } from 'react';
import * as multiplayer from '../services/multiplayerService';

export const MultiplayerContext = createContext();

export function MultiplayerProvider({ children }) {
    const [lobbies, setLobbies] = useState(null);
    const [lobby, setLobby] = useState(multiplayer.defaultLobby);

    const [player, setPlayer] = useState(multiplayer.defaultPlayer);

    const [username, setUsername] = useState(multiplayer.persistedUsername ? multiplayer.persistedUsername : '');

    const [avatar, setAvatar] = useState(multiplayer.persistedAvatar || multiplayer.defaultPlayer.avatar);
    const [avatarHistory, setAvatarHistory] = useState([avatar || player.avatar]);

    const resetLobby = () => {
        setLobby(multiplayer.defaultLobby);
        console.log('reset lobby');
    }

    const resetPlayer = () => {
        setPlayer(multiplayer.defaultPlayer);
        console.log('reset player');
    }

    const resetStates = () => {
        resetLobby();
        resetPlayer();
    }

    useEffect(() => { // connect when context is active and disconnect when not 
        multiplayer.firebase.database().goOnline();
        console.log('ACTIVATED MULTIPLAYER (ON)');

        return () => {
            multiplayer.firebase.database().goOffline();
            console.log('DISABLED MULTIPLAYER (OFF)');
        }
    }, [])

    useEffect(() => { // sign in anonimously  
        // auth listener 
        const authUnsubscribeFn = multiplayer.firebase.auth().onAuthStateChanged(user => {
            if (user) {
                multiplayer.defaultPlayer.uid = user.uid;

                setPlayer(p => {
                    const newPlayer = Object.assign({}, p || multiplayer.defaultPlayer);
                    newPlayer.uid = user.uid;

                    return newPlayer;
                });

                console.log('anonymous user', multiplayer.defaultPlayer.uid.substring(0, 5));
            }
        });

        // sign in and provoke listner
        (async () => {
            console.log('signing in...');
            await multiplayer.initUser();
        })();

        return () => { // clear listener 
            authUnsubscribeFn();
            console.log('clear auth listener');
        };
    }, [])

    useEffect(() => { // load lobbies and add lobby listeners 
        // load lobbies
        (async () => {
            setLobbies(await multiplayer.getLobbies());
        })();

        const onLobbyAdded = multiplayer.lobbiesRef.on('child_added', (snapshot) => {
            const newLobby = snapshot.val();

            setLobbies(ls => multiplayer.addLobby(ls, newLobby));
        })

        const onLobbyRemoved = multiplayer.lobbiesRef.on('child_removed', (snapshot) => {
            const name = snapshot.val().name;

            setLobbies(ls => {
                const newLobbies = multiplayer.removeLobby(ls, name);

                if (!Object.hasOwn(newLobbies, lobby.name)) {
                    setLobby(multiplayer.defaultLobby);
                }

                return newLobbies;
            });
        })

        const onLobbyUpdated = multiplayer.lobbiesRef.on('child_changed', (snapshot) => {
            const changedLobby = snapshot.val();

            setLobbies(ls => {
                const withoutChanged = multiplayer.removeLobby(ls, changedLobby.name);
                const newLobbies = multiplayer.addLobby(withoutChanged, changedLobby);

                if (Object.hasOwn(newLobbies, lobby.name)) {
                    setLobby(changedLobby);
                }

                return newLobbies;
            })
        })

        return () => {
            multiplayer.lobbiesRef.off('child_added', onLobbyAdded);
            multiplayer.lobbiesRef.off('child_removed', onLobbyRemoved);
            multiplayer.lobbiesRef.off('child_changed', onLobbyUpdated);

            console.log('clear lobby listeners')
        }
    }, [lobby.name])

    const createPlayer = useCallback(async (join = true, additionalDataKVPs = []) => {
        const newUsername = (username || multiplayer.defaultPlayer.username).trim();

        if (newUsername.length > 15) {
            throw new Error('Username cannot exceed 15 characters');
        }

        const newPlayer = {
            uid: await multiplayer.initUser(),
            username: newUsername,
            avatar: avatar || multiplayer.defaultPlayer.avatar,
            score: 0
        };

        for (const kvp of additionalDataKVPs) { // add additional props to player object (admin: true; etc)
            newPlayer[kvp[0]] = kvp[1];
        }

        setPlayer(newPlayer);
        window.localStorage.setItem('username', newPlayer.username);
        window.localStorage.setItem('avatar', newPlayer.avatar);

        if (join && !lobby.default)
            await multiplayer.joinLobby(lobby.name, newPlayer);

        return newPlayer;
    }, [username, avatar, lobby.name, lobby.default])

    const createLobby = useCallback(async (lobbyData) => {
        const lobbyOwner = await createPlayer(false, [['admin', true]]);

        const name = (lobbyData.name || multiplayer.defaultLobby.name).trim();

        if (name.length > 15) {
            throw new Error('Lobby name cannot exceed 15 characters')
        }

        const newLobby = {
            name,
            game: lobbyData.game || multiplayer.defaultLobby.game,
            options: lobbyData.options,
            players: { [lobbyOwner.uid]: lobbyOwner },
            inGame: false
        };

        const lobbyRef = await multiplayer.createLobby(newLobby);

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
                || !lobby.players || Object.keys(lobby.players).length < multiplayer.LOBBY_MIN_PLAYER_COUNT) {
                throw new Error('Lobby must have at least 2 players to start the game');
            }

            const l = await multiplayer.startGame(lobby.name); // function returns current state of lobby
            setLobby(l);
        } catch (err) {
            window.alert(err.message);
        }
    }, [player.default, player.uid, lobby.default, lobby.name, lobby.players])

    const updateScore = useCallback((score) => {
        multiplayer.updateScore(lobby.name, player.uid, score);
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