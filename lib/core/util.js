"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mod = mod;
exports.clamp = clamp;
exports.capitalize = capitalize;
exports.format = format;
exports.rightPad = exports.shuffle = exports.randomRange = exports.tryTo = exports.noop = void 0;

var _this = void 0;

var noop = function noop() {};

exports.noop = noop;

var tryTo = function tryTo(desc, callback) {
  for (var timeout = 1000; timeout > 0; timeout--) {
    if (callback()) {
      return;
    }
  }

  throw "Timeout while tring to " + desc;
};

exports.tryTo = tryTo;

var randomRange = function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.randomRange = randomRange;

var shuffle = function shuffle(arr) {
  var temp, r;

  for (var i = 1; i < arr.length; i++) {
    r = _this.randomRange(0, i);
    temp = arr[i];
    arr[i] = arr[r];
    arr[r] = temp;
  }

  return arr;
};

exports.shuffle = shuffle;

var rightPad = function rightPad(textArray) {
  var finalText = "";
  textArray.forEach(function (text) {
    text += "";

    for (var i = text.length; i < 10; i++) {
      text += " ";
    }

    finalText += text;
  });
  return finalText;
};
/**
 * Always positive modulus
 * @param x Operand
 * @param n Modulus
 * @returns x modulo n
 */


exports.rightPad = rightPad;

function mod(x, n) {
  return (x % n + n) % n;
}

function clamp(val) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  if (val < min) return min;
  if (val > max) return max;
  return val;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.substring(1);
}
/**
 * Format a string in a flexible way. Scans for %s strings and replaces them with arguments. List of patterns is modifiable via String.format.map.
 * @param {string} template
 * @param {any} [argv]
 */


function format(template) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var map = format.map;

  var replacer = function replacer(match, group1, group2, index) {
    if (template.charAt(index - 1) == "%") {
      return match.substring(1);
    }

    if (!args.length) {
      return match;
    }

    var obj = args[0];
    var group = group1 || group2;
    var parts = group.split(",");
    var name = parts.shift() || "";
    var method = map[name.toLowerCase()];

    if (!method) {
      return match;
    }

    obj = args.shift();
    var replaced = obj[method].apply(obj, parts);
    var first = name.charAt(0);

    if (first != first.toLowerCase()) {
      replaced = capitalize(replaced);
    }

    return replaced;
  };

  return template.replace(/%(?:([a-z]+)|(?:{([^}]+)}))/gi, replacer);
}