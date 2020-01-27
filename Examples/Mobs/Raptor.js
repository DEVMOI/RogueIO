// import init from "./lib";
import RogueJs from "../../src";
let { Entity } = RogueJs();

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
