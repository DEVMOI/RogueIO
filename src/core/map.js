import Wall from "./wall";
import Floor from "./floor";
export default class Map {
  constructor(x, y, numTiles) {
    this.x = x;
    this.y = y;
    this.numTiles = numTiles;
    this.tiles = null;
  }
  generateLevel() {
    console.log('map created')
    this.generateTiles();
  }

  generateTiles() {
    this.tiles = [];
    for (let i = 0; i < this.numTiles; i++) {
      this.tiles[i] = [];
      for (let j = 0; j < this.numTiles; j++) {
        if (Math.random() < 0.3 || !this.inBounds(i, j)) {
          this.tiles[i][j] = new Wall(i, j);
        } else {
          this.tiles[i][j] = new Floor(i, j);
        }
      }
    }
  }
  inBounds(x, y) {
    return x > 0 && y > 0 && x < this.numTiles - 1 && y < this.numTiles - 1;
  }

  getTile(x, y) {
    if (this.inBounds(x, y)) {
      return this.tiles[x][y];
    } else {
      return new Wall(x, y);
    }
  }
}
