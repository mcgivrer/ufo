import { GO_TYPE_CIRCLE } from "../core/gameobject.mjs"
import {GameObject} from "../core/gameobject.mjs"

class Asteroid extends GameObject{
    constructor(index,mass){
        super("asteroid_"+index)
        this.energy=100
        this.color = "gray"
        this.type = GO_TYPE_CIRCLE        
        this.properties = {
            ...this.properties, 
            mass:mass
        }
    }

    

    draw(contect){
        super.draw(context)
    }

    update(elapsed){
        super.update(elapsed)
    }
}