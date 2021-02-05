import {BoundingBox} from "./boundingbox.mjs"
import {GameObjectType} from './gameobjecttype.mjs'

let GO_NODURATION=-999
class GameObject {

  constructor(name,p = {x:0,y:0},v = {x:0,y:0},s = {width:0,height:0}, a = {x:0,y:0}) {
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
    this.type = GameObjectType.RECTANGLE

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

  update(elapsed) {
    this.bbox.update(this)
  }
}

export {GameObject,GO_NODURATION};
