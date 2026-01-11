import React, { useEffect, useRef, useState } from 'react';
import { clockMap } from '../constants';

type ClockProps = {
  time: string | null;
};

const Clock = ({ time }: ClockProps) => {
  const [angles, setAngles] = useState({ hour: 0, minute: 0 });
  const prevAnglesRef = useRef({ minute: 0, hour: 0 });

  const getClockHandPositions = (time: string | null) => {
    // defaultTime is a time unrelated to any shape needed to form a digit
    const defaultTime = { hour: 10, minute: 50 };
    if (!time) return defaultTime;

    const key = time as keyof typeof clockMap;
    return clockMap[key] ?? defaultTime;
  };
  
  const { hour, minute } = getClockHandPositions(time);

  useEffect(() => {
    const rawMinute = minute * 6;
    const rawHour = hour * 30;

    // Normalize the angle to always increase so the analog clocks only ever move forwards in time
    const normalizeAngle = (prev: number, next: number) => {
      let result = next;
      while (result <= prev) {
        result += 360;
      }
      return result;
    };

    const nextMinute = normalizeAngle(prevAnglesRef.current.minute, rawMinute);
    const nextHour = normalizeAngle(prevAnglesRef.current.hour, rawHour);

    prevAnglesRef.current = { minute: nextMinute, hour: nextHour };
    setAngles({ minute: nextMinute, hour: nextHour });
  }, [hour, minute]);


  return (
    <div
      className="clock"
      style={{
        "--hour-hand": `${angles.hour}deg`,
        "--minute-hand": `${angles.minute}deg`,
      } as React.CSSProperties}
    />
  )
}

export default Clock;
