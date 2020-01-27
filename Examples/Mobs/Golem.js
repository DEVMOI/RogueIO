// import init from "./lib";
import RogueJs from "../../src";
let { Entity } = RogueJs();

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
