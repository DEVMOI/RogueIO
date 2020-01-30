import Game from "./game";

export default {
  WARP: () => {
    console.log('fwefwf')
    Game.player.move(Game.map.randomPassableTile());
  },
  QUAKE: () => {
    console.log('we')
    for (let i = 0; i < Game.numTiles; i++) {
      for (let j = 0; j < Game.numTiles; j++) {
        let tile = Game.tile.getTile(i, j);
        if (Game.map.monster) {
          let numWalls = 4 - tile.getAdjacentPassableNeighbors().length;
          tile.monster.hit(numWalls * 2);
        }
      }
    }
    Game.shakeAmount = 20;
  },
  MAELSTROM: function() {
    console.log('mae')
    for (let i = 0; i < Game.map.monsters.length; i++) {
      Game.map.monsters[i].move(Game.map.randomPassableTile());
      Game.map.monsters[i].teleportCounter = 2;
    }
  },
  MULLIGAN: function() {
    Game.startLevel(1, Game.player.spells);
  }
};
