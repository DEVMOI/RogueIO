"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

exports.rightPad = rightPad;