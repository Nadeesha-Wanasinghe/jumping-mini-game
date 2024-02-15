const player = document.querySelector('#player');
const obstacle = document.querySelector('#obstacle');

let isJumping = false;
let obstacleSpeed = 3;

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
    alert('Game Over!');
    let obstacleSpeed = 3;
    obstacle.style.right = '0px';
    obstacle.style.animation = "rotateAnimation 1s infinite linear";
}

function moveObstacle() {
    const currentPosition = parseInt(getComputedStyle(obstacle).right);
    const newPosition = currentPosition + obstacleSpeed;

    if (newPosition > window.innerWidth) {
        obstacle.style.right = '0px';
    } else {
        obstacle.style.right = newPosition + 'px';
    }

    checkCollision();
}

document.addEventListener('click', (e)=> {
    jump();
  });

document.addEventListener('keydown',(e)=>{
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'Enter') {
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
    if(!isJumping){
        renderRunCharacter();
    }},70); 

