/* UFO*/
class GameObject {
  constructor(name,p,v,s) {
    this.name=name;
    this.position = p;
    this.size = s;
    this.velocity = v;
    this.color='red';
  }

  draw(c) {
    c.save();
    c.beginPath();
    c.arc(this.position.x, this.position.y, 
      this.size.width, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
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