import { playSound } from "../src/core/assetmanager";
import Game from "../src/core/game";
import Tile from "../src/core/tile";
export default class Floor extends Tile {
  constructor(x, y) {
    super(x, y, 2, true);
  }
  stepOn(monster) {
    //TODO: complete
    if (monster.isPlayer && this.treasure) {
      Game.score++;
      if (Game.score % 3 == 0 && Game.numActions < 9) {
        Game.numActions++;
        Game.player.addSpell();
      }
      playSound("treasure");
      this.treasure = false;
      Game.map.spawnMonster();
    }
  }
}
