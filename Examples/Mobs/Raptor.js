// import init from "./lib";
import RogueIO from "../../src";
let { Entity } = RogueIO();

export default class Raptor extends Entity {
  constructor(tile) {
    super(tile, 5, 1);
  }
  doStuff() {
    this.attackedThisTurn = false;
    super.doStuff();

    if (!this.attackedThisTurn) {
      super.doStuff();
    }
  }
}
