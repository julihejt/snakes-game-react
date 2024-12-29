import React from "react";
import "../App.css"; // Import CSS for styling

function GameBoard({ gridSize, snake, food }) {
  return (
    <div className="game-border-3">
      <div id="game-board">
        {Array.from({ length: gridSize }, (_, row) =>
          Array.from({ length: gridSize }, (_, col) => {
            const isSnake = snake.some(
              (segment) => segment.x === col + 1 && segment.y === row + 1
            );
            const isFood = food.x === col + 1 && food.y === row + 1;
            return (
              <div
                key={`${row}-${col}`}
                className={`cell ${isSnake ? "snake" : ""} ${
                  isFood ? "food" : ""
                }`}
              ></div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default GameBoard;
