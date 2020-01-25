import Tile from './tile'
export default class Wall extends Tile {
  constructor(x, y) {
    super(x, y, 3, false);
  }
}