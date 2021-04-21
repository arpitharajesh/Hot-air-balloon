var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database, pos, balloonpos;
//var x,y;
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  
  createCanvas(1500,700);

  balloonpos = database.ref('Balloon/position');
  balloonpos.on("value", readPosition, showError);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updatePosition(-1, 0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
  }
  else if(keyDown(RIGHT_ARROW)){
    updatePosition(1,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)){
    updatePosition(0, -1);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale - 0.01;
    //write code to move air balloon in up direction
  }
  else if(keyDown(DOWN_ARROW)){
    updatePosition(0, 1);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    balloon.scale = balloon.scale + 0.01;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function updatePosition(x,y){
  database.ref('Balloon/position').set({
    'x': pos.x + x, 
    'y': pos.y + y
  })
}
function readPosition(data){
    pos = data.val();
    balloon.x = pos.x;
    balloon.y = pos.y;
}

function showError(){
  console.log("Error is in the code written in database")
}