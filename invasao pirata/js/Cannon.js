class Cannon {
  constructor(x, y, width, height, angle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.cannonImg = loadImage("assets/canon.png")
    this.baseImg = loadImage("assets/cannonBase.png")
  }
  display(){
    console.log(this.angle)
    if(keyIsDown(RIGHT_ARROW)&& this.angle < 57){
      this.angle += 1
    }
    if(keyIsDown(LEFT_ARROW)&& this.angle >-46){
      this.angle -= 1
    }
    //cano do canhao
    push ()
    translate(this.x,this.y)
    rotate(this.angle)
    imageMode(CENTER)
    image (this.cannonImg,0,0,this.width,this.height)
    pop ()
    //base do canhao
   image (this.baseImg,70,20,200,200)
  }
}