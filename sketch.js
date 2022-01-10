var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var edges;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);

  spookySound.loop(true);
  tower = createSprite(300,300);
  tower.addImage("tower.png",towerImg);
  tower.velocityY = 10;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost-standing.png", ghostImg);
}


function draw() {
  background(255);
  edges = createEdgeSprites();
  ghost.setCollider("rectangle",-15,25,100,250);
 if(tower.y>600){
      tower.y = height/4;
    } 
  
  if (gameState === "play") {

    if(keyDown("a")||keyDown("LEFT_ARROW")){
        ghost.x = ghost.x - 3;
    }

    if(keyDown("d")||keyDown("RIGHT_ARROW")){
      ghost.x = ghost.x + 3;
    }
    if(keyDown("w")||keyDown("UP_ARROW")){
      ghost.velocityY = -10;
    }

    ghost.velocityY = ghost.velocityY + 0.8;
    spawnDoors();

     if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 1
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y >= 600 || ghost.y <= 0){
      ghost.destroy();
      gameState = "end";
    }

  ghost.debug = true;
  drawSprites();
}
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
}

function spawnDoors()
 {
  if (frameCount % 240 === 0) {
    var door = createSprite(random, -50);
    door.x = Math.round(random(100,500));
    var climber = createSprite(random,10);
    climber.x = door.x;
    var invisibleBlock = createSprite(random,15);
    invisibleBlock.x = door.x;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
     
    ghost.depth = door.depth;
    climber.depth = door.depth+1;
    ghost.depth = ghost.depth+2;

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

