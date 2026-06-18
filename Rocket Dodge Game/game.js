let canvas;
let ctx;
let rocketImg;

let rocket;
let stars = [];
let score = 0;
let hits = 0;
let timer = null;
let gameRunning = false;

let left = false;
let right = false;
let up = false;
let down = false;

window.onload = function () {
    canvas = document.getElementById("field");
    ctx = canvas.getContext("2d");
    rocketImg = document.getElementById("rocketImg");

    document.getElementById("startBtn").onclick = startGame;
    document.getElementById("restartBtn").onclick = restartGame;

    window.onkeydown = keyDown;
    window.onkeyup = keyUp;

    resetGame();
    drawStartScreen();
};

function resetGame() {
    rocket = {
        x: 265,
        y: 480,
        width: 70,
        height: 90,
        speed: 6
    };

    stars = [];
    score = 0;
    hits = 0;
    gameRunning = false;

    updateText();
}

function startGame() {
    if (gameRunning === true) {
        return;
    }

    resetGame();
    gameRunning = true;

    for (let i = 0; i < 20; i++) {
        stars.push({
            x: Math.random() * 600,
            y: Math.random() * -600,
            r: Math.random() * 3 + 3,
            speed: Math.random() * 4 + 2
        });
    }

    timer = setInterval(gameLoop, 30);
}

function restartGame() {
    clearInterval(timer);
    resetGame();
    drawStartScreen();
}

function gameLoop() {
    moveRocket();
    moveStars();
    checkHit();

    score++;
    updateText();
    drawGame();

    if (hits >= 10) {
        gameOver();
    }
}

function moveRocket() {
    if (left) {
        rocket.x -= rocket.speed;
    }
    if (right) {
        rocket.x += rocket.speed;
    }
    if (up) {
        rocket.y -= rocket.speed;
    }
    if (down) {
        rocket.y += rocket.speed;
    }

    if (rocket.x < 0) {
        rocket.x = 0;
    }
    if (rocket.x + rocket.width > canvas.width) {
        rocket.x = canvas.width - rocket.width;
    }
    if (rocket.y < 0) {
        rocket.y = 0;
    }
    if (rocket.y + rocket.height > canvas.height) {
        rocket.y = canvas.height - rocket.height;
    }
}

function moveStars() {
    for (let i = 0; i < stars.length; i++) {
        stars[i].y += stars[i].speed;

        if (stars[i].y > 600) {
            stars[i].x = Math.random() * 600;
            stars[i].y = -10;
        }
    }
}

function checkHit() {
    for (let i = 0; i < stars.length; i++) {
        let rocketCenterX = rocket.x + rocket.width / 2;
        let rocketCenterY = rocket.y + rocket.height / 2;

        let dx = rocketCenterX - stars[i].x;
        let dy = rocketCenterY - stars[i].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < stars[i].r + 25) {
            hits++;
            stars[i].x = Math.random() * 600;
            stars[i].y = -10;
        }
    }
}

function drawGame() {
    ctx.clearRect(0, 0, 600, 600);

    ctx.fillStyle = "white";

    for (let i = 0; i < stars.length; i++) {
        ctx.beginPath();
        ctx.arc(stars[i].x, stars[i].y, stars[i].r, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.drawImage(rocketImg, rocket.x, rocket.y, rocket.width, rocket.height);
}

function drawStartScreen() {
    ctx.clearRect(0, 0, 600, 600);

    ctx.fillStyle = "white";
    ctx.font = "28px Arial";
    ctx.fillText("Press Start", 225, 280);

    ctx.drawImage(rocketImg, rocket.x, rocket.y, rocket.width, rocket.height);
}

function gameOver() {
    clearInterval(timer);
    gameRunning = false;

    ctx.fillStyle = "yellow";
    ctx.font = "40px Arial";
    ctx.fillText("GAME OVER", 150, 280);

    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 240, 330);
}

function updateText() {
    document.getElementById("scoreText").textContent = "Score: " + score;
    document.getElementById("hitText").textContent = "Hits: " + hits + " / 10";
}

function keyDown(e) {
    if (e.key === "ArrowLeft") {
        left = true;
    }
    if (e.key === "ArrowRight") {
        right = true;
    }
    if (e.key === "ArrowUp") {
        up = true;
    }
    if (e.key === "ArrowDown") {
        down = true;
    }
}

function keyUp(e) {
    if (e.key === "ArrowLeft") {
        left = false;
    }
    if (e.key === "ArrowRight") {
        right = false;
    }
    if (e.key === "ArrowUp") {
        up = false;
    }
    if (e.key === "ArrowDown") {
        down = false;
    }
}