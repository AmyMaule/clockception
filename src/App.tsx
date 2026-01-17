import { Fragment, useState, useEffect } from 'react';
import Digit from './components/Digit';
import './assets/index.scss';

type ThemeType = 'light' | 'dark' | 'retro';

const App = () => {
  const [time, setTime] = useState<number[]>(Array(6).fill(Infinity));
  const [theme, setTheme] = useState<ThemeType>("light");

  const getTimeDigits = (): number[] => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const mins = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    return [...hours, ...mins, ...seconds].map(Number);
  };

  useEffect(() => {
    const tick = () => {
      setTime(getTimeDigits());
    };
    tick();

    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (time.some(digit => digit === Infinity)) {
    return null;
  }

  return (
    <div className={`app-container theme-${theme}`}>
      <h1 className="title">Clockception</h1>
      <p className="subtitle">A digital clock made of analog clocks</p>
      <div className="theme-toggle-container">
        <button className={`btn-theme-toggle ${theme === "light" ? "btn-selected" : ""}`} onClick={() => setTheme('light')}
          >Light
        </button>
        <button className={`btn-theme-toggle ${theme === "dark" ? "btn-selected" : ""}`} onClick={() => setTheme('dark')}
          >Dark
        </button>
        <button className={`btn-theme-toggle ${theme === "retro" ? "btn-selected" : ""}`} onClick={() => setTheme('retro')}
          >Retro
        </button>
      </div>
      <div className="time-container">
        {time.map((digit, i) => (
          <Fragment key={i}>
            <Digit digit={digit} />
            {(i !== time.length - 1 && i % 2 === 1) && (
              <div className="digit-divider">:</div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default App;
