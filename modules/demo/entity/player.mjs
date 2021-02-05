import { GameObject, GO_NODURATION } from "/modules/core/gameobject.mjs";
import { GameObjectType } from "/modules/core/gameobjecttype.mjs";
class Player extends GameObject {
  constructor(name, x, y) {
    super(name, { x: x, y: y }, { x: 0, y: 0 }, { width: 32, height: 64 });
    this.duration = GO_NODURATION;
    this.type = GameObjectType.RECTANGLE;
    this.layer = 2;
    this.priority = 1;
    this.color = "rgba(100,100,50,100)";
    this.debug = 2;

    this.properties = {
      elasticity: 0.98,
      mass: 2.0,
      friction: 0.6,
      maxSpeed: { x: 4, y: 4 },
      dacc: { x: 1.4, y: 1.4 },
    };
    this.update();
  }

  update(elapsed) {
    super.update(elapsed);
  }
}

export { Player };
