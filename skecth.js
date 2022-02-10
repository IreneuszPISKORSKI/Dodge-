var circlePosX = 25;
var circlePosY = 25;
var czerw = 255;
var ziel = 0;
var nieb = 255;
var jouerX = 320;
var jouerY = 320;
let triangleXspeed = 3.5;
let triangleYspeed = 6;
var triangleX = 200;
var triangleY = 300;
let triangleXdirection = 1;
let triangleYdirection = 1;
var enemyX = 100;
var enemyY = 500;
let enemy2X = 1200;
let enemy2Y = 1200;
var enemyDirectionX = 1;
var enemy2DirectionX = 1;
var enemy2DirectionY = 1;
var gameOver = 1;
let button;
var restart = 0;
let numberOfLifes = 5;
let timePass = 0;
let lastScore = 0;
let bestScore = 0;
let randomPossibilites = [-2, -1, -0.5, 0, 0.5, 1, 2,];
let randomDirectionX = 0;
let randomDirectionY = 0;
let enemiesX = [];
let enemiesY = [];
let enemiesDirectX = [];
let enemiesDirectY = [];
let enemiesRandomX = [];
let enemiesRandomY = [];
let enemyDiameter = 20;

function setup() {
    createCanvas(800, 640);
    button = createButton('GO!');
    button.position(-100, 0);
    button.mouseClicked(restartMe);
  }

function draw() {
    
    if (gameOver==1){ 
        background(50, 100, 150);  
        board(); 
        draw_forms();
        change_positions();                             // change positions, colors
        controls();
        block_out_of_screen();
        enemy();  
        scoreBoard();    
        // measuringInstrument();                       //for positioning
        score();
    } else {
        gameOverMan();
        button.position(380, 380);
    }
}

function score(){
    // lastScore = round(millis()/1000) - lastScore;    // it doesn't work properly I threw FrameCount instead, any another possibilities so that it works as a counter and has the ability to be reset?

    if (frameCount % 60 == 0) {
        timePass ++;
    }
    strokeWeight(1);
    textSize(30);
    fill(0);
    stroke(0);
    text('Score', 650, 50);  
    text(timePass, 650, 90);
    strokeWeight(1);
    textSize(20);
    fill(0);
    stroke(0);
    if (timePass>bestScore){
        bestScore=timePass;
    }   
    text('Best score:', 650, 120);
    text(bestScore, 650, 140);
}

function scoreBoard(){
    push;
    noStroke();
    fill(50, 100, 150);
    rect(640,0, 160, 640);
    pop;
    strokeWeight(1);
    textSize(30);
    fill(0);
    stroke(0);

    text('Lives left:', 650, 200);
    text(numberOfLifes, 700, 240);
    
}

function gameOverMan(){
    if (gameOver == 0){
        textSize(100);
        strokeWeight(0) ;
        if (numberOfLifes < 1){
        text('GAME OVER', 115, 250);
        numberOfLifes = 5;
        }
        textSize(20);
        text('Try again!', 350, 350);
    }
}

function restartMe(){
    circlePosX = 25;
    circlePosY = 25;
    jouerX = 320;
    jouerY = 320;
    triangleX = 200;
    triangleY = 300;
    triangleXdirection = 1;
    triangleYdirection = 1;
    enemyX = 100;
    enemyY = 500;
    enemy2X = 1200;
    enemy2Y = 1200;
    enemyDirectionX = 1;
    enemy2DirectionX = 1;
    enemy2DirectionY = 1;
    enemiesX = [];
    enemiesY = [];
    enemiesDirectX = [];
    enemiesDirectY = [];
    enemiesRandomX = [];
    enemiesRandomY = [];
    enemyDiameter = 20;

    gameOver = 1;
    button.position(-100,0);
    timePass = 0;
}

function board() {
    stroke(0,100,0);
    strokeWeight(5);
    fill(100,100,150);
    rect(0,0,640); 
}

function measuringInstrument(){
    let x1 = 0;
    let y1 = 0;
    let x2 = mouseX;
    let y2 = mouseY;
    strokeWeight(1);
    line(x1, y1, 0, y2);
    line(x1, y1, x2, 0);
    line(x2, 0, x2, y2);
    line(0, y2, x2, y2);
    fill(0);
    noStroke();
    ellipse(x2, y2, 2, 2);
    let d1 = dist(x1, y1, 0, y2);
    let d2 = dist(x1, y1, x2, 0);
    push();
    translate(5,20+ (y1 + y2) / 2);
    rotate(0);
    textSize(10)
    text(nfc(d1, 1), 0, -5);
    pop();
    push();
    translate(5+ (x1 + x2) / 2, 20);
    rotate(0);
    textSize(10)
    text(nfc(d2, 1), 0, -5);
    pop();
}

function block_out_of_screen(){
    if (jouerX > 625){
        jouerX = 625;
        stroke(255, 0, 0);
        strokeWeight(3);
        line(640, 640, 640, 0);
        circle(jouerX, jouerY, 30);
    }    
    if (jouerX < 15){
        jouerX = 15;
        stroke(255, 0, 0);
        strokeWeight(3);
        line(0, 0, 0, 640);
        circle(jouerX, jouerY, 30);
    }
    if (jouerY > 625){
        jouerY = 625;
        stroke(255, 0, 0);
        strokeWeight(3);
        line(640, 640, 0, 640);
        circle(jouerX, jouerY, 30);
    }
    if (jouerY < 15){
        jouerY = 15;
        stroke(255, 0, 0);
        strokeWeight(3);
        line(0, 0, 640, 0);
        circle(jouerX, jouerY, 30);
    }
}

function draw_forms(){                              // forms
    stroke(0,255,0);
    strokeWeight(3);
    fill(czerw, ziel, nieb);
    circle(jouerX, jouerY, 30);                     


    stroke(255, 0, 0);
    strokeWeight(5);
    fill(czerw, nieb, ziel);
    circle(circlePosX, circlePosY, enemyDiameter*2);

    stroke(0);
    strokeWeight(2);
    fill(0);
    circle(enemyX, enemyY, enemyDiameter);                        // enemy
    circle(enemy2X, enemy2Y, enemyDiameter);
    stroke(0);
    strokeWeight(3);
    fill(ziel, czerw, nieb);
    // triangle(triangleX-20, triangleY, triangleX+20, triangleY+20, triangleX+20, triangleY-20);
}

function change_positions(){
    circlePosX = circlePosX + 1.5;                  // change the value of position X
    circlePosY = circlePosY + 4;                    // change the value of position Y
    czerw = czerw - 1;                              // change in color (red) intensity
    ziel = ziel + 1;                                // change in color (green) intensity
    nieb = nieb - 1;                                // change in color (blue) intensity
    // fill(czerw, ziel, nieb);                     // color value

    if (circlePosX > 640) {
        circlePosX = 0;
    }
    if (circlePosY > 640) {
        circlePosY = 0;
    }
    if (czerw<0){
        czerw = 255;
        ziel = 0;
        nieb = 255;
    }
}

function controls(){
    if (keyIsDown(LEFT_ARROW) || keyIsDown(81) || keyIsDown(65)){
        jouerX = jouerX - 10;
    }

    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)){
    jouerX = jouerX + 10;
    } 

    if (keyIsDown(UP_ARROW) || keyIsDown(90) || keyIsDown(87)){
        jouerY = jouerY - 10;
    }
    
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)){
        jouerY = jouerY + 10;
    }

    // if (jouerX < 0) {                               // wallhack start
    //     jouerX = 640;
    // }
    
    // if (jouerX > 640) {
    //     jouerX = 0;
    // }
    
    // if (jouerY < 0) {
    //     jouerY = 640;
    // }
    
    // if (jouerY > 640) {
    //     jouerY = 0;
    // }                                               // wallhack end
}

function enemy(){
    if (jouerX<enemyX){                                 //kamikaze
        enemyX--;
    }else{
        enemyX++;
    }

    if (jouerY<enemyY){
        enemyY--;
    }else{
        enemyY++;
    }

    // if(enemyX<10 || enemyX>630){                       //vertical version of 1st enemy
    //     enemyDirectionX *= -1;
    // }

    // if(frameCount % 120 == 0){
    //     randomDirectionX = random(randomPossibilites);
    // }
    // if(frameCount % 180 == 0){
    //     randomDirectionY = random(randomPossibilites);
    // }

    // enemy2X = enemy2X + 3* enemy2DirectionX * randomDirectionX;
    // enemy2Y = enemy2Y + 3* enemy2DirectionY * randomDirectionY;

    // if (timePass==5){
    //     enemy2X = circlePosX;
    //     enemy2Y = circlePosY;
    // }

    // if (timePass > 5 && enemy2X<10){
    //     enemy2X = 10;
    //     enemy2DirectionX *=-1;
    // }

    // if (timePass > 5 && enemy2X>630){
    //     enemy2X = 630;
    //     enemy2DirectionX *=-1;
    // }

    // if (timePass > 5 && enemy2Y<10){
    //     enemy2Y = 10;
    //     enemy2DirectionY *=-1;
    // }

    // if (timePass > 5 && enemy2Y>630){
    //     enemy2Y = 630;
    //     enemy2DirectionY *=-1;
    // }
    
    let enemy1=dist(jouerX, jouerY, enemyX, enemyY);
    let enemy0=dist(jouerX, jouerY, circlePosX, circlePosY);
    let enemy2=dist(jouerX, jouerY, enemy2X, enemy2Y);
    let enemiesDist;
    let enemyNumber = [];
    let index = round(timePass/8);

        
        enemiesX.push(circlePosX);
        enemiesY.push(circlePosY);
        enemiesDirectX.push(1);
        enemiesDirectY.push(1);
        enemiesRandomX.push(1);
        enemiesRandomY.push(1);
        
    for (enemyNumber = 0; enemyNumber < index; enemyNumber++){
        enemiesX.push(circlePosX);
        enemiesY.push(circlePosY);

        if (frameCount % 120 == enemyNumber*6){
            enemiesRandomX[enemyNumber] = random(randomPossibilites);
        }
        
        if (frameCount % 180 == enemyNumber*6){
            enemiesRandomY[enemyNumber] = random(randomPossibilites);
        }

        enemiesX[enemyNumber] = enemiesX[enemyNumber] + 3* enemiesDirectX[enemyNumber] * enemiesRandomX[enemyNumber];
        enemiesY[enemyNumber] = enemiesY[enemyNumber] + 3* enemiesDirectY[enemyNumber] * enemiesRandomY[enemyNumber];

        if (enemiesX[enemyNumber] < 10){
            enemiesX[enemyNumber] = 10;
            enemiesDirectX[enemyNumber] *=-1;
        }
        if (enemiesX[enemyNumber] >630){
            enemiesX[enemyNumber] = 630;
            enemiesDirectX[enemyNumber] *=-1;
        }
    
        if (enemiesY[enemyNumber] <10){
            enemiesY[enemyNumber] = 10;
            enemiesDirectY[enemyNumber] *=-1;
        }
        if (enemiesY[enemyNumber] >630){
            enemiesY[enemyNumber] = 630;
            enemiesDirectY[enemyNumber] *=-1;
        }

        push;
        stroke(0);
        strokeWeight(2);
        fill(0);
        circle (enemiesX[enemyNumber], enemiesY[enemyNumber], enemyDiameter);
        pop;
      
        ;
      
      
        enemiesDist = dist (jouerX, jouerY, enemiesX[enemyNumber], enemiesY[enemyNumber]);
    if (enemy1 <= 15 +enemyDiameter / 2 || enemy2 <= 15 + enemyDiameter/2 || enemy0 <= 15 + enemyDiameter || enemiesDist <= 15 + enemyDiameter/2){
        gameOver = 0;
        numberOfLifes --;
    }}
       
}