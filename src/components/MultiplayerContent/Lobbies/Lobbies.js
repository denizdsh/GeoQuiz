import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useState, useEffect, useContext, useRef } from "react"
import { MultiplayerContext } from "../../../contexts/MultiplayerContext"

import './Lobbies.css'
import Button from "../../Common/Button"
import Loader from "../../Common/Loader"


export default function Lobbies() {
    const navigate = useNavigate();
    const { lobbies } = useContext(MultiplayerContext);
    const [displayLobbies, setDisplayLobbies] = useState(null);
    const [selectedLobbyName, setSelectedLobbyName] = useState(null);
    const [page, setPage] = useState(1);
    const searchBarRef = useRef(null);

    useEffect(() => { // real-time lobbies update 
        if (searchBarRef.current && searchBarRef.current.value) {
            searchLobby(searchBarRef.current.value);
            return;
        }

        setDisplayLobbies(lobbies);
    }, [lobbies])

    useEffect(() => { // restart value of selected lobby if not in list
        if (!displayLobbies?.slice(10 * page - 10, 10 * page)
            .some(dl => dl.name === selectedLobbyName)) {
            setSelectedLobbyName(null);
        }
    }, [displayLobbies, page, selectedLobbyName])

    useEffect(() => // update pagination
        setPage((state) => {
            if (state > maxPages)
                return maxPages;

            return state;
        }), [displayLobbies])

    const selectLobbyHandler = (name) => {
        setSelectedLobbyName(name);
    }

    const redirectToLobby = (name) => {
        navigate(`/multiplayer/lobby/${name}/join`);
    }

    const redirectToLobbyByButton = () => {
        if (!selectedLobbyName) {
            window.alert('Please click on lobby to select it or double click on a lobby to join it.');
            return;
        }

        redirectToLobby(selectedLobbyName);
    }

    const redirectToCreateLobby = () => {
        navigate('/multiplayer/create-lobby');
    }

    const paginationHandler = (value) => {
        if (value === 'start') {
            return setPage(1);
        } else if (value === 'end') {
            return setPage(maxPages);
        }

        setPage(page => {
            if (page + value <= 0 || page + value > maxPages)
                return page;

            return page + value;
        });
    }
    const searchLobby = (value) => {
        if (!value) {
            setDisplayLobbies(lobbies);
            return;
        }
        console.log(value);
        setDisplayLobbies(
            lobbies.filter(dl => dl.name.toLocaleLowerCase().includes(value))
        )
    }

    const searchLobbyHandler = (e) => {
        const value = e.target.value.trim().toLocaleLowerCase();
        searchLobby(value);
    }

    const lobbiesArr = displayLobbies?.slice(10 * page - 10, 10 * page) || [];
    const maxPages = Math.ceil(displayLobbies?.length / 10) || 1;
    return (
        <section className="slide absolute lobbies">
            {!displayLobbies && <Loader />}
            <table className="lobbies-table">
                <thead>
                    <tr>
                        <th className="lobbies-table-status">Status</th>
                        <th className="lobbies-table-name">Lobby name</th>
                        <th className="lobbies-table-players">Players</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        lobbiesArr.length > 0
                            ? lobbiesArr.map((lobby) =>
                                <tr key={lobby.name}
                                    className={`lobbies-item${selectedLobbyName === lobby.name ? ' lobbies-selected' : ''}`}
                                    onClick={() => selectLobbyHandler(lobby.name)}
                                    onDoubleClick={() => redirectToLobby(lobby.name)}>
                                    <td className="lobbies-status">
                                        {lobby.password && <FontAwesomeIcon icon="fa-solid fa-lock" title="This lobby has a password" className="yellow" style={{ marginRight: '0.5rem' }} />}
                                        {lobby.inGame
                                            ? <FontAwesomeIcon icon="fa-solid fa-xmark" title="This lobby is currently in-game and cannot be joined" className="red" />
                                            : <FontAwesomeIcon icon="fa-solid fa-check" title="You can join this lobby!" className="green" />
                                        }
                                    </td>
                                    <td className="lobbies-name">{lobby.name}</td>
                                    <td>{lobby.players ? Object.keys(lobby.players).length : 0}</td>
                                </tr>)
                            : <tr className="lobbies-item">
                                <td>-</td>
                                <td>{displayLobbies ? 'No lobbies found' : 'Loading...'}</td>
                                <td>-</td>
                            </tr>
                    }
                    {
                        lobbiesArr.length < 10
                        && [0, 0, 0, 0, 0, 0, 0, 0, 0].slice(0, 10 - lobbiesArr.length).map((x, i) =>
                            <tr className="empty-table-row" key={'empty-' + i}>
                                <td>|</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <article className="lobbies-actions">
                <article className="lobbies-actions-left">
                    <div className="lobbies-search-bar-container">
                        <FontAwesomeIcon className="lobbies-search-bar-icon" icon="fa-solid fa-magnifying-glass" />
                        <input onChange={searchLobbyHandler} ref={searchBarRef} type="text" className="lobbies-search-bar" placeholder="Search lobbies.." />
                    </div>
                    <Button className="lobbies-action lobbies-join" onClick={redirectToLobbyByButton}>Join lobby</Button>
                </article>
                <article className="lobbies-actions-right">
                    <article className="lobbies-pagination">
                        <Button className="lobbies-pagination-button" onClick={() => paginationHandler('start')}>
                            <FontAwesomeIcon icon="fa-solid fa-angles-left" />
                        </Button>
                        <Button className="lobbies-pagination-button lobbies-pagination-button-back" onClick={() => paginationHandler(-1)}>
                            <FontAwesomeIcon icon="fa-solid fa-angle-left" />
                        </Button>
                        <p className="lobbies-pagination-text">
                            {page}/{maxPages}
                        </p>
                        <Button className="lobbies-pagination-button lobbies-pagination-button-forward" onClick={() => paginationHandler(1)}>
                            <FontAwesomeIcon icon="fa-solid fa-angle-right" />
                        </Button>
                        <Button className="lobbies-pagination-button" onClick={() => paginationHandler('end')}>
                            <FontAwesomeIcon icon="fa-solid fa-angles-right" />
                        </Button>
                    </article>
                    <Button className="lobbies-action lobbies-create" onClick={redirectToCreateLobby}>Create lobby</Button>
                </article>
            </article>
        </section >
    )
}