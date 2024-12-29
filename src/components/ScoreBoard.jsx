import React from "react";
import "../App.css"; // Import CSS for styling

function ScoreBoard({ score, highScore }) {
  return (
    <div className="scores">
      <h2 id="score" className={score > highScore ? "update" : ""}>
        Score: {score}
      </h2>
      <h2 id="highScore" className={score === highScore ? "update" : ""}>
        High Score: {highScore}
      </h2>
    </div>
  );
}

export default ScoreBoard;
