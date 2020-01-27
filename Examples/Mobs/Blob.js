// import init from "./lib";
import RogueJs from "../../src";
let { Entity } = RogueJs();

export default class Blob extends Entity {
  constructor(tile) {
    super(tile, 4, 3);
  }
}
