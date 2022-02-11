const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon, cannonball;
var balls = []
var boats = []

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  angleMode(DEGREES)
  angle = 60
  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);
  cannon = new Cannon(180,110,130,100,angle)
  boat = new Boat(width -79, height -60, 170,170, -80)
  //cannonball = new CannonBall(cannon.x, cannon.y)
}

function draw() {
  image(backgroundImg,0,0,1200,600)
  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);
  

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();  

  cannon.display()
  showBoats()
  for (let i= 0; i < balls.length; i++) {
    showCannonBalls(balls[i],i)
    collisionWithBoat(i)
  }
}
function keyReleased(){
  if(keyCode === DOWN_ARROW){
    balls[balls.length - 1].shoot()
  }
}
function keyPressed(){
  if(keyCode === DOWN_ARROW){
    cannonball = new CannonBall(cannon.x, cannon.y)
    balls.push(cannonball)
  }
}
function showCannonBalls(ball,i){
  if(ball){
    ball.display()
    if (ball.body.position.x >= width || ball.body.position.y >= height-50) {
      Matter.World.remove(world,ball.body)
      balls.splice(i,1)
    }
  }

}
function showBoats(){
  if (boats.length > 0) {
    if (boats[boats.length - 1].body.position.x < width -300 || 
      boats[boats.length-1]===undefined) {
      var positions = [-40,-60,-70,-20]
      var position = random(positions)
      var boat = new Boat(width -79, height -60, 170,170, position)
      boats.push(boat)
    }
    for (let i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, {x:-0.9,y:0})
       boats[i].display()
      }
    }
  } else {
    var boat = new Boat(width -79, height -60, 170,170, -80)
    boats.push(boat)
  }
}
function collisionWithBoat(index){
  for (let i = 0; i < boats.length; i++) {
    if (balls[index]!==undefined && boats[i]!==undefined) {
      var collision = Matter.SAT.collides(boats[i].body,balls[index].body)
      if (collision.collided) {
        boats[i].removeBoat(i)
        Matter.World.remove(world,balls[index].body)
        balls.splice(index,1)
        
      }
    }
  }
}