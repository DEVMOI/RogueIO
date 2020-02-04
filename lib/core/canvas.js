"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCanvas = getCanvas;
exports.getContext = getContext;
exports.init = init;

var _options = _interopRequireDefault(require("./options"));

var _eventmanager = require("./eventmanager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Functions for initializing the RogueJS library and getting the canvas and context
 * objects.
 *
 * ```js
 * import { getCanvas, getContext, init } from 'RogueJs';
 *
 * let { canvas, context } = init();
 *
 * // or can get canvas and context through functions
 * canvas = getCanvas();
 * context = getContext();
 * ```
 * @sectionName Core
 */
var canvasEl, context;
/**
 * Return the canvas element.
 * @function getCanvas
 *
 * @returns {HTMLCanvasElement} The canvas element for the game.
 */

function getCanvas() {
  return canvasEl;
}
/**
 * Return the context object.
 * @function getContext
 *
 * @returns {CanvasRenderingContext2D} The context object the game draws to.
 */


function getContext() {
  return context;
}
/**
 * Initialize the library and set up the canvas. Typically you will call `init()` as the first thing and give it the canvas to use. This will allow all RogueJs objects to reference the canvas when created.
 *
 * ```js
 * import { init } from 'RogueJs';
 *
 * let { canvas, context } = init('game');
 * ```
 * @function init
 *
 * @param {String|HTMLCanvasElement} [canvas] - The canvas for RogueJs to use. Can either be the ID of the canvas element or the canvas element itself. Defaults to using the first canvas element on the page.
 *
 * @returns {Object} An object with properties `canvas` and `context`. `canvas` it the canvas element for the game and `context` is the context object the game draws to.
 */


function init(canvas) {
  // check if canvas is a string first, an element next, or default to getting
  // first canvas on page
  canvasEl = document.getElementById(canvas) || canvas || document.querySelector("canvas"); // @if DEBUG

  if (!canvasEl) {
    throw Error("You must provide a canvas element for the game");
  } // @endif


  context = canvasEl.getContext("2d");
  context.font = '15px sans-serif';
  console.log(context.font);
  context.imageSmoothingEnabled = false;
  (0, _eventmanager.emit)("init");
  return {
    canvas: canvasEl,
    context: context
  };
}