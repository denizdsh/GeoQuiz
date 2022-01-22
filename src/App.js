import './App.css';
import { Routes, Route } from 'react-router';
import useLocalStorage from 'use-local-storage';
import { CapitalsQuizProvider } from './contexts/CapitalsQuizContext';
import Header from './components/Header/Header';
import Home from './components/Home';
import World from './components/Regions/World';
import Africa from './components/Regions/Africa';
import Americas from './components/Regions/Americas';
import Asia from './components/Regions/Asia';
import Oceania from './components/Regions/Oceania';
import Europe from './components/Regions/Europe';
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
          <Route path="/world" element={<World />} />
          <Route path="/africa" element={<Africa />} />
          <Route path="/asia" element={<Asia />} />
          <Route path="/americas" element={<Americas />} />
          <Route path="/australia-oceania" element={<Oceania />} />
          <Route path="/europe" element={<Europe />} />
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
