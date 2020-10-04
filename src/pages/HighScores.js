import React, { useState, useEffect } from 'react';
import { ScoreItem, ScoresList } from '../styled/HighScores';

export default function HighScores() {
  // const [highScores, setHighScores] = useState([]);

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
      <h1>High Scores</h1>
      <ScoresList>
        {highScores.map(score => (
          <ScoreItem key={score.id}>
            {score.fields.name} - {score.fields.score}
          </ScoreItem>
        ))}
      </ScoresList>
    </div>
  );
}
