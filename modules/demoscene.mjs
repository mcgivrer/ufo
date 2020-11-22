import {Scene} from './scene.mjs';
import {GameObject} from './gameobject.mjs';

class DemoScene extends Scene{
    constructor(g){
        super(g);
        this.numberObjects=20
        this.index=0

    }

    init(game){
        this.objects=[]
        this.generateBatch(game,'enemy_',20)
    }

    generateBatch(game, name, number){
        this.numberObjects+=number
        for(let i=0;i<number;i++){
            this.generate(game,name+(this.index++))
        }
    }

    generate(game,name){
        // size
        var ps = Math.random()*32;
        // position
        var px = ps+Math.random()*game.stageConfig.width;
        var py = ps+Math.random()*game.stageConfig.height;
        // velocity
        var dx = (Math.random()*10)-5;
        var dy = (Math.random()*10)-5;
        // color
        var pc = 'rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+','+'255)'

        var o = new GameObject(name,
            {x:px,y:py},
            {x:dx,y:dy},
            {width:ps, height:ps})
            o.color=pc
        this.add(o)
    }

    keyReleased(e){
        super.keyReleased(e)
        switch(e.keyCode){
            case 40:
                for(let i=0;i<2;i++){
                    this.objects.pop()
                }                
                break;
            case 38:
                this.generateBatch(this.game,'enemy_',2)
                break;


            case 37:
                for(let i=0;i<10;i++){
                    this.objects.pop()
                }                
                break;
            case 39:
                this.generateBatch(this.game,'enemy_',10)
                break;                
            case 8:
                this.objects = []
                break;
        }
    }
}

export {DemoScene}