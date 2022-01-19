import './App.css';
import { Routes, Route } from 'react-router';
import useLocalStorage from 'use-local-storage';
import Header from './components/Header/Header';
import Home from './components/Home';


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
        </Routes>
      </main>
    </div>
  );
}

export default App;
