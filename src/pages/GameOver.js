import React, { useState, useEffect } from 'react';
import { useScore } from '../contexts/ScoreContext';
import { StyledLink } from '../styled/Navbar';
import { StyledCharacter } from '../styled/Game';
import { StyledTitle } from '../styled/Misc';

export default function GameOver({ history }) {
  const [score] = useScore();
  const [scoreMessage, setScoreMessage] = useState('');

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
        const res = await fetch('/.netlify/functions/saveHighScore', options);
        const data = await res.json();
        if (data.id) {
          setScoreMessage('Congrats, you got a high score!');
        } else {
          setScoreMessage('Sorry, not a high score. Try again!');
        }
      } catch (error) {
        console.error(error);
      }
    };
    saveHighScore();
  }, [score]);
  return (
    <div>
      <StyledTitle>Game Over</StyledTitle>
      <h2>{scoreMessage}</h2>
      <StyledCharacter>{score}</StyledCharacter>
      <div>
        <StyledLink to='/'>Go Home</StyledLink>
      </div>
      <div>
        <StyledLink to='/game'>Play Again</StyledLink>
      </div>
    </div>
  );
}
