class GamepadAPI {
  constructor(game) {
    this.game = game;
    this.gamepads = {};
    this.buttonsOldState = {};
    window.addEventListener(
      "gamepadconnected",
      this.gamepadHandlerConnected.bind(this),
      false
    );
    window.addEventListener(
      "gamepaddisconnected",
      this.gamepadHandlerDisconnected.bind(this),
      false
    );
  }

  gamepadHandlerConnected(e) {
    var gamepad = e.gamepad;
    console.log("✅ 🎮 A gamepad was connected:", e.gamepad);
    this.gamepads[gamepad.index] = gamepad;
  }
  gamepadHandlerDisconnected(e) {
    var gamepad = e.gamepad;
    console.log("❌ 🎮 A gamepad was disconnected:", e.gamepad);
    delete this.gamepads[gamepad.index];
  }
  handleGamepads(game) {
    const gamepads = navigator.getGamepads();

    for (const gamepad of gamepads) {
      // Disregard empty slots.
      if (!gamepad) {
        continue;
      }
      gamepad.buttons.forEach((b, k) => {
        var s = b.pressed;
        if (s && !this.buttonsOldState[k]) {
          b.index = k;
          this.gamepadButtonPressed(gamepad.id, b);
        } else if (
          !s &&
          this.buttonsOldState[k] !== undefined &&
          this.buttonsOldState[k]
        ) {
          b.index = k;
          this.gamepadButtonReleased(gamepad.id,b);
        }
        this.buttonsOldState[k] = b.pressed;
      });
    }
  }

  gamepadButtonPressed(id, button) {
    console.log("gamepadid:"+id+" btn:" + button.index + "=" + "pressed");
    this.game.gamepadPressed(button);
  }
  gamepadButtonReleased(id, button) {
    console.log("gamepadid:"+id+" btn:" + button.index + "=" + "released");
    this.game.gamepadReleased(button);
  }

  getAxes(gamepadId,axeId){
      return this.gamepads[gamepadId].axes[axeId]
  }
}

export { GamepadAPI };
