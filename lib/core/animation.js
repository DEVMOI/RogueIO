"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = animationFactory;

var _canvas = require("./canvas.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * An object for drawing sprite sheet animations.
 *
 * An animation defines the sequence of frames to use from a sprite sheet. It also defines at what speed the animation should run using `frameRate`.
 *
 * Typically you don't create an kontra.Animation directly, but rather you would create them from kontra.SpriteSheet by passing the `animations` argument.
 *
 * ```js
 * import { SpriteSheet, Animation } from 'kontra';
 *
 * let image = new Image();
 * image.src = 'assets/imgs/character_walk_sheet.png';
 * image.onload = function() {
 *   let spriteSheet = SpriteSheet({
 *     image: image,
 *     frameWidth: 72,
 *     frameHeight: 97
 *   });
 *
 *   // you typically wouldn't create an Animation this way
 *   let animation = Animation({
 *     spriteSheet: spriteSheet,
 *     frames: [1,2,3,6],
 *     frameRate: 30
 *   });
 * };
 * ```
 * @class Animation
 *
 * @param {Object} properties - Properties of the animation.
 * @param {kontra.SpriteSheet} properties.spriteSheet - Sprite sheet for the animation.
 * @param {Number[]} properties.frames - List of frames of the animation.
 * @param {Number}  properties.frameRate - Number of frames to display in one second.
 * @param {Boolean} [properties.loop=true] - If the animation should loop.
 */
var Animation =
/*#__PURE__*/
function () {
  function Animation() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        spriteSheet = _ref.spriteSheet,
        frames = _ref.frames,
        frameRate = _ref.frameRate,
        _ref$loop = _ref.loop,
        loop = _ref$loop === void 0 ? true : _ref$loop;

    _classCallCheck(this, Animation);

    /**
     * The sprite sheet to use for the animation.
     * @memberof Animation
     * @property {kontra.SpriteSheet} spriteSheet
     */
    this.spriteSheet = spriteSheet;
    /**
     * Sequence of frames to use from the sprite sheet.
     * @memberof Animation
     * @property {Number[]} frames
     */

    this.frames = frames;
    /**
     * Number of frames to display per second. Adjusting this value will change the speed of the animation.
     * @memberof Animation
     * @property {Number} frameRate
     */

    this.frameRate = frameRate;
    /**
     * If the animation should loop back to the beginning once completed.
     * @memberof Animation
     * @property {Boolean} loop
     */

    this.loop = loop;
    var _spriteSheet$frame = spriteSheet.frame,
        width = _spriteSheet$frame.width,
        height = _spriteSheet$frame.height,
        _spriteSheet$frame$ma = _spriteSheet$frame.margin,
        margin = _spriteSheet$frame$ma === void 0 ? 0 : _spriteSheet$frame$ma;
    /**
     * The width of an individual frame. Taken from the property of the same name in the [spriteSheet](api/animation#spriteSheet).
     * @memberof Animation
     * @property {Number} width
     */

    this.width = width;
    /**
     * The height of an individual frame. Taken from the property of the same name in the [spriteSheet](api/animation#spriteSheet).
     * @memberof Animation
     * @property {Number} height
     */

    this.height = height;
    /**
     * The space between each frame. Taken from the property of the same name in the [spriteSheet](api/animation#spriteSheet).
     * @memberof Animation
     * @property {Number} margin
     */

    this.margin = margin; // f = frame, a = accumulator

    this._f = 0;
    this._a = 0;
  }
  /**
   * Clone an animation so it can be used more than once. By default animations passed to kontra.Sprite will be cloned so no two sprites update the same animation. Otherwise two sprites who shared the same animation would make it update twice as fast.
   * @memberof Animation
   * @function clone
   *
   * @returns {kontra.Animation} A new kontra.Animation instance.
   */


  _createClass(Animation, [{
    key: "clone",
    value: function clone() {
      return animationFactory(this);
    }
    /**
     * Reset an animation to the first frame.
     * @memberof Animation
     * @function reset
     */

  }, {
    key: "reset",
    value: function reset() {
      this._f = 0;
      this._a = 0;
    }
    /**
     * Update the animation.
     * @memberof Animation
     * @function update
     *
     * @param {Number} [dt=1/60] - Time since last update.
     */

  }, {
    key: "update",
    value: function update() {
      var dt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1 / 60;
      // if the animation doesn't loop we stop at the last frame
      if (!this.loop && this._f == this.frames.length - 1) return;
      this._a += dt; // update to the next frame if it's time

      while (this._a * this.frameRate >= 1) {
        this._f = ++this._f % this.frames.length;
        this._a -= 1 / this.frameRate;
      }
    }
    /**
     * Draw the current frame of the animation.
     * @memberof Animation
     * @function render
     *
     * @param {Object} properties - Properties to draw the animation.
     * @param {Number} properties.x - X position to draw the animation.
     * @param {Number} properties.y - Y position to draw the animation.
     * @param {Number} [properties.width] - width of the sprite. Defaults to [Animation.width](api/animation#width).
     * @param {Number} [properties.height] - height of the sprite. Defaults to [Animation.height](api/animation#height).
     * @param {Canvas​Rendering​Context2D} [properties.context] - The context the animation should draw to. Defaults to [core.getContext()](api/core#getContext).
     */

  }, {
    key: "render",
    value: function render() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          x = _ref2.x,
          y = _ref2.y,
          _ref2$width = _ref2.width,
          width = _ref2$width === void 0 ? this.width : _ref2$width,
          _ref2$height = _ref2.height,
          height = _ref2$height === void 0 ? this.height : _ref2$height,
          _ref2$context = _ref2.context,
          context = _ref2$context === void 0 ? (0, _canvas.getContext)() : _ref2$context;

      // get the row and col of the frame
      var row = this.frames[this._f] / this.spriteSheet._f | 0;
      var col = this.frames[this._f] % this.spriteSheet._f | 0;
      context.drawImage(this.spriteSheet.image, col * this.width + (col * 2 + 1) * this.margin, row * this.height + (row * 2 + 1) * this.margin, this.width, this.height, x, y, width, height);
    }
  }]);

  return Animation;
}();

function animationFactory(properties) {
  return new Animation(properties);
}

animationFactory.prototype = Animation.prototype;
animationFactory["class"] = Animation;