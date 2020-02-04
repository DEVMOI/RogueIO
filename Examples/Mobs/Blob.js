// import init from "./lib";
import RogueIO from "../../src";
let { Entity } = RogueIO();

export default class Blob extends Entity {
  constructor(tile) {
    super(tile, 4, 3);
  }
}
