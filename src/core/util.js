export default {
  tryTo(desc, callback) {
    for (let timeout = 1000; timeout > 0; timeout--) {
      if (callback()) {
        return;
      }
    }
    throw "Timeout while tring to " + desc;
  },
  randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
   shuffle(arr){
    let temp, r;
    for (let i = 1; i < arr.length; i++) {
        r = this.randomRange(0,i);
        temp = arr[i];
        arr[i] = arr[r];
        arr[r] = temp;
    }
    return arr;
}
};
