import Game from "./game";
import Entity from "./entity";
import util from "./util";
import Actions from "./actions";
export default class Player extends Entity {
  constructor(tile) {
    super(tile, 0, 3);
    this.isPlayer = true;
    this.teleportCounter = 0;
    this.actions = util
      .shuffle(Object.keys(Actions))
      .splice(0, Game.numActions);
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
      alert(actionName)
      this.actions.actionName();
      Game.playSound("spell");
      Game.tick();
    }
  }
}
