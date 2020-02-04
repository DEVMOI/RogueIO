"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emit = exports.off = exports.on = exports.callbacks = void 0;

/**
 * A Simple Event Manager to allow for user to create their own hooks into RogueIO, or create Events for Plugins
 * @section Events
 */
var callbacks = {};
/**
 * 3 Important lifecycle Events:
 * - `init` Emits after Rogue.JS is called
 * - `tick` Emmits every frame of the RogueIO.GameLoop [Loops Update and Render]
 * - `assetload` Emitted after an asset has fully loaded using the asset loader. The callback function is passed the asset and the url of the asset as parameters
 * @section Lifecycel Events
 */

/**
 * Register a callback for an event to be called whenever the event is emitted. The callback will be passed all arguments used in the `emit` call.
 * @function on
 *
 * @param {String} event - Name of the event.
 * @param {Function} callback - Function that will be called when the event is emitted.
 */

exports.callbacks = callbacks;

var on = function on(event, callback) {
  callbacks[event] = callbacks[event] || [];
  callbacks[event].push(callback);
};
/**
 * Remove a callback for an event.
 * @function off
 *
 * @param {String} event - Name of the event.
 * @param {Function} callback - The function that was passed during registration.
 */


exports.on = on;

var off = function off(event, callback) {
  var index;
  if (!callbacks[event] || (index = callbacks[event].indexOf(callback)) < 0) return;
  callbacks[event].splice(index, 1);
};
/**
 * Call all callback functions for the event. All arguments will be passed to the callback functions.
 * @function emit
 *
 * @param {String} event - Name of the event.
 * @param {*} [args] - Arguments passed to all callbacks.
 */


exports.off = off;

var emit = function emit(event) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (callbacks !== undefined) {
    if (!callbacks[event]) return;
    callbacks[event].map(function (fn) {
      return fn.apply(void 0, args);
    });
  }
};

exports.emit = emit;