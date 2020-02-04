"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = spriteFactory;

var _canvas = require("./canvas.js");

var _vector = _interopRequireDefault(require("./vector.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * A versatile way to update and draw your game objects. It can handle simple rectangles, images, and sprite sheet animations. It can be used for your main player object as well as tiny particles in a particle engine.
 * @class Sprite
 *
 * @param {Object} properties - Properties of the sprite.
 * @param {Number} properties.x - X coordinate of the position vector.
 * @param {Number} properties.y - Y coordinate of the position vector.
 * @param {Number} [properties.dx] - X coordinate of the velocity vector.
 * @param {Number} [properties.dy] - Y coordinate of the velocity vector.
 * @param {Number} [properties.ddx] - X coordinate of the acceleration vector.
 * @param {Number} [properties.ddy] - Y coordinate of the acceleration vector.
 *
 * @param {String} [properties.color] - Fill color for the sprite if no image or animation is provided.
 * @param {Number} [properties.width] - Width of the sprite.
 * @param {Number} [properties.height] - Height of the sprite.
 *
 * @param {Number} [properties.ttl=Infinity] - How many frames the sprite should be alive. Used by RogueIO.Pool.
 * @param {Number} [properties.rotation=0] - Sprites rotation around the origin in radians.
 * @param {Number} [properties.anchor={x:0,y:0}] - The x and y origin of the sprite. {x:0, y:0} is the top left corner of the sprite, {x:1, y:1} is the bottom right corner.
 *
 * @param {Canvas​Rendering​Context2D} [properties.context] - The context the sprite should draw to. Defaults to [core.getContext()](api/core#getContext).
 *
 * @param {Image|HTMLCanvasElement} [properties.image] - Use an image to draw the sprite.
 * @param {Object} [properties.animations] - An object of [Animations](api/animation) from a RogueIO.Spritesheet to animate the sprite.
 *
 * @param {Function} [properties.update] - Function called every frame to update the sprite.
 * @param {Function} [properties.render] - Function called every frame to render the sprite.
 * @param {*} [properties.*] - Any additional properties you need added to the sprite. For example, if you pass `Sprite({type: 'player'})` then the sprite will also have a property of the same name and value. You can pass as many additional properties as you want.
 */
var Sprite =
/*#__PURE__*/
function () {
  /**
   * @docs docs/api_docs/sprite.js
   */
  function Sprite(properties) {
    _classCallCheck(this, Sprite);

    this.init(properties);
  }
  /**
   * Use this function to reinitialize a sprite. It takes the same properties object as the constructor. Useful it you want to repurpose a sprite.
   * @memberof Sprite
   * @function init
   *
   * @param {Object} properties - Properties of the sprite.
   */


  _createClass(Sprite, [{
    key: "init",
    value: function init() {
      var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var x = properties.x,
          y = properties.y,
          dx = properties.dx,
          dy = properties.dy,
          ddx = properties.ddx,
          ddy = properties.ddy,
          width = properties.width,
          height = properties.height,
          image = properties.image;
      /**
       * The sprites position vector. The sprites position is its position in the world, as opposed to the position in the [viewport](api/sprite#viewX). Typically the position in the world and the viewport are the same value. If the sprite has been [added to a tileEngine](/api/tileEngine#addObject), the position vector represents where in the tile world the sprite is while the viewport represents where to draw the sprite in relation to the top-left corner of the canvas.
       * @memberof Sprite
       * @property {RogueIO.Vector} position
       */

      this.position = (0, _vector["default"])(x, y);
      /**
       * The sprites velocity vector.
       * @memberof Sprite
       * @property {RogueIO.Vector} velocity
       */

      this.velocity = (0, _vector["default"])(dx, dy);
      /**
       * The sprites acceleration vector.
       * @memberof Sprite
       * @property {RogueIO.Vector} acceleration
       */

      this.acceleration = (0, _vector["default"])(ddx, ddy); // defaults
      // sx = flipX, sy = flipY

      this._fx = this._fy = 1;
      /**
       * The rotation of the sprite around the origin in radians.
       * @memberof Sprite
       * @property {Number} rotation
       */

      this.width = this.height = this.rotation = 0;
      /**
       * How may frames the sprite should be alive. Primarily used by RogueIO.Pool to know when to recycle an object.
       * @memberof Sprite
       * @property {Number} ttl
       */

      this.ttl = Infinity;
      /**
       * The x and y origin of the sprite. {x:0, y:0} is the top left corner of the sprite, {x:1, y:1} is the bottom right corner.
       * @memberof Sprite
       * @property {Object} anchor
       *
       * @example
       * // exclude-code:start
       * let { Sprite } = RogueIO;
       * // exclude-code:end
       * // exclude-script:start
       * import { Sprite } from 'RogueIO';
       * // exclude-script:end
       *
       * let sprite = Sprite({
       *   x: 150,
       *   y: 100,
       *   color: 'red',
       *   width: 50,
       *   height: 50,
       *   // exclude-code:start
       *   context: context,
       *   // exclude-code:end
       *   render: function() {
       *     this.draw();
       *
       *     // draw origin
       *     this.context.fillStyle = 'yellow';
       *     this.context.beginPath();
       *     this.context.arc(this.x, this.y, 3, 0, 2*Math.PI);
       *     this.context.fill();
       *   }
       * });
       * sprite.render();
       *
       * sprite.anchor = {x: 0.5, y: 0.5};
       * sprite.x = 300;
       * sprite.render();
       *
       * sprite.anchor = {x: 1, y: 1};
       * sprite.x = 450;
       * sprite.render();
       */

      this.anchor = {
        x: 0,
        y: 0
      };
      /**
       * The context the sprite will draw to.
       * @memberof Sprite
       * @property {Canvas​Rendering​Context2D} context
       */

      this.context = (0, _canvas.getContext)();
      /**
       * The color of the sprite if it was passed as an argument.
       * @memberof Sprite
       * @property {String} color
       */

      /**
       * The image the sprite will use when drawn if passed as an argument.
       * @memberof Sprite
       * @property {Image|HTMLCanvasElement} image
       */
      // add all properties to the sprite, overriding any defaults

      for (var prop in properties) {
        this[prop] = properties[prop];
      } // image sprite


      if (image) {
        this.width = width !== undefined ? width : image.width;
        this.height = height !== undefined ? height : image.height;
      }
      /**
       * The X coordinate of the camera. Used to determine [viewX](api/sprite#viewX).
       * @memberof Sprite
       * @property {Number} sx
       */


      this.sx = 0;
      /**
       * The Y coordinate of the camera. Used to determine [viewY](api/sprite#viewY).
       * @memberof Sprite
       * @property {Number} sy
       */

      this.sy = 0;
    } // define getter and setter shortcut functions to make it easier to work with the
    // position, velocity, and acceleration vectors.

    /**
     * X coordinate of the position vector.
     * @memberof Sprite
     * @property {Number} x
     */

  }, {
    key: "isAlive",

    /**
     * Check if the sprite is alive. Primarily used by RogueIO.Pool to know when to recycle an object.
     * @memberof Sprite
     * @function isAlive
     *
     * @returns {Boolean} `true` if the sprites [ttl](api/sprite#ttl) property is above `0`, `false` otherwise.
     */
    value: function isAlive() {
      return this.ttl > 0;
    }
    /**
     * Check if the sprite collide with the object. Uses a simple [Axis-Aligned Bounding Box (AABB) collision check](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection#Axis-Aligned_Bounding_Box). Takes into account the sprites [anchor](api/sprite#anchor).
     *
     * **NOTE:** Does not take into account sprite rotation. If you need collision detection between rotated sprites you will need to implement your own `collidesWith()` function. I suggest looking at the Separate Axis Theorem.
     *
     * ```js
     * import { Sprite } from 'RogueIO';
     *
     * let sprite = Sprite({
     *   x: 100,
     *   y: 200,
     *   width: 20,
     *   height: 40
     * });
     *
     * let sprite2 = Sprite({
     *   x: 150,
     *   y: 200,
     *   width: 20,
     *   height: 20
     * });
     *
     * sprite.collidesWith(sprite2);  //=> false
     *
     * sprite2.x = 115;
     *
     * sprite.collidesWith(sprite2);  //=> true
     * ```
     *
     * If you need a different type of collision check, you can override this function by passing an argument by the same name.
     *
     * ```js
     * // circle collision
     * function collidesWith(object) {
     *   let dx = this.x - object.x;
     *   let dy = this.y - object.y;
     *   let distance = Math.sqrt(dx * dx + dy * dy);
     *
     *   return distance < this.radius + object.radius;
     * }
     *
     * let sprite = Sprite({
     *   x: 100,
     *   y: 200,
     *   radius: 25,
     *   collidesWith: collidesWith
     * });
     *
     * let sprite2 = Sprite({
     *   x: 150,
     *   y: 200,
     *   radius: 30,
     *   collidesWith: collidesWith
     * });
     *
     * sprite.collidesWith(sprite2);  //=> true
     * ```
     * @memberof Sprite
     * @function collidesWith
     *
     * @param {Object} object - Object to check collision against.
     *
     * @returns {Boolean|null} `true` if the objects collide, `false` otherwise. Will return `null` if the either of the two objects are rotated.
     */

  }, {
    key: "collidesWith",
    value: function collidesWith(object) {
      if (this.rotation || object.rotation) return null; // take into account sprite anchors

      var x = this.x - this.width * this.anchor.x;
      var y = this.y - this.height * this.anchor.y;
      var objX = object.x;
      var objY = object.y;

      if (object.anchor) {
        objX -= object.width * object.anchor.x;
        objY -= object.height * object.anchor.y;
      }

      return x < objX + object.width && x + this.width > objX && y < objY + object.height && y + this.height > objY;
    }
    /**
     * Update the sprites position based on its velocity and acceleration. Calls the sprites [advance()](api/sprite#advance) function.
     * @memberof Sprite
     * @function update
     *
     * @param {Number} [dt] - Time since last update.
     */

  }, {
    key: "update",
    value: function update(dt) {
      this.advance(dt);
    }
    /**
     * Render the sprite. Calls the sprites [draw()](api/sprite#draw) function.
     * @memberof Sprite
     * @function render
     */

  }, {
    key: "render",
    value: function render() {
      this.draw();
    }
    /**
     * Set the currently playing animation of an animation sprite.
     *
     * ```js
     * import { Sprite, SpriteSheet } from 'RogueIO';
     *
     * let spriteSheet = SpriteSheet({
     *   // ...
     *   animations: {
     *     idle: {
     *       frames: 1
     *     },
     *     walk: {
     *       frames: [1,2,3]
     *     }
     *   }
     * });
     *
     * let sprite = Sprite({
     *   x: 100,
     *   y: 200,
     *   animations: spriteSheet.animations
     * });
     *
     * sprite.playAnimation('idle');
     * ```
     * @memberof Sprite
     * @function playAnimation
     *
     * @param {String} name - Name of the animation to play.
     */

  }, {
    key: "playAnimation",
    value: function playAnimation(name) {
      this.currentAnimation = this.animations[name];

      if (!this.currentAnimation.loop) {
        this.currentAnimation.reset();
      }
    }
    /**
     * Move the sprite by its acceleration and velocity. If the sprite is an [animation sprite](api/sprite#animation-sprite), it also advances the animation every frame.
     *
     * If you override the sprites [update()](api/sprite#update) function with your own update function, you can call this function to move the sprite normally.
     *
     * ```js
     * import { Sprite } from 'RogueIO';
     *
     * let sprite = Sprite({
     *   x: 100,
     *   y: 200,
     *   width: 20,
     *   height: 40,
     *   dx: 5,
     *   dy: 2,
     *   update: function() {
     *     // move the sprite normally
     *     sprite.advance();
     *
     *     // change the velocity at the edges of the canvas
     *     if (this.x < 0 ||
     *         this.x + this.width > this.context.canvas.width) {
     *       this.dx = -this.dx;
     *     }
     *     if (this.y < 0 ||
     *         this.y + this.height > this.context.canvas.height) {
     *       this.dy = -this.dy;
     *     }
     *   }
     * });
     * ```
     * @memberof Sprite
     * @function advance
     *
     * @param {Number} [dt] - Time since last update.
     *
     */

  }, {
    key: "advance",
    value: function advance(dt) {
      this.velocity = this.velocity.add(this.acceleration, dt);
      this.position = this.position.add(this.velocity, dt);
      this.ttl--;

      if (this.currentAnimation) {
        this.currentAnimation.update(dt);
      }
    }
    /**
     * Draw the sprite at its X and Y position. This function changes based on the type of the sprite. For a [rectangle sprite](api/sprite#rectangle-sprite), it uses `context.fillRect()`, for an [image sprite](api/sprite#image-sprite) it uses `context.drawImage()`, and for an [animation sprite](api/sprite#animation-sprite) it uses the [currentAnimation](api/sprite#currentAnimation) `render()` function.
     *
     * If you override the sprites `render()` function with your own render function, you can call this function to draw the sprite normally.
     *
     * ```js
     * import { Sprite } from 'RogueIO';
     *
     * let sprite = Sprite({
     *  x: 290,
     *  y: 80,
     *  color: 'red',
     *  width: 20,
     *  height: 40,
     *
     *  render: function() {
     *    // draw the rectangle sprite normally
     *    this.draw();
     *
     *    // outline the sprite
     *    this.context.strokeStyle = 'yellow';
     *    this.context.lineWidth = 2;
     *    this.context.strokeRect(this.x, this.y, this.width, this.height);
     *  }
     * });
     *
     * sprite.render();
     * ```
     * @memberof Sprite
     * @function draw
     */

  }, {
    key: "draw",
    value: function draw() {
      var anchorWidth = -this.width * this.anchor.x;
      var anchorHeight = -this.height * this.anchor.y;
      this.context.save();
      this.context.translate(this.viewX, this.viewY); // rotate around the anchor

      if (this.rotation) {
        this.context.rotate(this.rotation);
      } // flip sprite around the center so the x/y position does not change


      if (this._fx == -1 || this._fy == -1) {
        var x = this.width / 2 + anchorWidth;
        var y = this.height / 2 + anchorHeight;
        this.context.translate(x, y);
        this.context.scale(this._fx, this._fy);
        this.context.translate(-x, -y);
      }

      if (this.image) {
        this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height, anchorWidth, anchorHeight, this.width, this.height);
      } else if (this.currentAnimation) {
        this.currentAnimation.render({
          x: anchorWidth,
          y: anchorHeight,
          width: this.width,
          height: this.height,
          context: this.context
        });
      } else {
        this.context.fillStyle = this.color;
        this.context.fillRect(anchorWidth, anchorHeight, this.width, this.height);
      }

      this.context.restore();
    }
  }, {
    key: "x",
    get: function get() {
      return this.position.x;
    }
    /**
     * Y coordinate of the position vector.
     * @memberof Sprite
     * @property {Number} y
     */
    ,
    set: function set(value) {
      this.position.x = value;
    }
  }, {
    key: "y",
    get: function get() {
      return this.position.y;
    }
    /**
     * X coordinate of the velocity vector.
     * @memberof Sprite
     * @property {Number} dx
     */
    ,
    set: function set(value) {
      this.position.y = value;
    }
  }, {
    key: "dx",
    get: function get() {
      return this.velocity.x;
    }
    /**
     * Y coordinate of the velocity vector.
     * @memberof Sprite
     * @property {Number} dy
     */
    ,
    set: function set(value) {
      this.velocity.x = value;
    }
  }, {
    key: "dy",
    get: function get() {
      return this.velocity.y;
    }
    /**
     * X coordinate of the acceleration vector.
     * @memberof Sprite
     * @property {Number} ddx
     */
    ,
    set: function set(value) {
      this.velocity.y = value;
    }
  }, {
    key: "ddx",
    get: function get() {
      return this.acceleration.x;
    }
    /**
     * Y coordinate of the acceleration vector.
     * @memberof Sprite
     * @property {Number} ddy
     */
    ,
    set: function set(value) {
      this.acceleration.x = value;
    }
  }, {
    key: "ddy",
    get: function get() {
      return this.acceleration.y;
    }
    /**
     * An object of [Animations](api/animation) from a RogueIO.SpriteSheet to animate the sprite. Each animation is named so that it can can be used by name for the sprites [playAnimation()](api/sprite#playAnimation) function.
     *
     * ```js
     * import { Sprite, SpriteSheet } from 'RogueIO';
     *
     * let spriteSheet = SpriteSheet({
     *   // ...
     *   animations: {
     *     idle: {
     *       frames: 1,
     *       loop: false,
     *     },
     *     walk: {
     *       frames: [1,2,3]
     *     }
     *   }
     * });
     *
     * let sprite = Sprite({
     *   x: 100,
     *   y: 200,
     *   animations: spriteSheet.animations
     * });
     *
     * sprite.playAnimation('idle');
     * ```
     * @memberof Sprite
     * @property {Object} animations
     */
    ,
    set: function set(value) {
      this.acceleration.y = value;
    }
  }, {
    key: "animations",
    get: function get() {
      return this._a;
    }
    /**
     * Readonly. X coordinate of where to draw the sprite. Typically the same value as the [position vector](api/sprite#position) unless the sprite has been [added to a tileEngine](api/tileEngine#addObject).
     * @memberof Sprite
     * @property {Number} viewX
     */
    ,
    set: function set(value) {
      var prop, firstAnimation; // a = animations

      this._a = {}; // clone each animation so no sprite shares an animation

      for (prop in value) {
        this._a[prop] = value[prop].clone(); // default the current animation to the first one in the list

        firstAnimation = firstAnimation || this._a[prop];
      }
      /**
       * The currently playing Animation object if `animations` was passed as an argument.
       * @memberof Sprite
       * @property {RogueIO.Animation} currentAnimation
       */


      this.currentAnimation = firstAnimation;
      this.width = this.width || firstAnimation.width;
      this.height = this.height || firstAnimation.height;
    } // readonly

  }, {
    key: "viewX",
    get: function get() {
      return this.x - this.sx;
    }
    /**
     * Readonly. Y coordinate of where to draw the sprite. Typically the same value as the [position vector](api/sprite#position) unless the sprite has been [added to a tileEngine](api/tileEngine#addObject).
     * @memberof Sprite
     * @property {Number} viewY
     */
    ,
    set: function set(value) {
      return;
    }
  }, {
    key: "viewY",
    get: function get() {
      return this.y - this.sy;
    }
    /**
     * The width of the sprite. If the sprite is a [rectangle sprite](api/sprite#rectangle-sprite), it uses the passed in value. For an [image sprite](api/sprite#image-sprite) it is the width of the image. And for an [animation sprite](api/sprite#animation-sprite) it is the width of a single frame of the animation.
     *
     * Setting the value to a negative number will result in the sprite being flipped across the vertical axis while the width will remain a positive value.
     * @memberof Sprite
     * @property {Number} width
     */
    ,
    set: function set(value) {
      return;
    }
  }, {
    key: "width",
    get: function get() {
      return this._w;
    }
    /**
     * The height of the sprite. If the sprite is a [rectangle sprite](api/sprite#rectangle-sprite), it uses the passed in value. For an [image sprite](api/sprite#image-sprite) it is the height of the image. And for an [animation sprite](api/sprite#animation-sprite) it is the height of a single frame of the animation.
     *
     * Setting the value to a negative number will result in the sprite being flipped across the horizontal axis while the height will remain a positive value.
     * @memberof Sprite
     * @property {Number} height
     */
    ,
    set: function set(value) {
      var sign = value < 0 ? -1 : 1;
      this._fx = sign;
      this._w = value * sign;
    }
  }, {
    key: "height",
    get: function get() {
      return this._h;
    },
    set: function set(value) {
      var sign = value < 0 ? -1 : 1;
      this._fy = sign;
      this._h = value * sign;
    }
  }]);

  return Sprite;
}();

function spriteFactory(properties) {
  return new Sprite(properties);
}

spriteFactory.prototype = Sprite.prototype;
spriteFactory["class"] = Sprite;