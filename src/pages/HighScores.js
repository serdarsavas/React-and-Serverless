import React, { useState, useEffect } from 'react';
import { ScoreItem, ScoresList } from '../styled/HighScores';
import { StyledTitle } from '../styled/Misc';

export default function HighScores() {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const loadHighScores = async () => {
      try {
        const res = await fetch('/.netlify/functions/getHighScores');
        const scores = await res.json();
        setHighScores(scores);
      } catch (err) {
        console.error(err);
      }
    };
    loadHighScores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <StyledTitle>High Scores</StyledTitle>
      <ScoresList>
        {highScores.map((score, index) => (
          <ScoreItem key={score.id}>
            {index + 1}. {score.fields.name} - {score.fields.score}
          </ScoreItem>
        ))}
      </ScoresList>
    </div>
  );
}
