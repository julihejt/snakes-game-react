import React, { useState, useEffect, useRef } from "react";
import GameBoard from "./Gameboard";
import ScoreBoard from "./ScoreBoard";
import GameOverScreen from "./GameOverScreen";

const gridSize = 20;

function Game() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState(generateFood());
  const [direction, setDirection] = useState("right");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(200);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const gameIntervalRef = useRef(null);

  useEffect(() => {
    if (gameStarted) {
      gameIntervalRef.current = setInterval(() => moveSnake(), gameSpeed);
      return () => clearInterval(gameIntervalRef.current);
    }
  }, [gameSpeed, gameStarted, snake, direction]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case "ArrowUp":
          if (direction !== "down") setDirection("up");
          break;
        case "ArrowDown":
          if (direction !== "up") setDirection("down");
          break;
        case "ArrowLeft":
          if (direction !== "right") setDirection("left");
          break;
        case "ArrowRight":
          if (direction !== "left") setDirection("right");
          break;
        case " ":
          if (!gameStarted) startGame();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameStarted]);

  function generateFood() {
    let newFoodPosition;
    do {
      newFoodPosition = {
        x: Math.floor(Math.random() * gridSize) + 1,
        y: Math.floor(Math.random() * gridSize) + 1,
      };
    } while (
      snake.some(
        (segment) =>
          segment.x === newFoodPosition.x && segment.y === newFoodPosition.y
      )
    );
    return newFoodPosition;
  }

  function moveSnake() {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case "up":
        head.y -= 1;
        break;
      case "down":
        head.y += 1;
        break;
      case "left":
        head.x -= 1;
        break;
      case "right":
        head.x += 1;
        break;
      default:
        break;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setFood(generateFood());
      setScore(score + 1);
      setGameSpeed(Math.max(gameSpeed - 10, 100));
    } else {
      newSnake.pop();
    }

    if (checkCollision(head, newSnake)) {
      endGame();
      return;
    }

    setSnake(newSnake);
  }

  function checkCollision(head, snake) {
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
      return true;
    }
    return snake
      .slice(1)
      .some((segment) => segment.x === head.x && segment.y === head.y);
  }

  function startGame() {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection("right");
    setScore(0);
    setGameSpeed(200);
    setGameStarted(true);
    setGameOver(false);
  }

  function endGame() {
    setGameStarted(false);
    setGameOver(true);
    setHighScore(Math.max(score, highScore));
  }

  return (
    <div>
      <ScoreBoard score={score} highScore={highScore} />
      <GameBoard gridSize={gridSize} snake={snake} food={food} />
      {gameOver && <GameOverScreen score={score} onRestart={startGame} />}
    </div>
  );
}

export default Game;
