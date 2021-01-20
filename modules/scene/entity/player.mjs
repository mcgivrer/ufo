import {GameObject,GO_NODURATION,GO_TYPE_RECTANGLE} from '/modules/core/gameobject.mjs'
class Player extends GameObject{
    constructor(name,x,y){
        super(
            name,
            { x: x,  y: y },
            { x: 0, y: 0},
            { width: 32, height:64 });
        this.duration=GO_NODURATION
        this.type=GO_TYPE_RECTANGLE
        this.layer=2
        this.priority=1
        this.color = 'rgba(100,100,50,100)'
        this.debug=2
        
        this.properties = {
            elasticity:0.2,
            mass:2.0,
            friction:0.6,
            maxSpeed:{ x: 4 ,y: 4},
            dacc:{ x: 1.4,y: 1.4}
        }
        this.update()
    }

    draw(c) {
        c.save()
        c.fillStyle = this.color
        c.fillRect(this.position.x-(this.size.width/2), this.position.y-(this.size.height/2), 
          this.size.width, this.size.height)
        c.restore()
    }
    update(elapsed){
        super.update(elapsed)
    }
}

export {Player}