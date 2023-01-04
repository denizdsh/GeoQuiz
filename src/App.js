import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import { useLocation, useNavigationType } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

import { LanguageProvider } from './contexts/LanguageContext';
import { QuizProvider } from './contexts/QuizContext';
import { MapsProvider } from './contexts/MapsContext';
import { ElementsProvider } from './contexts/ElementsContext';
import { SoundProvider } from './contexts/SoundContext';
import { MultiplayerProvider } from './contexts/MultiplayerContext';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons/faStopwatch';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons/faCircleArrowLeft';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons/faVolumeHigh';
import { faVolumeXmark } from '@fortawesome/free-solid-svg-icons/faVolumeXmark';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons/faGithubSquare'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons/faAnglesLeft';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons/faAnglesRight';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';

import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home';
import Region from './components/Region'
import Quiz from './components/Quiz/Quiz';
import MapsGame from './components/MapsGame/MapsGame';
import NotFound from './components/NotFound/NotFound';
import Aside from './components/Aside/Aside';
import Lobbies from './components/MultiplayerContent/Lobbies/Lobbies';
import JoinLobby from './components/MultiplayerContent/JoinLobby/JoinLobby';
import CreateLobby from './components/MultiplayerContent/CreateLobby/CreateLobby';
import Lobby from './components/MultiplayerContent/Lobby/Lobby';
import BackBtn from './components/BackBtn';

function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const location = useLocation();
  const navType = useNavigationType();
  const [isBackNavigation, setIsBackNavigation] = useState(false);

  useEffect(() => {
    if (navType === 'POP') {
      if (!isBackNavigation)
        setIsBackNavigation(true);
    } else {
      if (isBackNavigation)
        setIsBackNavigation(false);

      document.documentElement.scrollTo(0, 0);
    }
  }, [location.pathname, navType])

  const switchThemeHandler = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  library.add(faCircleCheck,
    faStopwatch,
    faCircleArrowLeft,
    faVolumeHigh,
    faVolumeXmark,
    faGithubSquare,
    faGithub,
    faAngleLeft,
    faAnglesLeft,
    faAngleRight,
    faAnglesRight,
    faMagnifyingGlass,
    faCopy,
    faCheck,
    faLock,
    faXmark
  );
  return (
    <div className={`app${isBackNavigation ? ' back-navigation' : ''}`} data-theme={theme}>
      <LanguageProvider>
        <SoundProvider>
          <ElementsProvider>
            <header>
              <Header theme={theme} switchThemeHandler={switchThemeHandler} />
            </header>
            <main>
              <Aside />
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/:region" element={<Region />} />
                <Route path="/:region/capitals" element={
                  <QuizProvider>
                    <Quiz game="capitals" />
                  </QuizProvider>
                } />
                <Route path="/:region/flags" element={
                  <QuizProvider>
                    <Quiz game="flags" />
                  </QuizProvider>
                } />
                <Route path='/:region/countries' element={
                  <MapsProvider>
                    <MapsGame />
                  </MapsProvider>
                } />
                <Route path='/:region/provinces' element={
                  <MapsProvider>
                    <MapsGame title='Provinces of' />
                  </MapsProvider>
                } />
                <Route path="/multiplayer/*" element={
                  <MultiplayerProvider>
                    <Routes>
                      <Route path='/' element={
                        <Lobbies />
                      } />
                      <Route path='/create-lobby' element={
                        <CreateLobby />
                      } />
                      <Route path='/lobby/:name/join' element={
                        <JoinLobby />
                      } />
                      <Route path='/lobby/:name' element={
                        <Lobby />
                      } />
                      <Route path='*' element={<NotFound />} />
                    </Routes>
                  </MultiplayerProvider>
                } />
                <Route path='*' element={<NotFound />} />
              </Routes>
              <BackBtn />
            </main>
          </ElementsProvider>
        </SoundProvider>
      </LanguageProvider>
    </div >
  );
}

export default App;