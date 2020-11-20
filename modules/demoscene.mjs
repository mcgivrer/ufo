import {Scene} from './scene.mjs';
import {GameObject} from './gameobject.mjs';

class DemoScene extends Scene{
    constructor(g){
        super(g);
        this.add(new GameObject("player",
            {x:g.stageConfig.width/2,y:g.stageConfig.height/2},
            {x:2,y:2},
            {width:32,height:32}))
    }
}

export {DemoScene}