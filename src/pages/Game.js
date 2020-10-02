/* eslint-disable */

import React, { useEffect, useState, useCallback } from 'react';
import { useScore } from '../contexts/ScoreContext';
import {
  StyledCharacter,
  StyledGame,
  StyledScore,
  StyledTimer
} from '../styled/Game';
import { Strong } from '../styled/Misc';

export default function Game({ history }) {
  const MAX_SECONDS = 10;
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

  const [currentCharacter, setCurrentCharacter] = useState('');
  const [score, setScore] = useScore(0);
  const [ms, setMs] = useState(0);
  const [seconds, setSeconds] = useState(MAX_SECONDS);

  useEffect(() => {
    setRandomCharacter();
    setScore(0);
    const currentTime = new Date();
    const interval = setInterval(() => updateTime(currentTime), 1);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (seconds <= -1) {
      history.push('/game-over');
    }
  }, [seconds, ms, history]);

  const keyupHandler = useCallback(
    e => {
      if (e.key === currentCharacter) {
        setScore(prevScore => prevScore + 1);
      } else if (score > 0) {
        setScore(prevScore => prevScore - 1);
      }
      setRandomCharacter();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCharacter]
  );

  useEffect(() => {
    document.addEventListener('keyup', keyupHandler);
    return () => {
      document.removeEventListener('keyup', keyupHandler);
    };
  }, [keyupHandler]);

  const updateTime = startTime => {
    const endTime = new Date();
    const msPassedStr = (endTime.getTime() - startTime.getTime()).toString();
    const formattedMSString = ('0000' + msPassedStr).slice(-5);
    const updatedSeconds =
      MAX_SECONDS - parseInt(formattedMSString.substring(0, 2)) - 1;
    const updatedMs =
      1000 -
      parseInt(formattedMSString.substring(formattedMSString.length - 3));

    setSeconds(addLeadingZeros(updatedSeconds, 2));
    setMs(addLeadingZeros(updatedMs, 3));
  };

  const addLeadingZeros = (num, length) => {
    let zeros = '';

    for (let i = 0; i < length; i++) {
      zeros += '0';
    }

    return (zeros + num).slice(-length);
  };

  const setRandomCharacter = () => {
    const randomInt = Math.floor(Math.random() * 36);
    setCurrentCharacter(characters[randomInt]);
  };

  return (
    <StyledGame>
      <StyledScore>
        Score:<Strong>{score}</Strong>
      </StyledScore>
      <StyledCharacter>{currentCharacter}</StyledCharacter>
      <StyledTimer>
        Time:{' '}
        <Strong>
          {seconds}: {ms}
        </Strong>
      </StyledTimer>
    </StyledGame>
  );
}
