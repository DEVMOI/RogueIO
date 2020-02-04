"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerPlugin = registerPlugin;
exports.unregisterPlugin = unregisterPlugin;
exports.extendObject = extendObject;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * A plugin system based on the [interceptor pattern](https://en.wikipedia.org/wiki/Interceptor_pattern), designed to share reusable code such as more advance collision detection or a 2D physics engine.
 *
 * ```js
 * import { registerPlugin, Sprite } from 'RogueJS';
 * import loggingPlugin from 'path/to/plugin/code.js'
 *
 * // register a plugin that adds logging to all Sprites
 * registerPlugin(Sprite, loggingPlugin);
 * ```
 * @sectionName Plugin
 */

/**
 * @docs docs/api_docs/plugin.js
 */

/**
 * Get the RogueJS object method name from the plugin.
 *
 * @param {String} methodName - Before/After function name
 *
 * @returns {String}
 */
function getMethod(methodName) {
  var methodTitle = methodName.substr(methodName.search(/[A-Z]/));
  return methodTitle[0].toLowerCase() + methodTitle.substr(1);
}
/**
 * Remove an interceptor.
 *
 * @param {function[]} interceptors - Before/After interceptor list
 * @param {function} fn - Interceptor function
 */


function removeInterceptor(interceptors, fn) {
  var index = interceptors.indexOf(fn);

  if (index !== -1) {
    interceptors.splice(index, 1);
  }
}
/**
 * Register a plugin to run a set of functions before or after the RogueJS object functions.
 * @function registerPlugin
 *
 * @param {Object} RogueJSObj - RogueJS object to attach the plugin to.
 * @param {Object} pluginObj - Plugin object with before and after intercept functions.
 */


function registerPlugin(RogueJSObj, pluginObj) {
  var objectProto = RogueJSObj.prototype;
  if (!objectProto) return; // create interceptor list and functions

  if (!objectProto._inc) {
    objectProto._inc = {};

    objectProto._bInc = function beforePlugins(context, method) {
      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      return this._inc[method].before.reduce(function (acc, fn) {
        var newArgs = fn.apply(void 0, [context].concat(_toConsumableArray(acc)));
        return newArgs ? newArgs : acc;
      }, args);
    };

    objectProto._aInc = function afterPlugins(context, method, result) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        args[_key2 - 3] = arguments[_key2];
      }

      return this._inc[method].after.reduce(function (acc, fn) {
        var newResult = fn.apply(void 0, [context, acc].concat(args));
        return newResult ? newResult : acc;
      }, result);
    };
  } // add plugin to interceptors


  Object.getOwnPropertyNames(pluginObj).forEach(function (methodName) {
    var method = getMethod(methodName);
    if (!objectProto[method]) return; // override original method

    if (!objectProto["_o" + method]) {
      objectProto["_o" + method] = objectProto[method];

      objectProto[method] = function interceptedFn() {
        var _objectProto;

        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        // call before interceptors
        var alteredArgs = this._bInc.apply(this, [this, method].concat(args));

        var result = (_objectProto = objectProto["_o" + method]).call.apply(_objectProto, [this].concat(_toConsumableArray(alteredArgs))); // call after interceptors


        return this._aInc.apply(this, [this, method, result].concat(args));
      };
    } // create interceptors for the method


    if (!objectProto._inc[method]) {
      objectProto._inc[method] = {
        before: [],
        after: []
      };
    }

    if (methodName.startsWith("before")) {
      objectProto._inc[method].before.push(pluginObj[methodName]);
    } else if (methodName.startsWith("after")) {
      objectProto._inc[method].after.push(pluginObj[methodName]);
    }
  });
}
/**
 * Unregister a plugin from a RogueJS object.
 * @function unregisterPlugin
 *
 * @param {Object} RogueJSObj - RogueJS object to detach plugin from.
 * @param {Object} pluginObj - The plugin object that was passed during registration.
 */


function unregisterPlugin(RogueJSObj, pluginObj) {
  var objectProto = RogueJSObj.prototype;
  if (!objectProto || !objectProto._inc) return; // remove plugin from interceptors

  Object.getOwnPropertyNames(pluginObj).forEach(function (methodName) {
    var method = getMethod(methodName);

    if (methodName.startsWith("before")) {
      removeInterceptor(objectProto._inc[method].before, pluginObj[methodName]);
    } else if (methodName.startsWith("after")) {
      removeInterceptor(objectProto._inc[method].after, pluginObj[methodName]);
    }
  });
}
/**
 * Safely extend the functionality of a RogueJS object. Any properties that already exist on the RogueJS object will not be added.
 *
 * ```js
 * import { extendObject, Vector } from 'RogueJS';
 *
 * // add a subtract function to all Vectors
 * extendObject(Vector, {
 *   subtract(vec) {
 *     return Vector(this.x - vec.x, this.y - vec.y);
 *   }
 * });
 * ```
 * @function extendObject
 *
 * @param {Object} RogueJSObj - RogueJS object to extend
 * @param {Object} properties - Properties to add.
 */


function extendObject(RogueJSObj, properties) {
  var objectProto = RogueJSObj.prototype;
  if (!objectProto) return;
  Object.getOwnPropertyNames(properties).forEach(function (prop) {
    if (!objectProto[prop]) {
      objectProto[prop] = properties[prop];
    }
  });
}