import React from 'react';
import { digits } from '../constants';
import Clock from './Clock';

type DigitProps = {
  digit: number;
};

const Digit = React.memo(({ digit }: DigitProps) => {
  const digitMap = digits[digit];

  return (
    <div className="digit">
      {digitMap.map((clockTime, j) => (
        <Clock time={clockTime} key={j} />
      ))}
    </div>
  );
});

export default Digit;
