/**
 * A Simple Event Manager to allow for user to create their own hooks into RogueJS, or create Events for Plugins
 * @section Events
 */
export let callbacks = {};
/**
 * 3 Important lifecycle Events:
 * - `init` Emits after Rogue.JS is called
 * - `tick` Emmits every frame of the RogueJs.GameLoop [Loops Update and Render]
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
export let on = (event, callback) => {
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
export let off = (event, callback) => {
  let index;

  if (!callbacks[event] || (index = callbacks[event].indexOf(callback)) < 0)
    return;
  callbacks[event].splice(index, 1);
};
/**
 * Call all callback functions for the event. All arguments will be passed to the callback functions.
 * @function emit
 *
 * @param {String} event - Name of the event.
 * @param {*} [args] - Arguments passed to all callbacks.
 */
export let emit = (event, ...args) => {
  if (callbacks !== undefined) {
    if (!callbacks[event]) return;
    callbacks[event].map(fn => fn(...args));
  }
};
