import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const gridSize = 20;
let initialSnake = [{ x: 10, y: 10 }];
let food = generateFood();
let gameInterval;
let gameSpeedDelay = 200;
let direction = "right";
let firstBite = true;

function App() {
  const [snake, setSnake] = useState(initialSnake);
  const [foodPosition, setFood] = useState(food);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const boardRef = useRef(null);

  useEffect(() => {
    if (gameStarted) {
      gameInterval = setInterval(move, gameSpeedDelay);
    }
    return () => clearInterval(gameInterval);
  }, [gameStarted]);

  function draw() {
    // Here you can implement your drawing logic based on the React state
    // For example, updating the snake and food position
  }

  function move() {
    const head = { ...snake[0] };
    switch (direction) {
      case "up":
        head.y--;
        break;
      case "down":
        head.y++;
        break;
      case "left":
        head.x--;
        break;
      case "right":
        head.x++;
        break;
      default:
        break;
    }

    const newSnake = [head, ...snake];
    if (head.x === foodPosition.x && head.y === foodPosition.y) {
      setFood(generateFood());
      setScore(score + 1);
      increaseSpeed();
    } else {
      newSnake.pop();
    }

    if (checkCollision(newSnake)) {
      gameOver();
    }

    setSnake(newSnake);
    draw();
  }

  function checkCollision(snake) {
    const head = snake[0];
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
      return true;
    }
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        return true;
      }
    }
    return false;
  }

  function generateFood() {
    let newFoodPosition;
    do {
      newFoodPosition = {
        x: Math.floor(Math.random() * gridSize) + 1,
        y: Math.floor(Math.random() * gridSize) + 1,
      };
    } while (isFoodOnSnake(newFoodPosition));
    return newFoodPosition;
  }

  function isFoodOnSnake(position) {
    return snake.some(
      (segment) => segment.x === position.x && segment.y === position.y
    );
  }

  function increaseSpeed() {
    clearInterval(gameInterval);
    if (gameSpeedDelay > 100) {
      gameSpeedDelay -= 10;
    }
    gameInterval = setInterval(move, gameSpeedDelay);
  }

  function gameOver() {
    clearInterval(gameInterval);
    if (score > highScore) {
      setHighScore(score);
    }
    setGameStarted(false);
  }

  function startGame() {
    setGameStarted(true);
    setSnake(initialSnake);
    setFood(generateFood());
    setScore(0);
  }

  const handleKeyPress = (event) => {
    if (!gameStarted && event.key === " ") {
      startGame();
    } else {
      switch (event.key) {
        case "ArrowUp":
          direction = "up";
          break;
        case "ArrowDown":
          direction = "down";
          break;
        case "ArrowLeft":
          direction = "left";
          break;
        case "ArrowRight":
          direction = "right";
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameStarted]);

  return (
    <div className="App">
      <div className="scores">
        <h1>Score: {score}</h1>
        <h1>High Score: {highScore}</h1>
      </div>
      <div className="game-board" ref={boardRef}>
        {snake.map((segment, index) => (
          <div
            key={index}
            className={index === 0 ? "snake head" : "snake body"}
            style={{
              gridColumn: segment.x,
              gridRow: segment.y,
            }}
          />
        ))}
        <div
          className="food"
          style={{
            gridColumn: foodPosition.x,
            gridRow: foodPosition.y,
          }}
        />
      </div>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export default App;
