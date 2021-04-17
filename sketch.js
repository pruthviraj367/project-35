var ball;
var db
var ballPosition


function preload(){
backgroundImg = loadImage("Hot Air Ballon-01.png")
balloon = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")


}

function setup(){
    createCanvas(500,500);
    db = firebase.database();

    ball = createSprite(80,450,10,10);
    ball.scale= 0.3;
    ball.addAnimation("balloon",balloon)
    ball.shapeColor = "red";

    //on switch == read the position of ball when it changes
    var positionref = db.ref('ball/position');
    positionref.on("value", readposition,showError);
}

function draw(){
    background(backgroundImg);
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}
//update database with change in position
function changePosition(a,b){

 db.ref('ball/position').update({

    'x': ball.x + a,
    'y':  ball.y + b,
 })
  
    
}

function readposition(data){
    ballPosition = data.val();
    ball.x = ballPosition.x;
    ball.y = ballPosition.y
}

function showError(){
    console.log("u cannot win");
}
