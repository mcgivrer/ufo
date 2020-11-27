import {GameObject} from './gameobject.mjs'

class Ball extends GameObject{
    constructor(name,p,v,s){
        super(name,p,v,s)
        this.maxWidth = this.size.width
        this.dw = this.velocity.x
    }

    update(elapsed) {

        this.size.width += this.dw
        this.dw = this.size.width < 1 || this.size.width > this.maxWidth 
            ? this.dw = -this.dw
            : this.dw = +this.dw
        if(this.size.width<0){
          this.size.width = 1
        }
      }
}

export {Ball}