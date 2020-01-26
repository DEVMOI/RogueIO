// import init from "./lib";
import RogueJs from "./src";
let { Game,Entity } = RogueJs();



class Blob extends Entity {
  constructor(tile) {
    super(tile, 4, 3);
  }
}

class Raptor extends Entity {
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

class Golem extends Entity {
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

class Ent extends Entity {
  constructor(tile) {
    super(tile, 7, 1);
  }
  doStuff() {
    let neighbors = this.tile
      .getAdjacentNeighbors()
      .filter(t => !t.passable && Game.map.inBounds(t.x, t.y));
    if (neighbors.length) {
      neighbors[0].replace(Floor);
      this.heal(0.5);
    } else {
      super.doStuff();
    }
  }
}

class MerQueen extends Entity {
  constructor(tile) {
    super(tile, 8, 2);
  }
  doStuff() {
    let neighbors = this.tile.getAdjacentPassableNeighbors();
    if (neighbors.length) {
      this.tryMove(neighbors[0].x - this.tile.x, neighbors[0].y - this.tile.y);
    }
  }
}
let arr = [Blob, Raptor, Golem, Ent, MerQueen];
Game.registerMonsters(arr);
Game.init();
