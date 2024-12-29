import React from "react";
import "../App.css"; // Import CSS for styling

function GameOverScreen({ score, onRestart }) {
  return (
    <div id="game-over-screen">
      <h2>Game Over</h2>
      <p>Your Score: {score}</p>
      <button id="restart-button" onClick={onRestart}>
        Play Again
      </button>
    </div>
  );
}

export default GameOverScreen;
