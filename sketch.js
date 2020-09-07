var trexRun, trexCollide, trex
var ground, gImg, invisibleG
var cloudImg, obs1, obs2, obs3,obs4, obs5, obs6
var count=0

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ObstaclesGroup;
var CloudsGroup;

var gameOver,gimg ;
var restart,rimg;

var checkpoint, die, jump

//set text

//score
var count = 0;

function preload(){
trexRun= loadAnimation("trex1.png","trex3.png","trex4.png")
trexCollide=loadImage("trex_collided.png")
gImg= loadImage("ground2.png")
cloudImg= loadImage("cloud.png") 
obs1 = loadImage("obstacle1.png") 
obs2 = loadImage("obstacle2.png") 
obs3 = loadImage("obstacle3.png") 
obs4 = loadImage("obstacle4.png") 
obs5 = loadImage("obstacle5.png") 
obs6 = loadImage("obstacle6.png") 
gimg = loadImage("gameOver.png");
rimg = loadImage("restart.png");
checkpoint= loadSound("checkPoint.mp3")
die =loadSound("die.mp3")
jump=loadSound("jump.mp3")
  
}

function setup() {
  createCanvas(600, 200);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gimg)
  

 
  
  

  trex=createSprite(50,180)
  trex.addAnimation("running",trexRun)
  trex.addAnimation("trexCollide",trexCollide)
  trex.scale=0.5
  
  
  ground = createSprite(200,180,400,20);
  ground.addImage(gImg);
  ground.x = ground.width /2;
  invisibleG = createSprite(200,185,400,5);
  invisibleG.visible = false;
  ground.velocityX = -(6 + 3*count/100);
 
  restart = createSprite(300,140);
  restart.addImage(rimg)
  restart.scale=0.6;

  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup= new Group()
  CloudsGroup= new Group()


}
 
function draw() {
  background(280);
  
  text("Score: "+ count, 500, 50);
  
  
  if(gameState === PLAY){
  count = count + Math.round(getFrameRate() /60);
  ground.velocityX = -(6 + 3*count/100);
  
    if (count>0 && count%100 === 0){
      checkpoint.play();
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
  
  if(keyDown("space") && trex.y >= 159){
      trex.velocityY = -12 ;
    jump.play()
     }
 trex.velocityY = trex.velocityY + 0.8;
  spawnClouds();
  spawnObstacles();
  if(ObstaclesGroup.isTouching(trex)){
  gameState = END;
    die.play() 
  }     
  }
  
  else if (gameState===END){
  ground.velocityX=0
  CloudsGroup.setVelocityXEach (0);  
  ObstaclesGroup.setVelocityXEach ( 0);
  CloudsGroup.setLifetimeEach(-1) ; 
  ObstaclesGroup.setLifetimeEach(-1) ;
  trex.changeAnimation("trexCollide",trexCollide)
  gameOver.visible = true;
  restart.visible = true; 
  
    if(mousePressedOver(restart)) {
    reset();
  }
    
  }
trex.collide(invisibleG)
 drawSprites()
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 230;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    CloudsGroup.add(cloud);
  
  }
} 

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
    
    switch (rand) {

  case 1:
    obstacle.addImage(obs1);
    break;
  case 2:
    obstacle.addImage(obs2);
    break;
  case 3:
    obstacle.addImage(obs3);
    break;
  case 4:
    obstacle.addImage(obs4);
    break;
  case 5:
    obstacle.addImage(obs5);
    break;
  case 6:
    obstacle.addImage(obs6);
}
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    ObstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
trex.changeAnimation("running",trexRun)
  
  count = 0;
}