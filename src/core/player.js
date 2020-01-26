import Game from './game'
import Entity from "./entity";
export default class Player extends Entity {
  constructor(tile) {
    super(tile, 0, 3);
    this.isPlayer = true;
    this.teleportCounter = 0;
  }
  tryMove(dx, dy) {
    if (super.tryMove(dx, dy)) {
      Game.tick();
    }
  }
}
