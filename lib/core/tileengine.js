"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TileEngine;

var _canvas = require("./canvas.js");

/**
 * A tile engine for managing and drawing tilesets.
 *
 * <figure>
 *   <a href="assets/imgs/mapPack_tilesheet.png">
 *     <img src="assets/imgs/mapPack_tilesheet.png" alt="Tileset to create an overworld map in various seasons.">
 *   </a>
 *   <figcaption>Tileset image courtesy of <a href="https://kenney.nl/assets">Kenney</a>.</figcaption>
 * </figure>
 * @sectionName TileEngine
 *
 * @param {Object} properties - Properties of the tile engine.
 * @param {Number} properties.width - Width of the tile map (in number of tiles).
 * @param {Number} properties.height - Height of the tile map (in number of tiles).
 * @param {Number} properties.tilewidth - Width of a single tile (in pixels).
 * @param {Number} properties.tileheight - Height of a single tile (in pixels).
 * @param {Canvas​Rendering​Context2D} [properties.context] - The context the tile engine should draw to. Defaults to [core.getContext()](api/core#getContext)
 *
 * @param {Object[]} properties.tilesets - Array of tileset objects.
 * @param {Number} properties.tilesetN.firstgid - First tile index of the tileset. The first tileset will have a firstgid of 1 as 0 represents an empty tile.
 * @param {String|HTMLImageElement} properties.tilesetN.image - Relative path to the HTMLImageElement or an HTMLImageElement. If passing a relative path, the image file must have been [loaded](api/assets#load) first.
 * @param {Number} [properties.tilesetN.margin=0] - The amount of whitespace between each tile (in pixels).
 * @param {Number} [properties.tilesetN.tilewidth] - Width of the tileset (in pixels). Defaults to properties.tilewidth.
 * @param {Number} [properties.tilesetN.tileheight] - Height of the tileset (in pixels). Defaults to properties.tileheight.
 * @param {String} [properties.tilesetN.source] - Relative path to the source JSON file. The source JSON file must have been [loaded](api/assets#load) first.
 * @param {Number} [properties.tilesetN.columns] - Number of columns in the tileset image.
 *
 * @param {Object[]} properties.layers - Array of layer objects.
 * @param {String} properties.layerN.name - Unique name of the layer.
 * @param {Number[]} properties.layerN.data - 1D array of tile indices.
 * @param {Boolean} [properties.layerN.visible=true] - If the layer should be drawn or not.
 * @param {Number} [properties.layerN.opacity=1] - Percent opacity of the layer.
 */

/**
 * @docs docs/api_docs/tileEngine.js
 */
function TileEngine() {
  var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var width = properties.width,
      height = properties.height,
      tilewidth = properties.tilewidth,
      tileheight = properties.tileheight,
      _properties$context = properties.context,
      context = _properties$context === void 0 ? (0, _canvas.getContext)() : _properties$context,
      tilesets = properties.tilesets,
      layers = properties.layers;
  var mapwidth = width * tilewidth;
  var mapheight = height * tileheight; // create an off-screen canvas for pre-rendering the map
  // @see http://jsperf.com/render-vs-prerender

  var offscreenCanvas = document.createElement("canvas");
  var offscreenContext = offscreenCanvas.getContext("2d");
  offscreenCanvas.width = mapwidth;
  offscreenCanvas.height = mapheight; // map layer names to data

  var layerMap = {};
  var layerCanvases = {}; // objects added to tile engine to sync with the camera

  var objects = [];
  /**
   * The width of tile map (in tiles).
   * @memberof TileEngine
   * @property {Number} width
   */

  /**
   * The height of tile map (in tiles).
   * @memberof TileEngine
   * @property {Number} height
   */

  /**
   * The width a tile (in pixels).
   * @memberof TileEngine
   * @property {Number} tilewidth
   */

  /**
   * The height of a tile (in pixels).
   * @memberof TileEngine
   * @property {Number} tileheight
   */

  /**
   * Array of all layers of the tile engine.
   * @memberof TileEngine
   * @property {Object[]} layers
   */

  /**
   * Array of all tilesets of the tile engine.
   * @memberof TileEngine
   * @property {Object[]} tilesets
   */

  var tileEngine = Object.assign({
    /**
     * The context the tile engine will draw to.
     * @memberof TileEngine
     * @property {CanvasRenderingContext2D} context
     */
    context: context,

    /**
     * The width of the tile map (in pixels).
     * @memberof TileEngine
     * @property {Number} mapwidth
     */
    mapwidth: mapwidth,

    /**
     * The height of the tile map (in pixels).
     * @memberof TileEngine
     * @property {Number} mapheight
     */
    mapheight: mapheight,
    _sx: 0,
    _sy: 0,
    // d = dirty
    _d: false,

    /**
     * X coordinate of the tile map camera.
     * @memberof TileEngine
     * @property {Number} sx
     */
    get sx() {
      return this._sx;
    },

    /**
     * Y coordinate of the tile map camera.
     * @memberof TileEngine
     * @property {Number} sy
     */
    get sy() {
      return this._sy;
    },

    // when clipping an image, sx and sy must within the image region, otherwise
    // Firefox and Safari won't draw it.
    // @see http://stackoverflow.com/questions/19338032/canvas-indexsizeerror-index-or-size-is-negative-or-greater-than-the-allowed-a
    set sx(value) {
      var _this = this;

      this._sx = Math.min(Math.max(0, value), mapwidth - (0, _canvas.getCanvas)().width);
      objects.forEach(function (obj) {
        return obj.sx = _this._sx;
      });
    },

    set sy(value) {
      var _this2 = this;

      this._sy = Math.min(Math.max(0, value), mapheight - (0, _canvas.getCanvas)().height);
      objects.forEach(function (obj) {
        return obj.sy = _this2._sy;
      });
    },

    /**
     * Render all visible layers.
     * @memberof TileEngine
     * @function render
     */
    render: function render() {
      if (this._d) {
        this._d = false;

        this._p();
      }

      _render(offscreenCanvas);
    },

    /**
     * Render a specific layer by name.
     * @memberof TileEngine
     * @function renderLayer
     *
     * @param {String} name - Name of the layer to render.
     */
    renderLayer: function renderLayer(name) {
      var canvas = layerCanvases[name];
      var layer = layerMap[name];

      if (!canvas) {
        // cache the rendered layer so we can render it again without redrawing
        // all tiles
        canvas = document.createElement("canvas");
        canvas.width = mapwidth;
        canvas.height = mapheight;
        layerCanvases[name] = canvas;

        tileEngine._r(layer, canvas.getContext("2d"));
      }

      if (layer._d) {
        layer._d = false;
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        tileEngine._r(layer, canvas.getContext("2d"));
      }

      _render(canvas);
    },

    /**
     * Check if the object collides with the layer (shares a gird coordinate with any positive tile index in layers data). The object being checked must have the properties `x`, `y`, `width`, and `height` so that its position in the grid can be calculated. kontra.Sprite defines these properties for you.
     *
     * ```js
     * import { TileEngine, Sprite } from 'kontra';
     *
     * let tileEngine = TileEngine({
     *   tilewidth: 32,
     *   tileheight: 32,
     *   width: 4,
     *   height: 4,
     *   tilesets: [{
     *     // ...
     *   }],
     *   layers: [{
     *     name: 'collision',
     *     data: [ 0,0,0,0,
     *             0,1,4,0,
     *             0,2,5,0,
     *             0,0,0,0 ]
     *   }]
     * });
     *
     * let sprite = Sprite({
     *   x: 50,
     *   y: 20,
     *   width: 5,
     *   height: 5
     * });
     *
     * tileEngine.layerCollidesWith('collision', sprite);  //=> false
     *
     * sprite.y = 28;
     *
     * tileEngine.layerCollidesWith('collision', sprite);  //=> true
     * ```
     * @memberof TileEngine
     * @function layerCollidesWith
     *
     * @param {String} name - The name of the layer to check for collision.
     * @param {Object} object - Object to check collision against.
     *
     * @returns {boolean} `true` if the object collides with a tile, `false` otherwise.
     */
    layerCollidesWith: function layerCollidesWith(name, object) {
      var x = object.x;
      var y = object.y;

      if (object.anchor) {
        x -= object.width * object.anchor.x;
        y -= object.height * object.anchor.y;
      }

      var row = getRow(y);
      var col = getCol(x);
      var endRow = getRow(y + object.height);
      var endCol = getCol(x + object.width);
      var layer = layerMap[name]; // check all tiles

      for (var r = row; r <= endRow; r++) {
        for (var c = col; c <= endCol; c++) {
          if (layer.data[c + r * this.width]) {
            return true;
          }
        }
      }

      return false;
    },

    /**
     * Get the tile at the specified layer using either x and y coordinates or row and column coordinates.
     *
     * ```js
     * import { TileEngine } from 'kontra';
     *
     * let tileEngine = TileEngine({
     *   tilewidth: 32,
     *   tileheight: 32,
     *   width: 4,
     *   height: 4,
     *   tilesets: [{
     *     // ...
     *   }],
     *   layers: [{
     *     name: 'collision',
     *     data: [ 0,0,0,0,
     *             0,1,4,0,
     *             0,2,5,0,
     *             0,0,0,0 ]
     *   }]
     * });
     *
     * tileEngine.tileAtLayer('collision', {x: 50, y: 50});  //=> 1
     * tileEngine.tileAtLayer('collision', {row: 2, col: 1});  //=> 2
     * ```
     * @memberof TileEngine
     * @function tileAtLayer
     *
     * @param {String} name - Name of the layer.
     * @param {Object} position - Position of the tile in either {x, y} or {row, col} coordinates.
     *
     * @returns {Number} The tile index. Will return `-1` if no layer exists by the provided name.
     */
    tileAtLayer: function tileAtLayer(name, position) {
      var row = position.row || getRow(position.y);
      var col = position.col || getCol(position.x);

      if (layerMap[name]) {
        return layerMap[name].data[col + row * tileEngine.width];
      }

      return -1;
    },

    /**
     * Set the tile at the specified layer using either x and y coordinates or row and column coordinates.
     *
     * ```js
     * import { TileEngine } from 'kontra';
     *
     * let tileEngine = TileEngine({
     *   tilewidth: 32,
     *   tileheight: 32,
     *   width: 4,
     *   height: 4,
     *   tilesets: [{
     *     // ...
     *   }],
     *   layers: [{
     *     name: 'collision',
     *     data: [ 0,0,0,0,
     *             0,1,4,0,
     *             0,2,5,0,
     *             0,0,0,0 ]
     *   }]
     * });
     *
     * tileEngine.setTileAtLayer('collision', {row: 2, col: 1}, 10);
     * tileEngine.tileAtLayer('collision', {row: 2, col: 1});  //=> 10
     * ```
     * @memberof TileEngine
     * @function setTileAtLayer
     *
     * @param {String} name - Name of the layer.
     * @param {Object} position - Position of the tile in either {x, y} or {row, col} coordinates.
     * @param {Number} tile - Tile index to set.
     */
    setTileAtLayer: function setTileAtLayer(name, position, tile) {
      var row = position.row || getRow(position.y);
      var col = position.col || getCol(position.x);

      if (layerMap[name]) {
        layerMap[name]._d = true;
        layerMap[name].data[col + row * tileEngine.width] = tile;
      }
    },

    /**
     * Set the data at the specified layer.
     *
     * ```js
     * import { TileEngine } from 'kontra';
     *
     * let tileEngine = TileEngine({
     *   tilewidth: 32,
     *   tileheight: 32,
     *   width: 2,
     *   height: 2,
     *   tilesets: [{
     *     // ...
     *   }],
     *   layers: [{
     *     name: 'collision',
     *     data: [ 0,1,
     *             2,3 ]
     *   }]
     * });
     *
     * tileEngine.setLayer('collision', [ 4,5,6,7]);
     * tileEngine.tileAtLayer('collision', {row: 0, col: 0});  //=> 4
     * tileEngine.tileAtLayer('collision', {row: 0, col: 1});  //=> 5
     * tileEngine.tileAtLayer('collision', {row: 1, col: 0});  //=> 6
     * tileEngine.tileAtLayer('collision', {row: 1, col: 1});  //=> 7
     * ```
     *
     * @memberof TileEngine
     * @function setLayer
     *
     * @param {String} name - Name of the layer.
     * @param {Number[]} data - 1D array of tile indices.
     */
    setLayer: function setLayer(name, data) {
      if (layerMap[name]) {
        layerMap[name]._d = true;
        layerMap[name].data = data;
      }
    },

    /**
     * Add an object to the tile engine. The tile engine will set the objects camera position (`sx`, `sy`) to be in sync with the tile engine camera. kontra.Sprite uses this information to draw the sprite to the correct position on the canvas.
     * @memberof TileEngine
     * @function addObject
     *
     * @param {Object} object - Object to add to the tile engine.
     */
    addObject: function addObject(object) {
      objects.push(object);
      object.sx = this._sx;
      object.sy = this._sy;
    },

    /**
     * Remove an object from the tile engine.
     * @memberof TileEngine
     * @function removeObject
     *
     * @param {Object} object - Object to remove from the tile engine.
     */
    removeObject: function removeObject(object) {
      var index = objects.indexOf(object);

      if (index !== -1) {
        objects.splice(index, 1);
        object.sx = object.sy = 0;
      }
    },
    // expose for testing
    _r: renderLayer,
    _p: prerender,
    // @if DEBUG
    layerCanvases: layerCanvases,
    layerMap: layerMap // @endif

  }, properties); // resolve linked files (source, image)

  tileEngine.tilesets.map(function (tileset) {
    // get the url of the Tiled JSON object (in this case, the properties object)
    var url = (window.__k ? window.__k.dm.get(properties) : "") || window.location.href;

    if (tileset.source) {
      // @if DEBUG
      if (!window.__k) {
        throw Error("You must use \"load\" or \"loadData\" to resolve tileset.source");
      } // @endif


      var source = window.__k.d[window.__k.u(tileset.source, url)]; // @if DEBUG


      if (!source) {
        throw Error("You must load the tileset source \"".concat(tileset.source, "\" before loading the tileset"));
      } // @endif


      Object.keys(source).map(function (key) {
        tileset[key] = source[key];
      });
    }

    if ("" + tileset.image === tileset.image) {
      // @if DEBUG
      if (!window.__k) {
        throw Error("You must use \"load\" or \"loadImage\" to resolve tileset.image");
      } // @endif


      var image = window.__k.i[window.__k.u(tileset.image, url)]; // @if DEBUG


      if (!image) {
        throw Error("You must load the image \"".concat(tileset.image, "\" before loading the tileset"));
      } // @endif


      tileset.image = image;
    }
  });
  /**
   * Get the row from the y coordinate.
   * @private
   *
   * @param {Number} y - Y coordinate.
   *
   * @return {Number}
   */

  function getRow(y) {
    return y / tileEngine.tileheight | 0;
  }
  /**
   * Get the col from the x coordinate.
   * @private
   *
   * @param {Number} x - X coordinate.
   *
   * @return {Number}
   */


  function getCol(x) {
    return x / tileEngine.tilewidth | 0;
  }
  /**
   * Render a layer.
   * @private
   *
   * @param {Object} layer - Layer data.
   * @param {Context} context - Context to draw layer to.
   */


  function renderLayer(layer, context) {
    context.save();
    context.globalAlpha = layer.opacity;
    (layer.data || []).map(function (tile, index) {
      // skip empty tiles (0)
      if (!tile) return; // find the tileset the tile belongs to
      // assume tilesets are ordered by firstgid

      var tileset;

      for (var i = tileEngine.tilesets.length - 1; i >= 0; i--) {
        tileset = tileEngine.tilesets[i];

        if (tile / tileset.firstgid >= 1) {
          break;
        }
      }

      var tilewidth = tileset.tilewidth || tileEngine.tilewidth;
      var tileheight = tileset.tileheight || tileEngine.tileheight;
      var margin = tileset.margin || 0;
      var image = tileset.image;
      var offset = tile - tileset.firstgid;
      var cols = tileset.columns || image.width / (tilewidth + margin) | 0;
      var x = index % tileEngine.width * tilewidth;
      var y = (index / tileEngine.width | 0) * tileheight;
      var sx = offset % cols * (tilewidth + margin);
      var sy = (offset / cols | 0) * (tileheight + margin);
      context.drawImage(image, sx, sy, tilewidth, tileheight, x, y, tilewidth, tileheight);
    });
    context.restore();
  }
  /**
   * Pre-render the tiles to make drawing fast.
   * @private
   */


  function prerender() {
    if (tileEngine.layers) {
      tileEngine.layers.map(function (layer) {
        layer._d = false;
        layerMap[layer.name] = layer;

        if (layer.visible !== false) {
          tileEngine._r(layer, offscreenContext);
        }
      });
    }
  }
  /**
   * Render a tile engine canvas.
   * @private
   *
   * @param {HTMLCanvasElement} canvas - Tile engine canvas to draw.
   */


  function _render(canvas) {
    var _getCanvas = (0, _canvas.getCanvas)(),
        width = _getCanvas.width,
        height = _getCanvas.height;

    var sWidth = Math.min(canvas.width, width);
    var sHeight = Math.min(canvas.height, height);
    tileEngine.context.drawImage(canvas, tileEngine.sx, tileEngine.sy, sWidth, sHeight, 0, 0, sWidth, sHeight);
  }

  prerender();
  return tileEngine;
}