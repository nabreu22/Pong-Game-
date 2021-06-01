
/*__________ball variables______________*/

let xBall = 300;
let yBall = 200;
let diameter = 13;
let radius = diameter / 2;

/*_______ball speed_________________*/


let ballSpeedX = 6;
let ballSpeedY = 6;

/*_________racket variables_______________*/

let xRacket = 5;
let yRacket = 150;
let widthRacket = 10;
let heightRacket = 90;


/*____________________________________*/

let hit = false


/*________Game Score___________*/

let myScore = 0;
let opponentsScore = 0;
let chanceToMistake = 0;


/*________Game Sounds___________*/
let raquetada;
let score;
let soundTrack;

function preload() {
    soundTrack = loadSound("trilha.mp3");
    score = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

/*________opponent's racket_______________*/

let xOpponentsRacket = 585;
let yOpponentsRacket = 150;
let widthOpponentsRacket = 10;
let heightOpponentsRacket = 90;
let opponentsSpeedY;

/*____________________________________*/

function setup() {
  createCanvas(600, 400);
  soundTrack.loop();
}

function draw() {
  background(0);
  showBall();
  moveBall();
  checksEdgeCollision(); 
  
  showRacket(xRacket, yRacket);
  showRacket(xOpponentsRacket, yOpponentsRacket);
  moveRacket();
  moveOpponentsRacket();
  //checksRacketCollision();
  checksRacketCollision(xRacket, yRacket);
  checksRacketCollision(xOpponentsRacket, yOpponentsRacket);
  includesScore();
  makeScore();
  calculatesChanceToMistakes();
}

function showBall(){
  circle(xBall, yBall, diameter);
}

function moveBall(){
  xBall += ballSpeedX;
  yBall += ballSpeedY;
}

function checksEdgeCollision(){
  if(xBall + radius > width || xBall - radius < 0){
    ballSpeedX *= -1
  }
  if(yBall + radius > height || yBall - radius < 0){
    ballSpeedY *= -1
  }
}


function showRacket(x, y){
  rect(x, y, widthRacket, heightRacket);
}

function moveRacket() {
    if (keyIsDown(UP_ARROW)) {
        yRacket -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRacket += 10;
    }
}

function moveOpponentsRacket(){
   opponentsSpeedY = yBall - yOpponentsRacket - heightOpponentsRacket / 2 - 40;
  yOpponentsRacket += opponentsSpeedY + chanceToMistake;
  calculatesChanceToMistakes();
  
}


function checksRacketCollision() {
    if (xBall - radius < xRacket + widthRacket && yBall - radius < yRacket + heightRacket && yBall + radius > yRacket) {
      ballSpeedX *= -1;
      raquetada.play();
    }
}

function checksRacketCollision(x,y){
   hit = collideRectCircle(x, y, widthRacket, heightRacket, xBall, yBall, radius);
  if(hit){
    ballSpeedX *= -1;
    raquetada.play();
  }
}

function includesScore(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(myScore, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(opponentsScore, 470, 26);
}

function makeScore(){
  if(xBall > 590){
    myScore += 1;
    score.play();
  }
  if(xBall < 10){
    opponentsScore += 1;
    score.play();
  }
}
  
  
function calculatesChanceToMistakes() {
  if (opponentsScore >= myScore) {
    chanceToMistake += 1
    if (chanceToMistake >= 39){
    chanceToMistake = 40
    }
  } else {
    chanceToMistake -= 1
    if (chanceToMistake <= 35){
    chanceToMistake = 35
    }
  }
}
  
  
  
  

