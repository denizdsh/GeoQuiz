import { useContext, useEffect } from "react"
import { Navigate, useParams } from "react-router-dom"
import Loader from "../components/Common/Loader"
import { getLobbyByName, MultiplayerContext } from "../contexts/MultiplayerContext"

export const isInLobby = (Component) => {
    const WrapperComponent = (props) => {
        const { lobby, player, setLobby } = useContext(MultiplayerContext);
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
                : lobby.players && lobby.players.hasOwnProperty(player.uid)
                    ? <Component {...props} />
                    : <Navigate to={`/multiplayer/lobby/${name}/join`} replace={true} />
        )
    }
    return WrapperComponent;
}

export const isNotInLobby = (Component) => {
    const WrapperComponent = (props) => {
        const { lobby, player, setLobby } = useContext(MultiplayerContext);
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
                : lobby.players && lobby.players.hasOwnProperty(player.uid)
                    ? <Navigate to={`/multiplayer/lobby/${name}`} replace={true} />
                    : <Component {...props} />
        )
    }
    return WrapperComponent;
} 