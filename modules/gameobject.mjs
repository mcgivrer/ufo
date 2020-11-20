/* UFO*/
class GameObject {
  constructor(name,position,velocity,size) {
    this.name=name;
    this.position = position | {x:0,y:0};
    this.size = size | {width:32,height:32};
    this.velocity = velocity| {x:0,y:0};
  }

  draw(c) {
    c.save();
    c.beginPath();
    c.arc(this.position.x, this.position.x, 50, 0, Math.PI * 2, false);
    c.fillStyle = "red";
    c.fill();
    c.closePath();
    c.restore();
  }

  update(elapsed) {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

export {GameObject};