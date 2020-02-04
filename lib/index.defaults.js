"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _animation = _interopRequireDefault(require("./core/animation.js"));

var _assetmanager = require("./core/assetmanager");

var _canvas = require("./core/canvas");

var _eventmanager = require("./core/eventmanager");

var _game = _interopRequireDefault(require("./core/game"));

var _keyboard = require("./core/keyboard.js");

var _index = _interopRequireDefault(require("./core/map/index.js"));

var _plugin = require("./core/plugin.js");

var _pointer = require("./core/pointer.js");

var _pool = _interopRequireDefault(require("./core/pool.js"));

var _rng = _interopRequireDefault(require("./core/rng.js"));

var _quadtree = _interopRequireDefault(require("./core/quadtree.js"));

var _sprite = _interopRequireDefault(require("./core/sprite.js"));

var _spritesheet = _interopRequireDefault(require("./core/spritesheet.js"));

var _store = require("./core/store.js");

var _tileengine = _interopRequireDefault(require("./core/tileengine.js"));

var _vector = _interopRequireDefault(require("./core/vector.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RogueJS = {
  Animation: _animation["default"],
  imageAssets: _assetmanager.imageAssets,
  audioAssets: _assetmanager.audioAssets,
  dataAssets: _assetmanager.dataAssets,
  setImagePath: _assetmanager.setImagePath,
  setAudioPath: _assetmanager.setAudioPath,
  setDataPath: _assetmanager.setDataPath,
  loadImage: _assetmanager.loadImage,
  loadAudio: _assetmanager.loadAudio,
  loadData: _assetmanager.loadData,
  load: _assetmanager.load,
  init: _canvas.init,
  getCanvas: _canvas.getCanvas,
  getContext: _canvas.getContext,
  on: _eventmanager.on,
  off: _eventmanager.off,
  emit: _eventmanager.emit,
  Game: _game["default"],
  keyMap: _keyboard.keyMap,
  initKeys: _keyboard.initKeys,
  bindKeys: _keyboard.bindKeys,
  unbindKeys: _keyboard.unbindKeys,
  keyPressed: _keyboard.keyPressed,
  Map: _index["default"],
  registerPlugin: _plugin.registerPlugin,
  unregisterPlugin: _plugin.unregisterPlugin,
  extendObject: _plugin.extendObject,
  initPointer: _pointer.initPointer,
  pointer: _pointer.pointer,
  track: _pointer.track,
  untrack: _pointer.untrack,
  pointerOver: _pointer.pointerOver,
  onPointerDown: _pointer.onPointerDown,
  onPointerUp: _pointer.onPointerUp,
  pointerPressed: _pointer.pointerPressed,
  Pool: _pool["default"],
  Quadtree: _quadtree["default"],
  RNG: _rng["default"],
  Sprite: _sprite["default"],
  SpriteSheet: _spritesheet["default"],
  setStoreItem: _store.setStoreItem,
  getStoreItem: _store.getStoreItem,
  TileEngine: _tileengine["default"],
  Vector: _vector["default"]
};
var _default = RogueJS;
exports["default"] = _default;