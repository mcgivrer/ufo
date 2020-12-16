/**
 * This PhysicEngine is a service to compute physic effects on all scene objects.
 * usage consists in giving the scene instance to be computed.
 * <pre>
 * var pe = new PhysicEngine(game)
 * 
 * ps.update(scene,elapsed)
 * </pre>
 */
class PhysicEngine {
    constructor(game) {
        this.game = game
        this.properties = {
            gravity: { x: 0, y: 0 },
            forces:[]
        }
    }

    /**
     * Update all objects from the scene.
     * @param scene Scene to be update
     * @param elapsed time elapsed since previous call.
     */
    update(scene, elapsed) {
        var objects = scene.objects
        objects.forEach(o => {
            // If object active, update physic for it
            if(o.active){                
                var r = (o.contact ? o.properties.friction : 1.0)

                this.properties.forces.forEach(f=>{
                    o.acceleration.x += f.x
                    o.acceleration.y += f.y                
                })

                o.acceleration.x = (this.properties.gravity.x)
                o.acceleration.y = - (this.properties.gravity.y*o.properties.mass)

                o.velocity.x = (o.velocity.x  + o.acceleration.x)* r
                o.velocity.y = (o.velocity.y  + o.acceleration.y)* r

                o.position.x += o.velocity.x
                o.position.y += o.velocity.y

                o.update(elapsed)

                this.constrained(o)

                if(o.duration!=-1 && o.duration>0){
                    o.duration-=elapsed;
                    if(o.duration<0){
                        o.duration=-1
                        o.active=false
                    }
                }
            }
        });
        // call the specific scene update mechanism
        scene.update(elapsed)
    }

    /**
     * 
     * @param o Constrains object to the game window.
     */
    constrained(o) {
        if (o.isConstrainedToWindow) {
            o.contact=false;
            if (o.position.x > this.game.stageConfig.width - o.size.width) {
                o.velocity.x = - o.velocity.x * o.properties.elasticity
                o.position.x = this.game.stageConfig.width - o.size.width
                o.contact=true;
            }
            if (o.position.x < o.size.width) {
                o.velocity.x = -o.velocity.x * o.properties.elasticity
                o.position.x = o.size.width
                o.contact=true;
            }
            if (o.position.y > this.game.stageConfig.height - o.size.height) {
                o.velocity.y = -o.velocity.y * o.properties.elasticity
                o.position.y = this.game.stageConfig.height - o.size.height
                o.contact=true;
            }
            if (o.position.y < o.size.height) {
                o.velocity.y = -o.velocity.y * o.properties.elasticity
                o.position.y = o.size.height
                o.contact=true;
            }
        }

    }
}

export { PhysicEngine }