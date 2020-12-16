import { Scene } from '../core/scene.mjs';
import { Ball } from './ball.mjs';

const zeroPad = (num, places) => String(num).padStart(places, '0')

class DemoScene extends Scene {
    constructor(g) {
        super(g);
        this.numberObjects = 20
        this.index = 0

        this.score = 0
        this.maxLives = 5
        this.lives = 5
        this.coins = 0
        this.mushrooms = 2

    }

    init(game) {
        this.objects = []
        this.game.render.clearAllObjects()
        this.generateBatch(game, 'enemy_', 20)
    }

    generateBatch(game, name, number) {
        this.numberObjects += number
        for (let i = 0; i < number; i++) {
            this.generate(game, name + (this.index++))
        }
    }

    generate(game, name) {
        // size
        var ps = Math.random() * 32;
        // position
        var px = ps + Math.random() * game.stageConfig.width;
        var py = ps + Math.random() * game.stageConfig.height;
        // velocity
        var dx = (Math.random() * 10) - 5;
        var dy = (Math.random() * 10) - 5;
        // color
        var pc = 'rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + '255)'

        var o = new Ball(name,
            { x: px, y: py },
            { x: dx, y: dy },
            { width: ps, height: ps },
            { x: 0, y: 0 })
        o.color = pc
        o.properties.elasticity = (Math.random() * 0.9) + 0.1
        o.properties.friction = (Math.random() * 0.95) + 0.05
        o.properties.mass = (Math.random() * 0.8) + 0.5
        o.duration = Math.random() * 10000 + 2000
        this.add(o)
    }

    keyReleased(e) {
        super.keyReleased(e)
        switch (e.keyCode) {
            case 40:
                for (let i = 0; i < 2; i++) {
                    var o = this.objects.pop()
                    this.game.render.remove(o)
                }
                break;
            case 38:
                this.generateBatch(this.game, 'enemy_', 2)
                break;


            case 37:
                for (let i = 0; i < 10; i++) {
                    var o = this.objects.pop()
                    this.game.render.remove(o)
                }
                break;
            case 39:
                this.generateBatch(this.game, 'enemy_', 10)
                break;
            case 8:
                this.objects = []
                this.game.render.clearAllObjects()
                break;
        }
    }

    drawHUD(render) {
        var c = render.ctx
        c.font = '32pt sans-serif';
        var scoreStr = zeroPad(this.score, 6)
        var x = render.canvas.width / 30
        var y = render.canvas.height / 20

        c.fillStyle = 'white'
        c.shadowColor = 'rgba(0.7,0.7,0.7,0.9)';
        c.shadowBlur = 4;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
        c.fillText(scoreStr, x, y)

        c.fillStyle = 'rgba(0.7,0.7,0.7,0.2)'
        c.fillRect(render.canvas.width - 160, 8, 156, 76)

        c.fillStyle = 'white'

        c.font = '16pt sans-serif';
        var livesStr = "❤️".repeat(this.lives)
            + "🖤".repeat(this.maxLives - this.lives)
        var dsise = c.measureText(livesStr)
        c.fillText(livesStr, render.canvas.width - dsise.width - 10, y)

        var moneyStr = "💰" + zeroPad(this.coins, 5)
        dsise = c.measureText(moneyStr)
        c.fillText(moneyStr, render.canvas.width - dsise.width - 10, y + 28)

        var mushroomsStr = "🍄" + zeroPad(this.mushrooms, 2)
        c.fillText(mushroomsStr, render.canvas.width - 150, y + 28)

        c.shadowColor = 'none';
    }

}


export { DemoScene }