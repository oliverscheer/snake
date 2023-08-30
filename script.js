const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let snake = [{ x: 5, y: 5 }];
let direction = "right";
let food = { x: 10, y: 10 };
let snakeLength = 1; // Initialize the snake's length
let gameRunning = false; // Track if the game is running
let gamePaused = false;  // Track if the game is paused

document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("pauseButton").addEventListener("click", pauseGame);
document.getElementById("resumeButton").addEventListener("click", resumeGame);
document.getElementById("restartButton").addEventListener("click", restartGame);

function getRandomPosition() {
    return Math.floor(Math.random() * gridSize);
}

function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach(segment => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function update() {
    const head = { ...snake[0] };


    // Check for collision with walls
    if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
        endGame(); // Call the function to end the game
        return;
    }

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
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = { x: getRandomPosition(), y: getRandomPosition() };
        snakeLength++; // Increment the snake's length
        updateSnakeLength(); // Call the function to update the displayed length
    } else {
        snake.pop();
    }
}

function updateSnakeLength() {
    const snakeLengthElement = document.getElementById("snakeLength");
    snakeLengthElement.textContent = "Snake Length: " + snakeLength;
}

function endGame() {
    const gameOverElement = document.getElementById("gameOver");
    gameOverElement.style.display = "block"; // Display the game over message
}

function gameLoop() {
    if (gameRunning && !gamePaused) {
        drawSnake();
        drawFood();
        update();
        setTimeout(gameLoop, 100);
    }
}

function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        gameLoop();
    }
}

function pauseGame() {
    if (gameRunning && !gamePaused) {
        gamePaused = true;
    }
}

function resumeGame() {
    if (gameRunning && gamePaused) {
        gamePaused = false;
        gameLoop();
    }
}

function restartGame() {
    gameRunning = false;
    gamePaused = false;
    snake = [{ x: 5, y: 5 }];
    direction = "right";
    snakeLength = 1;
    food = { x: 10, y: 10 };
    updateSnakeLength();
    const gameOverElement = document.getElementById("gameOver");
    gameOverElement.style.display = "none";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener("keydown", event => {
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
    }
});

gameLoop();
