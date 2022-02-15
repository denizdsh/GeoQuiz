import './App.css';
import { Routes, Route } from 'react-router';
import useLocalStorage from 'use-local-storage';
import { QuizProvider } from './contexts/QuizContext';
import Header from './components/Header/Header';
import Home from './components/Home';
import Region from './components/Region'
import Quiz from './components/Quiz/Quiz';


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
        </Routes>
      </main>
    </div>
  );
}

export default App;
