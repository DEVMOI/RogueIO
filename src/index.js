export { default as Animation } from "./core/animation.js";
export {
  imageAssets,
  audioAssets,
  dataAssets,
  setImagePath,
  setAudioPath,
  setDataPath,
  loadImage,
  loadAudio,
  loadData,
  load
} from "./core/assetmanager";
export { init, getCanvas, getContext } from "./core/canvas";
export { on, off, emit } from "./core/eventmanager";

// import Entity from "./core/entity";
import { default as Game } from "./core/game";
export {
  keyMap,
  initKeys,
  bindKeys,
  unbindKeys,
  keyPressed
} from "./core/keyboard.js";
export {
  registerPlugin,
  unregisterPlugin,
  extendObject
} from "./core/plugin.js";
export {
  initPointer,
  pointer,
  track,
  untrack,
  pointerOver,
  onPointerDown,
  onPointerUp,
  pointerPressed
} from "./core/pointer.js";
export { default as Pool } from "./core/pool.js";
export { default as Quadtree } from "./core/quadtree.js";
export { default as Sprite } from "./core/sprite.js";
export { default as SpriteSheet } from "./core/spritesheet.js";
export { setStoreItem, getStoreItem } from "./core/store.js";
export { default as TileEngine } from "./core/tileengine.js";
export { default as Vector } from "./core/vector.js";
export { default } from "./index.defaults.js";
// import Map from "./core/map";
// import Options from "./core/options";
// import SpriteSheet from "./core/spritesheet";
// import Tile from "./core/tile";
// import Util from "./core/util";
// import Floor from "./core/floor";
// import Wall from "./core/wall";
// export default {
//   AssetManager,
//   Canvas,
//   // Entity,
//   EventManager,
//   Game,
//   // Map,
//   Options,
//   SpriteSheet,
//   Tile,
//   Util
//   // Floor,
//   // Wall
// };
