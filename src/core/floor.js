import Tile from "./tile";
export default class Floor extends Tile {
  constructor(x, y) {
    super(x, y, 2, true);
  }
  stepOn(monster) {
    //TODO: complete
    if(monster.isPlayer && this.treasure){
      score++
      this.treasure = false;
      this.spawnMonster()
    }
  }
}
