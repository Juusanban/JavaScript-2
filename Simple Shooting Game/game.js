let canvas;
let ctx;
let ship;
let bullets;
let enemies;
let timerId;
let count;
let score;
let gameOver;

window.onload = function () {
  canvas = document.getElementById("field");
  ctx = canvas.getContext("2d");

  document.getElementById("restartBtn").addEventListener("click", restartGame);

  canvas.addEventListener("mousemove", function (e) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;
    ship.move(mouseX, mouseY);
  });

  canvas.addEventListener("click", function () {
    if (gameOver === false) {
      ship.shoot();
    }
  });

  startGame();
};

function startGame() {
  ship = new Ship();
  bullets = [];
  enemies = [];
  count = 0;
  score = 0;
  gameOver = false;

  updateScore();

  if (timerId) {
    clearInterval(timerId);
  }

  timerId = setInterval(tick, 30);
}

function restartGame() {
  startGame();
}

function tick() {
  count++;

  ctx.clearRect(0, 0, 600, 600);
  drawBackground();

  ship.draw();

  if (count % 40 === 0) {
    enemies.push(new Enemy());
  }

  moveBullets();
  moveEnemies();
  checkHit();
  checkGameOver();
  removeOutsideObjects();
  drawObjects();

  if (gameOver === true) {
    clearInterval(timerId);
    drawGameOver();
  }
}

function drawBackground() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 600, 600);
}

function moveBullets() {
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].move();
  }
}

function moveEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].move();

    if (enemies[i].y > 120 && enemies[i].shot === false) {
      enemies[i].shoot();
      enemies[i].shot = true;
    }
  }
}

function drawObjects() {
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].draw();
  }

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].draw();
  }
}

function checkHit() {
  for (let i = enemies.length - 1; i >= 0; i--) {
    for (let j = bullets.length - 1; j >= 0; j--) {
      if (bullets[j].isPlayer && dist(enemies[i], bullets[j]) < 35) {
        enemies.splice(i, 1);
        bullets.splice(j, 1);
        score++;
        updateScore();
        break;
      }
    }
  }
}

function checkGameOver() {
  for (let i = 0; i < enemies.length; i++) {
    if (dist(enemies[i], ship) < 40) {
      gameOver = true;
      return;
    }
  }

  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i].isPlayer === false && dist(bullets[i], ship) < 25) {
      gameOver = true;
      return;
    }
  }
}

function removeOutsideObjects() {
  bullets = bullets.filter(function (bullet) {
    return bullet.isOutside() === false;
  });

  enemies = enemies.filter(function (enemy) {
    return enemy.isOutside() === false;
  });
}

function updateScore() {
  document.getElementById("scoreText").textContent = "Score: " + score;
}

function drawGameOver() {
  ctx.fillStyle = "yellow";
  ctx.font = "40px Arial";
  ctx.fillText("GAME OVER", 160, 280);

  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 245, 330);
}