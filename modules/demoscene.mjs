import {Scene} from './scene.mjs';
import {GameObject} from './gameobject.mjs';

class DemoScene extends Scene{
    constructor(g){
        super(g);
        for(let i=0;i<10;i++){
            var px = Math.random()*g.stageConfig.width;
            var py = Math.random()*g.stageConfig.height;
            var ps = Math.random()*32;
            var dx = (Math.random()*10)-5;
            var dy = (Math.random()*10)-5;
            var pc = 'rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+','+'255)'
            
            var o = new GameObject("player",
                {x:px,y:py},
                {x:dx,y:dy},
                {width:ps, height:ps})
                o.color=pc
            this.add(o)
        }
    }
}

export {DemoScene}