import { Routes, Route } from 'react-router';
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


function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  const switchThemeHandler = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  library.add(faCircleCheck, faStopwatch, faCircleArrowLeft);

  return (
    <div className='app' data-theme={theme}>
      <LanguageProvider>
        <NavProvider>
          <header >
            <Header theme={theme} switchThemeHandler={switchThemeHandler} />
          </header>
          <main>
            <Routes>
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
          </main>
        </NavProvider>
      </LanguageProvider>
    </div >
  );
}

export default App;