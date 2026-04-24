import { useEffect } from "react"
import { Navigate, useParams } from "react-router-dom"
import { useMultiplayer } from "../hooks/useMultiplayer"
import { getLobbyByName } from "../services/multiplayerService"
import Loader from "../components/Common/Loader"

export const isInLobby = (Component) => {
    const WrapperComponent = (props) => {
        const { lobby, player, setLobby } = useMultiplayer();
        const { name } = useParams();

        useEffect(() => {
            if (lobby.default)
                (async () => {
                    const l = await getLobbyByName(name);
                    setLobby(l);
                })()
        }, [name, lobby, setLobby])
        return (
            lobby.default
                ? <Loader />
                : lobby.players && Object.hasOwn(lobby.players, player.uid)
                    ? <Component {...props} />
                    : <Navigate to={`/multiplayer/lobby/${name}/join`} replace={true} />
        )
    }
    return WrapperComponent;
}

export const isNotInLobby = (Component) => {
    const WrapperComponent = (props) => {
        const { lobby, player, setLobby } = useMultiplayer();
        const { name } = useParams();

        useEffect(() => {
            if (lobby.default)
                (async () => {
                    const l = await getLobbyByName(name);
                    setLobby(l);
                })()
        }, [name, lobby, setLobby])

        return (
            lobby.default
                ? <Loader />
                : lobby.players && Object.hasOwn(lobby.players, player.uid)
                    ? <Navigate to={`/multiplayer/lobby/${name}`} replace={true} />
                    : <Component {...props} />
        )
    }
    return WrapperComponent;
} 