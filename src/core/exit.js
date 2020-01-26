import Tile from "./tile";
import Game from "./game";
export default class Exit extends Tile {
  constructor(x, y) {
    super(x, y, 11, true);
  }

  stepOn(monster) {
    if (monster.isPlayer) {
      if (Game.level == Game.numLevels) {
        Game.showTitle();
      } else {
        Game.level++;
        Game.startLevel(Math.min(Game.maxHp, Game.player.hp + 1));
      }
    }
  }
}
