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
            gravity: { x: 0, y: -0.05 },
            forces:[],
            maxAcc:{x:4,y:4},
            maxSpd:{x:20,y:20}
        }
    }

    /**
     * Update all objects from the scene.
     * @param scene Scene to be update
     * @param elapsed time elapsed since previous call.
     */
    update(scene, elapsed) {
        var objects = scene.objects
        // Add all World forces
        var w = {
            x:0,
            y:0
        }   
        this.properties.forces.forEach(
            f => {
                w.x += f.x
                w.y += f.y                
            }
        )        
        objects.forEach(o => {
        // If object active, update physic for it
            if(o.active){                
                var r = (o.contact ? o.properties.friction : 1.0)
                
                //reset all acceleration for the current GameObject
                o.acceleration = w
                

                // add All object applied forces
                o.forces.forEach(
                    f => {
                        o.acceleration.x += f.x
                        o.acceleration.y += f.y                
                    }
                )
                o.forces = []

                // Add gravity
                o.acceleration.x += ( this.properties.gravity.x )
                o.acceleration.y += - ( this.properties.gravity.y * o.properties.mass )

                // limit acceleration vector to maxAcc
                if( o.properties.maxAcc && o.properties.maxAcc.x > 0 && o.properties.maxAcc.y > 0 ){
                    o.acceleration = this.threshold(o.acceleration, o.properties.maxAcc)                
                }

                // compute object velocity
                o.velocity.x = (o.velocity.x  + o.acceleration.x)* r
                o.velocity.y = (o.velocity.y  + o.acceleration.y)* r

                // Limit object velocity vector to maxSpd
                o.velocity = this.threshold(
                        o.velocity,
                        (o.properties.maxSpeed ? 
                            o.properties.maxSpeed : 
                            this.properties.maxSpd))                

                // compute object position
                o.position.x += o.velocity.x
                o.position.y += o.velocity.y

                // update object with its own update method.
                o.update(elapsed)

                // constrains Object position to current viewport
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

    threshold(v,threshold){
        v.x = ( 
            v.x < -threshold.x 
                ? -threshold.x
                : v.x > threshold.x 
                    ? threshold.x
                    : v.x )
        v.y = ( 
            v.y < -threshold.y 
                ? -threshold.y
                : v.y > threshold.y 
                    ? threshold.y
                    : v.y )
        return v
    }

    /**
     * 
     * @param o Constrains object to the game window.
     */
    constrained(o) {
        if (o.isConstrainedToWindow) {
            o.contact=false;
            if (o.position.x > this.game.stageConfig.width - o.size.width/2) {
                o.velocity.x = - o.velocity.x * o.properties.elasticity
                o.position.x = this.game.stageConfig.width - o.size.width/2
                o.contact=true;
            }
            if (o.position.x < o.size.width/2) {
                o.velocity.x = -o.velocity.x * o.properties.elasticity
                o.position.x = o.size.width/2
                o.contact=true;
            }
            if (o.position.y > this.game.stageConfig.height - o.size.height/2) {
                o.velocity.y = -o.velocity.y * o.properties.elasticity
                o.position.y = this.game.stageConfig.height - o.size.height/2
                o.contact=true;
            }
            if (o.position.y < o.size.height/2) {
                o.velocity.y = -o.velocity.y * o.properties.elasticity
                o.position.y = o.size.height/2
                o.contact=true;
            }
        }

    }
}

export { PhysicEngine }