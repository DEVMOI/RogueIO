import AssetManager from "./core/AssetManager";
import Canvas from "./core/canvas";
import Entity from "./core/entity";
import Game from "./core/game";
import Map from "./core/map";
import SpriteSheet from "./core/spritesheet";
import Tile from "./core/tile";
import Util from "./core/util";
import Floor from "./core/floor";
import Wall from "./core/wall";
const RogueJs = () => {
  return {
    AssetManager,
    Canvas,
    Entity,
    Game,
    Map,
    SpriteSheet,
    Tile,
    Util,
    Floor,
    Wall
  };
};
export default RogueJs;
