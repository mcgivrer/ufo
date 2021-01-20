import {BoundingBox} from "./boundingbox.mjs"

let GO_NODURATION=-999
let GO_TYPE_RECTANGLE=1
let GO_TYPE_CIRCLE=2
class GameObject {

  constructor(name,p = {x:0,y:0},v = {x:0,y:0},s = {x:0,y:0}, a = {x:0,y:0}) {
    this.name=name
    this.position = p
    this.size = s
    this.velocity = v
    this.acceleration = a
    this.forces=[]
    this.color = 'red'
    this.isConstrainedToWindow = true
    this.layer = 1
    this.priority = 1
    this.active = true
    this.duration = 0
    this.type = GO_TYPE_RECTANGLE

    this.properties = {
      elasticity: 1.0,
      friction: 1.0,
      mass: 1.0,
      maxSpeed:{ x: 12,y: 12},
      maxAcc:{ x: 0,y: 0}
    }
    this.bbox = new BoundingBox(this)
    this.contact = false;
  }

  draw(c) {
    c.save()
    c.beginPath()
    c.arc(this.position.x, this.position.y, 
      this.size.width/2, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    c.restore()
  }

  update(elapsed) {
    this.bbox.update(this)
  }
}

export {GameObject,GO_NODURATION,GO_TYPE_RECTANGLE,GO_TYPE_CIRCLE};
