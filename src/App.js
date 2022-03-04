import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useNavigate, useLocation, useNavigationType } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

import { LanguageProvider } from './contexts/LanguageContext';
import { QuizProvider } from './contexts/QuizContext';
import { MapsProvider } from './contexts/MapsContext';
import { NavProvider } from './contexts/NavContext';
import { SoundProvider } from './contexts/SoundContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons/faStopwatch';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons/faCircleArrowLeft';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons/faVolumeHigh';
import { faVolumeXmark } from '@fortawesome/free-solid-svg-icons/faVolumeXmark';

import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home';
import Region from './components/Region'
import Quiz from './components/Quiz/Quiz';
import MapsGame from './components/MapsGame/MapsGame';

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
  }, [location.pathname, navType])

  library.add(faCircleCheck, faStopwatch, faCircleArrowLeft, faVolumeHigh, faVolumeXmark);
  return (
    <div className='app' data-theme={theme}>
      <LanguageProvider>
        <SoundProvider>
          <NavProvider>
            <header>
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
                    <Route path='/:region/provinces' element={
                      <MapsProvider>
                        <MapsGame title='Provinces of' />
                      </MapsProvider>
                    } />
                  </Routes>
                </CSSTransition>
              </TransitionGroup>
              <FontAwesomeIcon icon="fa-solid fa-circle-arrow-left" style={location.pathname === '/' ? { display: 'none' } : {}} className='back-btn' onClick={() => navigate(-1)} />
            </main>
          </NavProvider>
        </SoundProvider>
      </LanguageProvider>
    </div >
  );
}

export default App;