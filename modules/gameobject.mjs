/* UFO*/
class GameObject {
  constructor(name,p,v,s) {
    this.name=name
    this.position = p
    this.size = s
    this.velocity = v
    this.acceleration = {x:0,y:0}
    this.color='red'
    this.isConstrainedToWindow = true
    this.layer=1
    this.priority=1

    this.properties = {
      elasticity: 1.0,
      rugosity: 1.0,
      mass:1.0
    }
    this.contact=false;
  }

  draw(c) {
    c.save()
    c.beginPath()
    c.arc(this.position.x, this.position.y, 
      this.size.width, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    c.restore()
  }

  update(elapsed) {
  }
}

export {GameObject};