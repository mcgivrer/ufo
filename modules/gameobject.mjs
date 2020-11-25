/* UFO*/
class GameObject {
  constructor(name,p,v,s) {
    this.name=name
    this.position = p
    this.size = s
    this.velocity = v
    this.color='red'
    this.isConstrainedToWindow = true
    this.maxWidth = this.size.width
    this.dw = this.velocity.x

    this.layer=1
    this.priority=1
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
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.size.width += this.dw
    this.dw = this.size.width < 1 || this.size.width > this.maxWidth 
        ? this.dw = - this.dw
        : this.dw = this.dw
    if(this.size.width<0){
      this.size.width = 1
    }
  }
}

export {GameObject};