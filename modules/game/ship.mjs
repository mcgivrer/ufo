import {GameObject} from "../core/gameobject.mjs"

class Ship extends GameObject{
    constructor(){
        super("ship")
        this.energy=100
        this.lifes=5
        this.fuel=100
        this.color="yellow"
        this.type = GO_TYPE_RECTANGLE
        this.properties = {
            ...this.properties, 
            mass:10.0
        }
    }


    draw(contect){
        super.draw(context)
    }

    update(elapsed){
        super.update(elapsed)
    }
}