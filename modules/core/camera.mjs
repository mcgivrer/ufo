import {GameObject} from './gameobject.mjs'

class Camera extends GameObject{
    constructor(name,tween,target){
        super(name)
        this.tween = tween
        this.target = target
    }

    update(elapsed){
        this.position.x += (this.position.x -this.target.position.x) * this.tween
        this.position.y += (this.position.y -this.target.position.y) * this.tween
    }

    draw(c){
        c.strokeColor = 'yellow'
        c.rect(this.position.x,this.position.y,this.size.width,this.size.height)
    }
}
export {Camera}