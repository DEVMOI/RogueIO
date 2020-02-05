import AssetManager from "../src/core/assetmanager";
import Tile from "../src/core/tile";
import Game from "../src/core/game";
export default class Exit extends Tile {
  constructor(x, y) {
    super(x, y, 11, true);
  }

  stepOn(monster) {
    if (monster.isPlayer) {
      AssetManager.playSound("newLevel");
      if (Game.level == Game.numLevels) {
        Game.addScore(Game.score, true);
        Game.showTitle();
      } else {
        Game.level++;
        Game.startLevel(Math.min(Game.maxHp, Game.player.hp + 1));
      }
    }
  }
}
