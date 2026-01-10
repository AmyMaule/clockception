import { Fragment } from 'react';
import { digits } from "./constants";
import './App.scss';

const App = () => {
  const time = [1, 2, 3, 4, 5, 6];
  const getMinuteAngle = (minute: number) => minute * 6;
  const getHourAngle = (hour: number) => hour * 30;

  const getClockHandPositions = (time: string | null) => {
    // defaultTime is a time unrelated to any shape needed to form a digit
    const defaultTime = { hour: 10, minute: 50 };

    if (!time) return defaultTime;

    // Key is the time (3 is 3:00, 330 is 3:30) as it looks on the clock
    const clockMap = {
      "3": { hour: 3, minute: 0 },
      "6": { hour: 6, minute: 0 },
      "9": { hour: 9, minute: 0 },
      "330": { hour: 3, minute: 30 },
      "915": { hour: 9, minute: 15 },
      "930": { hour: 9, minute: 30 },
    }
    
    const key = time as keyof typeof clockMap;
    return clockMap[key] ?? defaultTime;
  }

  return (
    <div className="app-container">
      <h1 className="title">Analog clocks within digital clocks</h1>
      <div className="time-container">
        {time.map((digit, i) => {
          const digitMap = digits[digit];
          return (
            <Fragment key={i}>
              <div className="digit">
                {digitMap.map((clockTime, j) => {
                  const { hour, minute } = getClockHandPositions(clockTime);
                  return (
                    <div
                      className="clock"
                      key={`${i}-${j}`}
                      style={{
                        "--hour-hand": `${getHourAngle(hour)}deg`,
                        "--minute-hand": `${getMinuteAngle(minute)}deg`
                      } as React.CSSProperties}
                    />
                  );
                })}
              </div>
            {(i !== time.length - 1 && i % 2 === 1) && <div className="digit-divider">:</div>}
            </Fragment>
          )
        })}
      </div>
    </div>
  );
}

export default App;
