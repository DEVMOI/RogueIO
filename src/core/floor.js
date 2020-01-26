import Tile from "./tile";
export default class Floor extends Tile {
  constructor(x, y) {
    super(x, y, 2, true);
  }
  stepOn(monster) {
    //TODO: complete
  }
}
