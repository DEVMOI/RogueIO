import Game from "./game";
import Tile from "./tile";
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
      Game.playSound('treasure')
      this.treasure = false;
      Game.map.spawnMonster();
    }
  }
}
