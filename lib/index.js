"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Animation", {
  enumerable: true,
  get: function get() {
    return _animation["default"];
  }
});
Object.defineProperty(exports, "imageAssets", {
  enumerable: true,
  get: function get() {
    return _assetmanager.imageAssets;
  }
});
Object.defineProperty(exports, "audioAssets", {
  enumerable: true,
  get: function get() {
    return _assetmanager.audioAssets;
  }
});
Object.defineProperty(exports, "dataAssets", {
  enumerable: true,
  get: function get() {
    return _assetmanager.dataAssets;
  }
});
Object.defineProperty(exports, "setImagePath", {
  enumerable: true,
  get: function get() {
    return _assetmanager.setImagePath;
  }
});
Object.defineProperty(exports, "setAudioPath", {
  enumerable: true,
  get: function get() {
    return _assetmanager.setAudioPath;
  }
});
Object.defineProperty(exports, "setDataPath", {
  enumerable: true,
  get: function get() {
    return _assetmanager.setDataPath;
  }
});
Object.defineProperty(exports, "loadImage", {
  enumerable: true,
  get: function get() {
    return _assetmanager.loadImage;
  }
});
Object.defineProperty(exports, "loadAudio", {
  enumerable: true,
  get: function get() {
    return _assetmanager.loadAudio;
  }
});
Object.defineProperty(exports, "loadData", {
  enumerable: true,
  get: function get() {
    return _assetmanager.loadData;
  }
});
Object.defineProperty(exports, "load", {
  enumerable: true,
  get: function get() {
    return _assetmanager.load;
  }
});
Object.defineProperty(exports, "init", {
  enumerable: true,
  get: function get() {
    return _canvas.init;
  }
});
Object.defineProperty(exports, "getCanvas", {
  enumerable: true,
  get: function get() {
    return _canvas.getCanvas;
  }
});
Object.defineProperty(exports, "getContext", {
  enumerable: true,
  get: function get() {
    return _canvas.getContext;
  }
});
Object.defineProperty(exports, "on", {
  enumerable: true,
  get: function get() {
    return _eventmanager.on;
  }
});
Object.defineProperty(exports, "off", {
  enumerable: true,
  get: function get() {
    return _eventmanager.off;
  }
});
Object.defineProperty(exports, "emit", {
  enumerable: true,
  get: function get() {
    return _eventmanager.emit;
  }
});
Object.defineProperty(exports, "Game", {
  enumerable: true,
  get: function get() {
    return _game["default"];
  }
});
Object.defineProperty(exports, "keyMap", {
  enumerable: true,
  get: function get() {
    return _keyboard.keyMap;
  }
});
Object.defineProperty(exports, "initKeys", {
  enumerable: true,
  get: function get() {
    return _keyboard.initKeys;
  }
});
Object.defineProperty(exports, "bindKeys", {
  enumerable: true,
  get: function get() {
    return _keyboard.bindKeys;
  }
});
Object.defineProperty(exports, "unbindKeys", {
  enumerable: true,
  get: function get() {
    return _keyboard.unbindKeys;
  }
});
Object.defineProperty(exports, "keyPressed", {
  enumerable: true,
  get: function get() {
    return _keyboard.keyPressed;
  }
});
Object.defineProperty(exports, "Map", {
  enumerable: true,
  get: function get() {
    return _index["default"];
  }
});
Object.defineProperty(exports, "registerPlugin", {
  enumerable: true,
  get: function get() {
    return _plugin.registerPlugin;
  }
});
Object.defineProperty(exports, "unregisterPlugin", {
  enumerable: true,
  get: function get() {
    return _plugin.unregisterPlugin;
  }
});
Object.defineProperty(exports, "extendObject", {
  enumerable: true,
  get: function get() {
    return _plugin.extendObject;
  }
});
Object.defineProperty(exports, "initPointer", {
  enumerable: true,
  get: function get() {
    return _pointer.initPointer;
  }
});
Object.defineProperty(exports, "pointer", {
  enumerable: true,
  get: function get() {
    return _pointer.pointer;
  }
});
Object.defineProperty(exports, "track", {
  enumerable: true,
  get: function get() {
    return _pointer.track;
  }
});
Object.defineProperty(exports, "untrack", {
  enumerable: true,
  get: function get() {
    return _pointer.untrack;
  }
});
Object.defineProperty(exports, "pointerOver", {
  enumerable: true,
  get: function get() {
    return _pointer.pointerOver;
  }
});
Object.defineProperty(exports, "onPointerDown", {
  enumerable: true,
  get: function get() {
    return _pointer.onPointerDown;
  }
});
Object.defineProperty(exports, "onPointerUp", {
  enumerable: true,
  get: function get() {
    return _pointer.onPointerUp;
  }
});
Object.defineProperty(exports, "pointerPressed", {
  enumerable: true,
  get: function get() {
    return _pointer.pointerPressed;
  }
});
Object.defineProperty(exports, "Pool", {
  enumerable: true,
  get: function get() {
    return _pool["default"];
  }
});
Object.defineProperty(exports, "Quadtree", {
  enumerable: true,
  get: function get() {
    return _quadtree["default"];
  }
});
Object.defineProperty(exports, "RNG", {
  enumerable: true,
  get: function get() {
    return _rng["default"];
  }
});
Object.defineProperty(exports, "Sprite", {
  enumerable: true,
  get: function get() {
    return _sprite["default"];
  }
});
Object.defineProperty(exports, "SpriteSheet", {
  enumerable: true,
  get: function get() {
    return _spritesheet["default"];
  }
});
Object.defineProperty(exports, "setStoreItem", {
  enumerable: true,
  get: function get() {
    return _store.setStoreItem;
  }
});
Object.defineProperty(exports, "getStoreItem", {
  enumerable: true,
  get: function get() {
    return _store.getStoreItem;
  }
});
Object.defineProperty(exports, "TileEngine", {
  enumerable: true,
  get: function get() {
    return _tileengine["default"];
  }
});
Object.defineProperty(exports, "Vector", {
  enumerable: true,
  get: function get() {
    return _vector["default"];
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _indexDefaults["default"];
  }
});

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

var _quadtree = _interopRequireDefault(require("./core/quadtree.js"));

var _rng = _interopRequireDefault(require("./core/rng.js"));

var _sprite = _interopRequireDefault(require("./core/sprite.js"));

var _spritesheet = _interopRequireDefault(require("./core/spritesheet.js"));

var _store = require("./core/store.js");

var _tileengine = _interopRequireDefault(require("./core/tileengine.js"));

var _vector = _interopRequireDefault(require("./core/vector.js"));

var _indexDefaults = _interopRequireDefault(require("./index.defaults.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }