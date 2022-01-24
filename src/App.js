import './App.css';
import { Routes, Route } from 'react-router';
import useLocalStorage from 'use-local-storage';
import { CapitalsQuizProvider } from './contexts/CapitalsQuizContext';
import Header from './components/Header/Header';
import Home from './components/Home';
import Region from './components/Region'
import FlagsQuiz from './components/FlagsQuiz/FlagsQuiz';
import CapitalsQuiz from './components/CapitalsQuiz/CapitalsQuiz';


function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchThemeHandler = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className='app' data-theme={theme}>
      <header >
        <Header theme={theme} switchThemeHandler={switchThemeHandler} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:region" element={<Region />} />
          <Route path="/:region/flags" element={<FlagsQuiz />} />
          <Route path="/:region/capitals" element={
            <CapitalsQuizProvider>
              <CapitalsQuiz />
            </CapitalsQuizProvider>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
