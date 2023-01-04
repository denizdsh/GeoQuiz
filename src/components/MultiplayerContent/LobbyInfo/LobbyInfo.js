import { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { MultiplayerContext } from '../../../contexts/MultiplayerContext';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { regions, games } from '../../../services/contentService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GameCard from '../../GameCard/GameCard';
import Button from '../../Common/Button';
import GameOptions from '../../GameOptions/GameOptions';
import Loader from '../../Common/Loader';
import styles from './LobbyInfo.module.css';

const defaultGame = { title: '', link: '' };
const defaultRegion = { title: '', link: '' };

export default function LobbyInfo({ isCreate = false, disabled = false }) {
    const navigate = useNavigate();

    const { player, lobby, createLobby, startGame } = useContext(MultiplayerContext);
    const { translate } = useContext(LanguageContext);

    const sliderRef = useRef(null);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [options, setOptions] = useState({ showAnswers: true, showStopwatch: true });

    const [region, setRegion] = useState(defaultRegion);  // #region MAIN REGION (NOT SUBREGION) 
    const [game, setGame] = useState(defaultGame);
    const [index, setIndex] = useState(0);

    const [transition, setTransition] = useState(false);
    const [height, setHeight] = useState('auto');

    useEffect(() => {
        if (isCreate || !lobby.game) {
            return;
        }

        // set region and game
        const r = {}, g = {};

        const regionPathname = lobby.game.slice(1).split('/')[0];

        r.link = '/' + regionPathname;
        r.title = regions.find(xr => xr.link === r.link).title;

        g.link = lobby.game;
        const gameInRegionIndex = games[regionPathname].findIndex(xg => xg.link === g.link);
        g.title = games[regionPathname][gameInRegionIndex].title;

        setRegion(r);
        setGame(g);

        // set index so no matter how deep the selected game is within a region, it is visible upon load
        let i = 0;
        let pos = gameInRegionIndex + 1;

        while (pos - 3 >= 1) {
            pos -= 3;
            i++;
        }

        setIndex(i);

    }, [isCreate, lobby.game])

    useEffect(() => {
        if (!transition)
            return;

        const timeout = setTimeout(() => {
            setTransition(false);
            clearTimeout(timeout);
        }, 400);
    }, [transition])

    const handle = (fn) => {
        if (!lobby.default || disabled) {
            return;
        }

        fn();
    }

    const setLobbyData = (e, setFn) => {
        if (!isCreate)
            return;

        setFn(e.target.value);
    }

    const setNameHandler = (e) => {
        handle(() =>
            setLobbyData(e, setName)
        );
    }

    const setPasswordHandler = (e) => {
        handle(() =>
            setLobbyData(e, setPassword)
        );
    }

    const getJoinLink = useCallback(() => `${window.location.origin}/multiplayer/lobby/${lobby.name}/join`, [lobby.name]);

    const gameText = () => {
        if (!isCreate && lobby.default)
            return 'Game';

        let text = 'Game - ' + (region.title ? `${region.title}, ` : 'choose region');

        if (region.title)
            text += game.title ? game.title : 'choose game';

        return text;
    }

    const sliderHandler = (value) => {
        handle(() =>
            setIndex(i => {
                const newIndex = i + value;

                if (newIndex < 0 || newIndex >= maxIndex)
                    return i;

                return newIndex;
            })
        );
    }

    const transitionHandler = () => {
        if (height === 'auto') {
            setHeight(sliderRef.current.offsetHeight);

            const timeout = setTimeout(() => {
                setHeight('auto');
                clearTimeout(timeout);
            }, 1000);
        }

        setTransition(true);
    }

    const setGameHandler = (game) => {
        handle(() =>
            setGame({ title: game.title, link: game.link })
        );
    }

    const setRegionHandler = (region) => {
        handle(() => {
            transitionHandler();

            setIndex(0);
            setRegion({
                title: region.title, link: region.link
            })
        });
    }

    const returnToRegionHandler = () => {
        handle(() => {
            transitionHandler();

            setIndex(0);
            setRegion(defaultRegion);
            setGame(defaultGame);
        });
    }

    const copyToClipboardHandler = () => {
        navigator.clipboard.writeText(getJoinLink())
            .then(() => {
                console.log('Copied to clipboard');
            }, () => {
                window.alert('Couldn\'t copy to clipboard')
            });
    }

    const switchShowAnswersHandler = () => {
        handle(() => {
            setOptions(o => {
                const newOptions = Object.assign({}, o);
                newOptions.showAnswers = !newOptions.showAnswers;

                return newOptions;
            });
        });
    }
    const switchShowStopwatchHandler = () => {
        handle(() => {
            setOptions(o => {
                const newOptions = Object.assign({}, o);
                newOptions.showStopwatch = !newOptions.showStopwatch;

                return newOptions;
            });
        });
    }

    const createLobbyHandler = async () => {
        if (!game.link) {
            window.alert('Please select game type first')
            return;
        }

        try {
            const newLobby = await createLobby({
                name: name.trim(),
                password: password.trim(),
                game: game.link,
                options
            });

            navigate(`/multiplayer/lobby/${newLobby.name}`, { replace: true });
        } catch (err) {
            return alert(err.message);
        }
    }

    const startGameHandler = async () => {
        await startGame();
    }

    const maxIndex = (region.link ? games[region.link.slice(1)].length : regions.length) - 2;

    const LinkContainer = () => <div className={styles.linkContainer}>
        <input type="text" className={`${styles.input} ${styles.link}`} disabled
            value={getJoinLink()} />
        <label title={translate('Copy to clipboard', 'misc')}>
            <Button onClick={copyToClipboardHandler} className={styles.copy}>
                <FontAwesomeIcon icon="fa-solid fa-copy" />
            </Button>
        </label>
    </div>;

    return (
        <section className={styles.actionContainer}>
            <section className={styles.container}>
                <article className={styles.inputsContainer}>
                    <article className={styles.nameContainer}>
                        <h2>Name</h2>
                        {(!isCreate && lobby.default)
                            ? <Loader className='relative-loader x-centered-loader' />
                            : <input type="text" className={styles.input + ' ' + styles.name}
                                placeholder={lobby.name}
                                disabled={!lobby.default}
                                defaultValue={!lobby.default ? lobby.name : ''}
                                onChange={setNameHandler} />
                        }
                    </article>
                    <article className={styles.passwordContainer}>
                        <h2>Password</h2>
                        {(!isCreate && lobby.default)
                            ? <Loader className='relative-loader x-centered-loader' />
                            : <input type="text" className={styles.input + ' ' + styles.password}
                                placeholder={lobby.password || 'No password'}
                                disabled={!lobby.default}
                                defaultValue={!lobby.default ? lobby.password : ''}
                                onChange={setPasswordHandler} />
                        }
                    </article>
                </article>

                <article className={styles.game}>
                    <h2>{gameText()}</h2>
                    {(!isCreate && lobby.default)
                        ? <Loader className='relative-loader x-centered-loader large-loader' />
                        : <>{(isCreate && region.link)
                            && <Button className={styles.backToRegion} onClick={returnToRegionHandler}>
                                Pick another region
                            </Button>
                        }
                            <div className={styles.sliderWrapper}>
                                <Button className={[styles.button, styles.prev, (index === 0 || !isCreate) ? styles.disabled : ''].join(' ')}
                                    onClick={() => sliderHandler(-1)}                                    >
                                    <FontAwesomeIcon icon="fa-solid fa-angle-left" />
                                </Button>
                                <article ref={sliderRef} className={[styles.slider, transition ? styles.sliderTransition : ''].join(' ')}
                                    style={{ transform: `translateX(${-index * 32 + 2}%)`, height }}>
                                    {region.link
                                        ? games[region.link.slice(1)].map(g =>
                                            <GameCard onClick={() => setGameHandler(g)}
                                                active={g.title === game.title}
                                                disabled={!isCreate}
                                                key={g.title} data={{ ...g, title: translate(g.title, 'game') }} />)
                                        : regions.map(r =>
                                            <GameCard onClick={() => setRegionHandler(r)}
                                                data={{ ...r, title: translate(r.title, 'region') }}
                                                disabled={!isCreate}
                                                key={r.title} />)
                                    }
                                </article>
                                <Button className={[styles.button, styles.next, (index === maxIndex - 1 || !isCreate) ? styles.disabled : ''].join(' ')}
                                    onClick={() => sliderHandler(1)}                                    >
                                    <FontAwesomeIcon icon="fa-solid fa-angle-right" />
                                </Button>
                            </div>
                        </>
                    }
                </article>

                {!(!isCreate && lobby.default) &&
                    <article className={styles.optionsContainer}>
                        <h2>Game options</h2>
                        <GameOptions options={isCreate ? options : lobby.options}
                            handlers={{ switchShowAnswersHandler, switchShowStopwatchHandler }}
                            className={styles.options + (disabled ? ' disabled-switch' : '')}
                            disabled={disabled} />
                    </article>
                }
            </section >

            {(isCreate && lobby.default)
                && <Button onClick={createLobbyHandler} className={styles.actionButton + (game.link ? '' : (' ' + styles.disabled))}>Create Lobby</Button>
            }

            {!isCreate
                ? <article className={styles.copyLinkContainer + ' fadeIn'}>
                    <h2>Link to lobby</h2>
                    {lobby.default
                        ? !isCreate && <Loader className='relative-loader x-centered-loader' />
                        : <LinkContainer />
                    }
                </article>
                : !lobby.default && <article className={styles.copyLinkContainer + ' fadeIn'}>
                    <h2>Link to lobby</h2>
                    <LinkContainer />
                </article>
            }

            {(!isCreate && !lobby.default && !player.default && lobby.players[player.uid]?.admin)
                && <Button onClick={startGameHandler} className={styles.actionButton + (Object.keys(lobby.players).length >= 2 ? '' : (' ' + styles.disabled))}>Start Game</Button>
            }

        </section>
    )
}