import React from 'react';
import { clockMap } from '../constants';

type ClockProps = {
  time: string | null;
};

const Clock = ({ time }: ClockProps) => {
  const getMinuteAngle = (minute: number) => minute * 6;
  const getHourAngle = (hour: number) => hour * 30;

  const getClockHandPositions = (time: string | null) => {
    // defaultTime is a time unrelated to any shape needed to form a digit
    const defaultTime = { hour: 10, minute: 50 };
    if (!time) return defaultTime;
    
    const key = time as keyof typeof clockMap;
    return clockMap[key] ?? defaultTime;
  }

  const { hour, minute } = getClockHandPositions(time);

  return (
    <div
      className="clock"
      style={{
        "--hour-hand": `${getHourAngle(hour)}deg`,
        "--minute-hand": `${getMinuteAngle(minute)}deg`
      } as React.CSSProperties}
    />
  )
}

export default Clock;
