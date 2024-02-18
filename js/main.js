const player = document.querySelector('#player');
const obstacle = document.querySelector('#obstacle');
const scoreDisplay = document.querySelector('#score');
const gameContainer = document.querySelector('#game-container');
const floor = document.querySelector('#floor');

let score = 0;
let isJumping = false;
let obstacleSpeed = 3;
let gameOver = false;

function jump() {
    if (!isJumping) {
        isJumping = true;
        player.classList.add('jump');

        function executeWithDelay(func, times, delay) {
            let count = 0;
          
            function execute() {
              if (count < times) {
                func();
                count++;
                setTimeout(execute, delay);
              }
            }
          
            execute();
        }
          
        executeWithDelay(renderJumpingCharacter, 11, 1000/11);
        setTimeout(() => {
            player.classList.remove('jump');
            isJumping = false;
        }, 1000);
    }
}

function updateScore() {
    score++;
    scoreDisplay.textContent = 'Score: ' + score;
}

function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        playerRect.bottom > obstacleRect.top &&
        playerRect.right-70 > obstacleRect.left &&
        playerRect.left +75 < obstacleRect.right
        
        ){
            obstacle.style.animation = "none";
            endGame();
        }
}
    
function endGame() {
    gameOver = true;

        Swal.fire({
            title: 'Game Over',
            text: 'Your Score:  '+ score,
            icon: 'warning',
            confirmButtonText: 'OK',
            width: '350px',
            heightAuto: 'false',
            iconColor: '#b86565',
            color: 'black'
          }).then((result) => {
            if (result.isConfirmed) {
              gameOver = false;
              obstacle.style.right = '0px';
              score = 0;
              obstacleSpeed = 3;
              obstacle.style.animation = "rotateAnimation 1s infinite linear";
              scoreDisplay.textContent = 'Score: 0';
            }
          });

}


function moveObstacle() {
    if(!gameOver){
        const currentPosition = parseInt(getComputedStyle(obstacle).right);
        const newPosition = currentPosition + obstacleSpeed;

        if (newPosition > window.innerWidth) {
            updateScore();
            obstacle.style.right = '0px';
        } else {
            obstacle.style.right = newPosition + 'px';
        }

        checkCollision();
    }
}

function speed(){
    setInterval(()=>{
        obstacleSpeed = Math.floor(Math.random() * 6) + 2;
    },4000)
}
speed();

gameContainer.addEventListener('click', (e)=> {
    if(!gameOver) jump();
});

document.addEventListener('keydown',(e)=>{
    if ((e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'Enter') && !gameOver ) {
        jump();
    }
});

setInterval(moveObstacle, 0.5);

let indexJump = 1;
function renderJumpingCharacter(){
    if (isJumping){
        if (indexJump >= 12) indexJump = 1;
        player.style.backgroundImage = 
            `url('img/character/Jump (${indexJump++}).png')`;
    }
}

let indexRun = 1;
function renderRunCharacter(){

    if (indexRun >= 9) indexRun = 1;
    player.style.backgroundImage = 
        `url('img/character/Run (${indexRun++}).png')`;
    
}

setInterval(()=>{
    if(!isJumping && !gameOver){
        renderRunCharacter();
}},70); 

setInterval(()=>{
    if(gameOver){
        floor.style.animation = 'none';
        obstacle.style.animation = 'none';
    }else{
        floor.style.animation = 'slidingFloor 8s infinite linear';
        obstacle.style.animation = 'rotateAnimation 1s infinite linear';
    }
},5);

