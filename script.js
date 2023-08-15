const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let snake = [{x: 200, y: 200}]; 
let food = {x: 300, y: 300};
let direction = "right"; 
let speed = 150; 
let score = 0; 
const size = 20; 
const colorSnake = "lime"; 
const colorFood = "red"; 

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = colorSnake;
        ctx.fillRect(snake[i].x, snake[i].y, size, size);
    }
}

function drawFood() {
    ctx.fillStyle = colorFood;
    ctx.beginPath();
    ctx.arc(food.x + size / 2, food.y + size / 2, size / 2, 0, 2 * Math.PI);
    ctx.fill();
}
function updateSnake() {
    let head = {x: snake[0].x, y: snake[0].y};
    switch (direction) {
        case "right":
            head.x += size;
            break;
        case "left":
            head.x -= size;
            break;
        case "up":
            head.y -= size;
            break;
        case "down":
            head.y += size;
            break;
    }
    snake.unshift(head);
    snake.pop();
}

function checkFood() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;

        food.x = Math.floor(Math.random() * (canvas.width / size)) * size;
        food.y = Math.floor(Math.random() * (canvas.height / size)) * size;

        snake.push({});
    }
}

function checkGameOver() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }

    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
        return true;
    }
    return false;
}

function handleInput(event) {
    switch (event.key) {
        case "ArrowRight":
            if (direction !== "left") {
                direction = "right";
            }
            break;
        case "ArrowLeft":
            if (direction !== "right") {
                direction = "left";
            }
            break;
        case "ArrowUp":
            if (direction !== "down") {
                direction = "up";
            }
            break;
        case "ArrowDown":
            if (direction !== "up") {
                direction = "down";
            }
            break;
    }
}

function initGame() {
    snake = [{x: 200, y: 200}];
    food = {x: 300, y: 300};
    direction = "right";
    speed = 100;
    score = 0;

    drawSnake();
    drawFood();

    gameLoop = setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateSnake();
        drawSnake();
        checkFood();
        drawFood();
    
        if (checkGameOver()) {
          clearInterval(gameLoop);
    
          ctx.fillStyle = "white";
          ctx.font = "30px Arial";
          ctx.textAlign = "center";
          ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
          ctx.font = "20px Arial";
          ctx.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 30);
        }
    }, speed);
    

    window.addEventListener("keydown", handleInput);
}

const refreshBtn = document.createElement("button");
const startOverBtn = document.createElement("button");

refreshBtn.innerText = "Refresh";
startOverBtn.innerText = "Start Over";

refreshBtn.addEventListener("click", () => {
  location.reload();
});

startOverBtn.addEventListener("click", () => {
  clearInterval(gameLoop);
  initGame();
});

document.body.appendChild(refreshBtn);
document.body.appendChild(startOverBtn);

window.onload = initGame;
