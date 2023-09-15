const gameContainer = document.getElementById('game');
const control= document.getElementById("line")
const paddle1 = document.getElementById('paddle1');
const paddle2 = document.getElementById('paddle2');
const ball = document.getElementById('ball');
const dot = document.getElementById('dot');

let paddle1PosX = 150;
let paddle2PosX= 150;
let ballPosX = 150;
let ballPosY = 250;
let ballSpeedX = 3;
let  ballSpeedY = 3;
let paddle1SpeedX = 3;
let paddle2SpeedX = 6;
let score1 = 0;
let dotPosX = 150;

let isDragging = false;


function update() {
  paddle1.style.left = paddle1PosX + 'px';
  paddle2.style.left = paddle2PosX + 'px';
  ball.style.left = ballPosX + 'px';
  ball.style.top = ballPosY + 'px';
  dot.style.left = dotPosX + 'px';



  //ball run
  ballPosX += ballSpeedX;
  ballPosY += ballSpeedY;


//run score1
  if (ballPosY >= 480 &&( ballPosX>(paddle2PosX+60))){
    ballPosX = paddle1PosX;
    ballPosY = 0;
    ballSpeedX = paddle1SpeedX= paddle2SpeedX=  3;
    ballSpeedY = 3;
    score1+=1;
  }
  else if(ballPosY >= 480 &&( ballPosX<(paddle2PosX-60))){
    ballPosX = paddle1PosX;
    ballPosY = 0;
    ballSpeedX = paddle1SpeedX= paddle2SpeedX= 3;
    ballSpeedY = 3;
    score1+=1;
  }
  if(score1 == 6){
    score1=0;
    alert("Game over!");
  }
  document.getElementById("score1").innerHTML=score1;
//paddle1 run
  if (ballPosY <= 450 && ballSpeedY < 0){
    if(paddle1PosX > ballPosX){
      paddle1PosX-=paddle1SpeedX;
    }
    else if(paddle1PosX < ballPosX){
      paddle1PosX+=paddle1SpeedX;
    }
  }
  
//ball + speed
  if (paddle1PosX >= 250){
    paddle1PosX = 250;
  }

  if (ballPosX >= 280 || ballPosX <= 0) {
    ballSpeedX *= -1.007;
    paddle1SpeedX *= 1.007;
    paddle2SpeedX *= 1.007;
  }

  if (ballPosY >= 480 || ballPosY <= 0) {
    ballSpeedY *= -1.007;

  }

  if (ballPosY >= 280 && ballPosY <= 20 && ballPosX >= paddle2PosX && ballPosX <= paddle2PosX ) {
    ballSpeedY *= -1.007;

  }


  requestAnimationFrame(update);
}


function movePaddle(e) {
  const containerWidth = gameContainer.clientWidth;

//paddle2 run
//controler

dot.addEventListener("mousedown", function(event) {
  isDragging = true;
  dotPosX= event.clientX - containerWidth*2 - 50;
  paddle2PosX = dotPosX;
});

document.addEventListener("mousemove", function(event) {
  if (isDragging) {
    if (dotPosX < event.clientX - containerWidth*2 -50){
      dotPosX += paddle2SpeedX;
      paddle2PosX = dotPosX;
     }
    if (dotPosX > event.clientX - containerWidth*2){
      dotPosX -= paddle2SpeedX;
      paddle2PosX = dotPosX;
     }

     if(dotPosX < 0){
      dotPosX = 0;
    }
    if(dotPosX >= 250){
      dotPosX =250;
    }
    if (paddle2PosX < 0) {
      paddle2PosX = 0;
    }
    
    if (paddle2PosX > 300-50) {
      paddle2PosX = 300 - 50;
    }
  }
});

document.addEventListener("mouseup", function() {
  isDragging = false;
});

}

document.addEventListener('mousedown', movePaddle);
requestAnimationFrame(update);
