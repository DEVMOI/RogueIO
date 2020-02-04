// import init from "./lib";
import RogueIO from "../../src";
let { Entity } = RogueIO();

export default class MerQueen extends Entity {
  constructor(tile) {
    super(tile, 8, 5);
  }
  doStuff() {
    let neighbors = this.tile.getAdjacentPassableNeighbors();
    if (neighbors.length) {
      this.tryMove(neighbors[0].x - this.tile.x, neighbors[0].y - this.tile.y);
    }
  }
}
