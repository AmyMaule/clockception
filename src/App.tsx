import { Fragment, useState, useEffect } from 'react';
import Digit from './components/Digit';
import './App.scss';

const App = () => {
  const [time, setTime] = useState<number[]>(Array(6).fill(Infinity));

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

  // To do: Add spinner while loading?
  if (time.some(digit => digit === Infinity)) {
    return null;
  }

  return (
    <div className="app-container">
      <h1 className="title">Analog clocks within digital clocks</h1>
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
