export const noop = () => {};
export const tryTo = (desc, callback) => {
  for (let timeout = 1000; timeout > 0; timeout--) {
    if (callback()) {
      return;
    }
  }
  throw "Timeout while tring to " + desc;
};
export const randomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const shuffle = arr => {
  let temp, r;
  for (let i = 1; i < arr.length; i++) {
    r = this.randomRange(0, i);
    temp = arr[i];
    arr[i] = arr[r];
    arr[r] = temp;
  }
  return arr;
};
export const rightPad = textArray => {
  let finalText = "";
  textArray.forEach(text => {
    text += "";
    for (let i = text.length; i < 10; i++) {
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
export function mod(x, n) {
  return ((x % n) + n) % n;
}

export function clamp(val, min = 0, max = 1) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.substring(1);
}

/**
 * Format a string in a flexible way. Scans for %s strings and replaces them with arguments. List of patterns is modifiable via String.format.map.
 * @param {string} template
 * @param {any} [argv]
 */
export function format(template, ...args) {
  let map = format.map;

  let replacer = function(match, group1, group2, index) {
    if (template.charAt(index - 1) == "%") {
      return match.substring(1);
    }
    if (!args.length) {
      return match;
    }
    let obj = args[0];

    let group = group1 || group2;
    let parts = group.split(",");
    let name = parts.shift() || "";
    let method = map[name.toLowerCase()];
    if (!method) {
      return match;
    }

    obj = args.shift();
    let replaced = obj[method].apply(obj, parts);

    let first = name.charAt(0);
    if (first != first.toLowerCase()) {
      replaced = capitalize(replaced);
    }

    return replaced;
  };
  return template.replace(/%(?:([a-z]+)|(?:{([^}]+)}))/gi, replacer);
}
