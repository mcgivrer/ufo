import {GameObject} from './gameobject.mjs'
class Camera extends GameObject{
    constructor(name, tween, target, viewport){
        super(name)
        this.tween = tween
        this.target = target
        this.viewport = viewport
        this.size = viewport
    }

    update(elapsed){
        this.position.x += (
            (this.target.position.x + this.target.size.width - this.viewport.width * 0.5) 
            - this.position.x) * this.tween * elapsed;
        this.position.y += (
            (this.target.position.y + this.target.size.height - this.viewport.height * 0.5) 
            - this.position.y) * this.tween * elapsed;
    }

    draw(c){
        c.strokeColor = 'yellow'
        c.rect(this.position.x,this.position.y,this.size.width,this.size.height)
    }
}
export {Camera}