const player = document.querySelector('#player');
const obstacle = document.querySelector('#obstacle');

let isJumping = false;

function jump() {
    if (!isJumping) {
        isJumping = true;
        player.classList.add('jump');

        setTimeout(() => {
            player.classList.remove('jump');
            isJumping = false;
        }, 1000);
    }
}

let obstacleSpeed = 3;

function moveObstacle() {
    const currentPosition = parseInt(getComputedStyle(obstacle).right);
    const newPosition = currentPosition + obstacleSpeed;

    if (newPosition > window.innerWidth) {
        obstacle.style.right = '0px';
    } else {
        obstacle.style.right = newPosition + 'px';
    }
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


