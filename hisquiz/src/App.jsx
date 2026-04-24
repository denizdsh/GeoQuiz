import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import { useLocation, useNavigationType } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

import useAddIcons from './hooks/useAddIcons';

import { LanguageProvider } from './contexts/LanguageContext';
import { QuizProvider } from './contexts/QuizContext';
import { ElementsProvider } from './contexts/ElementsContext';
import { SoundProvider } from './contexts/SoundContext';
import { MultiplayerProvider } from './contexts/MultiplayerContext';

import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home';
import Age from './components/Age'
import Quiz from './components/Quiz/Quiz';
import NotFound from './components/NotFound/NotFound';
import Aside from './components/Aside/Aside';
import Lobbies from './components/MultiplayerContent/Lobbies/Lobbies';
import JoinLobby from './components/MultiplayerContent/JoinLobby/JoinLobby';
import CreateLobby from './components/MultiplayerContent/CreateLobby/CreateLobby';
import Lobby from './components/MultiplayerContent/Lobby/Lobby';
import BackBtn from './components/BackBtn';
import Footer from './components/Footer/Footer';
import { Game } from './enums/Game';

function App() {


  const location = useLocation();
  const navType = useNavigationType();
  const [isBackNavigation, setIsBackNavigation] = useState(false);
  useAddIcons();

  useEffect(() => {
    if (navType === 'POP') {
      setIsBackNavigation(isb => !isb ? true : isb);
    } else {
      setIsBackNavigation(isb => isb ? false : isb);

      document.documentElement.scrollTo(0, 0);
    }
  }, [location.pathname, navType])

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchThemeHandler = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <main className={`app${isBackNavigation ? ' back-navigation' : ''}`} data-theme={theme}>
      <LanguageProvider>
        <SoundProvider>
          <ElementsProvider>
            <header>
              <Header theme={theme} switchThemeHandler={switchThemeHandler} />
            </header>

            <Aside />
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/:age" element={<Age />} />

              <Route path={`/:age/${Game.TRIVIA}`} element={
                <QuizProvider>
                  <Quiz game={Game.TRIVIA} />
                </QuizProvider>
              } />

              <Route path={`/:age/${Game.ARTEFACTS}`} element={
                <QuizProvider>
                  <Quiz game={Game.ARTEFACTS} />
                </QuizProvider>
              } />

              <Route path={`/:age/${Game.CAPITALS}`} element={
                <QuizProvider>
                  <Quiz game={Game.CAPITALS} />
                </QuizProvider>
              } />

              <Route path={`/:age/${Game.FLAGS}`} element={
                <QuizProvider>
                  <Quiz game={Game.FLAGS} />
                </QuizProvider>
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

            <Footer />
          </ElementsProvider>
        </SoundProvider>
      </LanguageProvider>
    </main>
  );
}

export default App;