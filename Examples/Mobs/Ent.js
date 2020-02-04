// import init from "./lib";
import RogueIO from "../../src";
let { Game, Entity, Floor } = RogueIO();

export default class Ent extends Entity {
  constructor(tile) {
    super(tile, 7, 1);
  }
  doStuff() {
    let neighbors = this.tile
      .getAdjacentNeighbors()
      .filter(t => !t.passable && Game.map.inBounds(t.x, t.y));
    if (neighbors.length) {
      neighbors[0].replace(Floor);
      this.heal(0.5);
    } else {
      super.doStuff();
    }
  }
}
