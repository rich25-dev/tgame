const dino = document.getElementById('dino');
const startScreen = document.getElementById('startScreen');
const gameContainer = document.getElementById('gameContainer');
const scoreElement = document.getElementById('score');

let isJumping = false;
let gameStarted = false;
let score = 0;
let obstacles = [];

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        if (!gameStarted) {
            startGame();
        } else if (!isJumping) {
            jump();
        }
    }
});

function startGame() {
    gameStarted = true;
    startScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    createObstacles();
    setInterval(updateScore, 100);
    setInterval(checkCollision, 10);
}

function jump() {
    isJumping = true;
    let upInterval = setInterval(() => {
        if (parseInt(window.getComputedStyle(dino).bottom) >= 150) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (parseInt(window.getComputedStyle(dino).bottom) <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                dino.style.bottom = (parseInt(window.getComputedStyle(dino).bottom) - 5) + 'px';
            }, 20);
        }
        dino.style.bottom = (parseInt(window.getComputedStyle(dino).bottom) + 5) + 'px';
    }, 20);
}

function updateScore() {
    score += 1;
    scoreElement.innerText = `Score: ${score}`;
}

function createObstacles() {
    setInterval(() => {
        let obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        obstacle.style.animationDuration = `${Math.random() * 3 + 1.5}s`;
        gameContainer.appendChild(obstacle);
        obstacles.push(obstacle);
        setTimeout(() => {
            gameContainer.removeChild(obstacle);
            obstacles.shift();
        }, 4000); // Adjust to match animation duration
    }, 2000); // Time interval for new obstacles
}

function checkCollision() {
    const dinoBottom = parseInt(window.getComputedStyle(dino).bottom);
    obstacles.forEach(obstacle => {
        const obstacleRight = parseInt(window.getComputedStyle(obstacle).right);
        if (obstacleRight > 580 && obstacleRight < 620 && dinoBottom < 40) {
            alert('Game Over! Get It Right!!!');
            window.location.reload();
        }
    });
}
