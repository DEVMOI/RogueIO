// import init from "./lib";
import RogueIO from "../../src";
let { Entity } = RogueIO();

export default class Golem extends Entity {
  constructor(tile) {
    super(tile, 6, 2);
  }
  update() {
    let startedStunned = this.stunned;
    super.update();
    if (!startedStunned) {
      this.stunned = true;
    }
  }
}
