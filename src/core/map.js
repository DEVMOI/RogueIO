import Game from "./game";
import Wall from "./wall";
import Floor from "./floor";
import Exit from './exit';
import util from "./util";


export default class Map {
  constructor( numTiles) {
    this.numTiles = numTiles;
    this.tiles = [];
    this.monsters = null;
  }
  generateLevel() {
    console.log("map created");
    util.tryTo("generate map", () => {
      return (
        this.generateTiles() ==
        this.randomPassableTile().getConnectedTiles().length
      );
    });
    this.generateMonsters();
  }

  generateTiles() {
    let passableTiles = 0;
    for (let i = 0; i < this.numTiles; i++) {
      this.tiles[i] = [];
      for (let j = 0; j < this.numTiles; j++) {
        if (Math.random() < 0.3 || !this.inBounds(i, j)) {
          this.tiles[i][j] = new Wall(i, j);
        } else {
          this.tiles[i][j] = new Floor(i, j);
          passableTiles++;
        }
      }
    }
    return passableTiles;
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
  randomPassableTile() {
    let tile;
    util.tryTo("get random tile", () => {
      let x = util.randomRange(0, this.numTiles - 1);
      let y = util.randomRange(0, this.numTiles - 1);
      tile = this.getTile(x, y);
      return tile.passable && !tile.monster;
    });
    return tile;
  }
  generateMonsters() {
    this.monsters = [];
    let numMonsters = Game.level + 1;
    for (let i = 0; i < numMonsters; i++) {
      this.spawnMonster();
    }
  }

  spawnMonster() {
    let monsterType = util.shuffle(Game.monsterClasses)[0];
    let monster = new monsterType(this.randomPassableTile());
    this.monsters.push(monster);
  }
}
