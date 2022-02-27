import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useNavigate, useLocation, useNavigationType } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

import { LanguageProvider } from './contexts/LanguageContext';
import { QuizProvider } from './contexts/QuizContext';
import { MapsProvider } from './contexts/MapsContext';
import { NavProvider } from './contexts/NavContext';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons/faStopwatch';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons/faCircleArrowLeft';

import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home';
import Region from './components/Region'
import Quiz from './components/Quiz/Quiz';
import MapsGame from './components/MapsGame/MapsGame';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  const switchThemeHandler = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  const navigate = useNavigate();
  const location = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType !== 'POP') {
      document.documentElement.scrollTo(0, 0);
    }
  }, [location.pathname])

  library.add(faCircleCheck, faStopwatch, faCircleArrowLeft);

  return (
    <div className='app' data-theme={theme}>
      <LanguageProvider>
        <NavProvider>
          <header >
            <Header theme={theme} switchThemeHandler={switchThemeHandler} />
          </header>
          <main>
            <TransitionGroup component={null}>
              <CSSTransition key={location.key} classNames='slide' timeout={400}>
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
                </Routes>
              </CSSTransition>
            </TransitionGroup>
            <FontAwesomeIcon icon="fa-solid fa-circle-arrow-left" className='back-btn' onClick={() => navigate(-1)} />
          </main>
        </NavProvider>
      </LanguageProvider>
    </div >
  );
}

export default App;