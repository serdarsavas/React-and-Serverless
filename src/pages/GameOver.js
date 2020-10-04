import React, { useState, useEffect } from 'react';
import { useScore } from '../contexts/ScoreContext';
import { StyledLink } from '../styled/Navbar';

export default function GameOver({ history }) {
  const [score] = useScore();
  // const [scoreMessage, setScoreMessage] = useState('');

  if (score === -1) {
    history.push('/');
  }

  useEffect(() => {
    const saveHighScore = async () => {
      try {
        const options = {
          method: 'POST',
          body: JSON.stringify({ name: 'Jimmy', score })
        };
        const res = await fetch('./netlify/functions/saveHighScore', options);
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    saveHighScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1>Game Over</h1>
      <p>{score}</p>
      <StyledLink to='/'>Go Home</StyledLink>
      <StyledLink to='/game'>Play Again</StyledLink>
    </div>
  );
}
