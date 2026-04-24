import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { ages, games } from '../../../services/contentService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GameCard from '../../GameCard/GameCard';
import Button from '../../Common/Button';
import GameOptions from '../../GameOptions/GameOptions';
import Loader from '../../Common/Loader';
import styles from './LobbyInfo.module.css';
import { TranslationType } from '../../../enums/lang/TranslationType';
import { useTranslation } from '../../../hooks/useTranslation';
import { useMultiplayer } from '../../../hooks/useMultiplayer';

const defaultGame = { title: '', link: '' };
const defaultAge = { title: '', link: '' };

export default function LobbyInfo({ isCreate = false, disabled = false }) {
    const navigate = useNavigate();

    const { player, lobby, createLobby, startGame } = useMultiplayer();
    const { translate, dict } = useTranslation();

    const sliderRef = useRef(null);

    const [name, setName] = useState('');
    const [options, setOptions] = useState({ showAnswers: true, showStopwatch: true });

    const [age, setAge] = useState(defaultAge);  // #age MAIN AGE (NOT SUBREGION) 
    const [game, setGame] = useState(defaultGame);
    const [index, setIndex] = useState(0);

    const [transition, setTransition] = useState(false);
    const [height, setHeight] = useState('auto');

    useEffect(() => {
        if (isCreate || !lobby.game) {
            return;
        }

        // set age and game
        const r = {}, g = {};

        const agePathname = lobby.game.slice(1).split('/')[0];

        r.link = '/' + agePathname;
        r.title = ages.find(xr => xr.link === r.link)?.title;

        g.link = lobby.game;
        const gameInRegionIndex = games[agePathname]?.findIndex(xg => xg.link === g.link);
        g.title = games[agePathname][gameInRegionIndex]?.title;

        setAge(r);
        setGame(g);

        // set index so no matter how deep the selected game is within a age, it is visible upon load
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

    const getJoinLink = useCallback(() => `${window.location.origin}/multiplayer/lobby/${lobby.name}/join`, [lobby.name]);

    const gameText = () => {
        if (!isCreate && lobby.default)
            return dict.misc.Game;

        let text = dict.misc.Game + ' - ' + (age.title ? `${translate(age.title, TranslationType.AGE)}, ` : dict.misc.ChooseAge);

        if (age.title)
            text += game.title ? translate(game.title, TranslationType.GAME) : dict.misc.ChooseAge;

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

    const setAgeHandler = (age) => {
        handle(() => {
            transitionHandler();

            setIndex(0);
            setAge({
                title: age.title, link: age.link
            })
        });
    }

    const returnToRegionHandler = () => {
        handle(() => {
            transitionHandler();

            setIndex(0);
            setAge(defaultAge);
            setGame(defaultGame);
        });
    }

    const copyToClipboardHandler = () => {
        navigator.clipboard.writeText(getJoinLink())
            .then(() => {
                console.log('Copied to clipboard');
            }, () => {
                window.alert(dict.warning.CopyFailed)
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
            window.alert(dict.warning.GameType)
            return;
        }

        try {
            const newLobby = await createLobby({
                name: name.trim(),
                game: game.link,
                options
            });

            navigate(`/multiplayer/lobby/${newLobby.name}`, { replace: true });
        } catch (err) {
            return window.alert(err.message);
        }
    }

    const startGameHandler = async () => {
        await startGame();
    }

    const maxIndex = (age.link ? games[age.link.slice(1)].length : ages.length) - 2;

    const LinkContainer = () => <div className={styles.linkContainer}>
        <input type="text" className={`${styles.input} ${styles.link}`} disabled
            value={getJoinLink()} />
        <label title={dict.misc.Copy}>
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
                </article>

                <article className={styles.game}>
                    <h2>{gameText()}</h2>
                    {(!isCreate && lobby.default)
                        ? <Loader className='relative-loader x-centered-loader large-loader' />
                        : <>{(isCreate && age.link)
                            && <Button className={styles.backToRegion} onClick={returnToRegionHandler}>
                                Pick another age
                            </Button>
                        }
                            <div className={styles.sliderWrapper}>
                                <Button className={[styles.button, styles.prev, (index === 0 || !isCreate) ? styles.disabled : ''].join(' ')}
                                    onClick={() => sliderHandler(-1)}                                    >
                                    <FontAwesomeIcon icon="fa-solid fa-angle-left" />
                                </Button>
                                <article ref={sliderRef} className={[styles.slider, transition ? styles.sliderTransition : ''].join(' ')}
                                    style={{ transform: `translateX(${-index * 32 + 2}%)`, height }}>
                                    {age.link
                                        ? games[age.link.slice(1)].map(g =>
                                            <GameCard onClick={() => setGameHandler(g)}
                                                active={g.title === game.title}
                                                disabled={!isCreate}
                                                key={g.title} data={{ ...g, title: translate(g.title, TranslationType.GAME) }} />)
                                        : ages.map(r =>
                                            <GameCard onClick={() => setAgeHandler(r)}
                                                data={{ ...r, title: translate(r.title, TranslationType.AGE) }}
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
                    <h2>{dict.misc.LobbyLink}</h2>
                    {lobby.default
                        ? !isCreate && <Loader className='relative-loader x-centered-loader' />
                        : <LinkContainer />
                    }
                </article>
                : !lobby.default && <article className={styles.copyLinkContainer + ' fadeIn'}>
                    <h2>{dict.misc.LobbyLink}</h2>
                    <LinkContainer />
                </article>
            }

            {(!isCreate && !lobby.default && !player.default && lobby.players[player.uid]?.admin)
                && <Button onClick={startGameHandler} className={styles.actionButton + (Object.keys(lobby.players).length >= 2 ? '' : (' ' + styles.disabled))}>{dict.misc.StartGame}</Button>
            }

        </section>
    )
}