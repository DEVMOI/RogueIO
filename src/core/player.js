import AssetManager from "./AssetManager";
import Game from "./game";
import Entity from "./entity";
import Actions from "../../Examples/Actions/actions";
import util from "./util";
export default class Player extends Entity {
  constructor(tile) {
    super(tile, 0, 3);
    this.isPlayer = true;
    this.teleportCounter = 0;
    this.actions = util
      .shuffle(Object.keys(Actions))
      .splice(0, Game.numActions);
  }
  update() {
    this.shield--;
  }
  tryMove(dx, dy) {
    if (super.tryMove(dx, dy)) {
      Game.tick();
    }
  }
  addAction() {
    let newAction = util.shuffle(Object.keys(Actions))[0];
    this.actions.push(newAction);
  }
  // TODO Fix perform actions
  performAction(index) {
    let actionName = this.actions[index];
    if (actionName) {
      delete this.actions[index];
      Actions[actionName]();
      AssetManager.playSound("spell");
      Game.tick();
    }
  }
}
