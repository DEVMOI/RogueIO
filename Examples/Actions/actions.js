import Game from "../../src/core/game";
import Floor from "../../src/core/floor";

let actions = {
  WARP() {
    Game.player.move(Game.map.randomPassableTile());
  },
  QUAKE() {
    for (let i = 0; i < Game.numTiles; i++) {
      for (let j = 0; j < Game.numTiles; j++) {
        let tile = Game.map.getTile(i, j);
        if (Game.map.monster) {
          let numWalls = 4 - tile.getAdjacentPassableNeighbors().length;
          tile.monster.hit(numWalls * 2);
        }
      }
    }
    Game.shakeAmount = 20;
  },
  MAELSTROM() {
    for (let i = 0; i < Game.map.monsters.length; i++) {
      Game.map.monsters[i].move(Game.map.randomPassableTile());
      Game.map.monsters[i].teleportCounter = 2;
    }
  },
  MULLIGAN() {
    Game.startLevel(1, Game.player.spells);
  },
  AURA() {
    Game.player.tile.getAdjacentNeighbors().forEach(t => {
      t.setEffect(13);
      if (t.monster) {
        t.monster.heal(1);
      }
    });
    Game.player.tile.setEffect(13);
    Game.player.heal(1);
  },
  DASH() {
    let newTile = Game.player.tile;
    while (true) {
      let testTile = newTile.getNeighbor(
        Game.player.lastMove[0],
        Game.player.lastMove[1]
      );
      if (testTile.passable && !testTile.monster) {
        newTile = testTile;
      } else {
        break;
      }
    }
    if (Game.player.tile != newTile) {
      Game.player.move(newTile);
      newTile.getAdjacentNeighbors().forEach(t => {
        if (t.monster) {
          t.setEffect(14);
          t.monster.stunned = true;
          t.monster.hit(1);
        }
      });
    }
  },
  DIG() {
    for (let i = 1; i < Game.numTiles - 1; i++) {
      for (let j = 1; j < Game.numTiles - 1; j++) {
        let tile = Game.map.getTile(i, j);
        if (!tile.passable) {
          tile.replace(Floor);
        }
      }
    }
    Game.player.tile.setEffect(13);
    Game.player.heal(2);
  },
  KINGMAKER() {
    for (let i = 0; i < Game.map.monsters.length; i++) {
      Game.map.monsters[i].heal(1);
      Game.map.monsters[i].tile.treasure = true;
    }
  },
  ALCHEMY() {
    Game.player.tile.getAdjacentNeighbors().forEach(t => {
      if (!t.passable && inBounds(t.x, t.y)) {
        t.replace(Floor).treasure = true;
      }
    });
  },
  POWER() {
    Game.player.bonusAttack = 5;
  },
  BUBBLE() {
    for (let i = Game.player.actions.length - 1; i > 0; i--) {
      if (!Game.player.actions[i]) {
        Game.player.actions[i] = Game.player.actions[i - 1];
      }
    }
  },
  BRAVERY() {
    Game.player.shield = 2;
    for (let i = 0; i < Game.map.monsters.length; i++) {
      Game.map.monsters[i].stunned = true;
    }
  },
  BOLT() {
    boltTravel(Game.player.lastMove, 15 + Math.abs(Game.player.lastMove[1]), 4);
  },
  CROSS() {
    let directions = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0]
    ];
    for (let k = 0; k < directions.length; k++) {
      boltTravel(directions[k], 15 + Math.abs(directions[k][1]), 2);
    }
  },
  EX() {
    let directions = [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1]
    ];
    for (let k = 0; k < directions.length; k++) {
      boltTravel(directions[k], 14, 3);
    }
  }
};
//Add to Action Manager
const boltTravel = (direction, effect, damage) => {
  let newTile = Game.player.tile;
  while (true) {
    let testTile = newTile.getNeighbor(direction[0], direction[1]);

    if (testTile.passable) {
      newTile = testTile;
      if (newTile.monster) newTile.monster.hit(damage);
      newTile.setEffect(effect);
    } else {
      break;
    }
  }
};
export default actions;
