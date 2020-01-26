import Game from './game'
import Entity from "./entity";

export default class Monster extends Entity {
  constructor(tile, index, hp) {
    super(tile, index, hp);
    this.isPlayer = false;
  }

}
