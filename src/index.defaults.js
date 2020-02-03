import Animation from "./core/animation.js";
import {
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
import { init, getCanvas, getContext } from "./core/canvas";
import { on, off, emit } from "./core/eventmanager";
import Game from "./core/game";
import {
  keyMap,
  initKeys,
  bindKeys,
  unbindKeys,
  keyPressed
} from "./core/keyboard.js";
import {
  registerPlugin,
  unregisterPlugin,
  extendObject
} from "./core/plugin.js";
import {
  initPointer,
  pointer,
  track,
  untrack,
  pointerOver,
  onPointerDown,
  onPointerUp,
  pointerPressed
} from "./core/pointer.js";
import Pool from "./core/pool.js";
import Quadtree from "./core/quadtree.js";
import Sprite from "./core/sprite.js";
import SpriteSheet from "./core/spritesheet.js";
import { setStoreItem, getStoreItem } from "./core/store.js";
import TileEngine from "./core/tileengine.js";
import Vector from "./core/vector.js";

let RogueJS = {
  Animation,

  imageAssets,
  audioAssets,
  dataAssets,
  setImagePath,
  setAudioPath,
  setDataPath,
  loadImage,
  loadAudio,
  loadData,
  load,

  init,
  getCanvas,
  getContext,

  on,
  off,
  emit,

  Game,

  keyMap,
  initKeys,
  bindKeys,
  unbindKeys,
  keyPressed,

  registerPlugin,
  unregisterPlugin,
  extendObject,

  initPointer,
  pointer,
  track,
  untrack,
  pointerOver,
  onPointerDown,
  onPointerUp,
  pointerPressed,

  Pool,
  Quadtree,
  Sprite,
  SpriteSheet,

  setStoreItem,
  getStoreItem,

  TileEngine,
  Vector
};

export default RogueJS;
