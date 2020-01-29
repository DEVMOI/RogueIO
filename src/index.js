import Game from "./core/game";
import Canvas from "./core/canvas";
import SpriteSheet from "./core/spritesheet";
import Map from "./core/map";
import Player from "./core/player";
import Tile from "./core/tile";
import Util from "./core/util";
import Floor from "./core/floor";
import Wall from "./core/wall";
import Entity from "./core/entity";
const RogueJs = () => {
  return { Game, Canvas, SpriteSheet, Map, Player, Entity, Tile, Util, Floor, Wall };
};
export default RogueJs;
