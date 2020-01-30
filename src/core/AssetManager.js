export default class AssetManager {
  constructor() {
    sounds = {};
  }
  // Sound Manager Code
  static initSounds(sounds) {
    this.sounds = sounds;
  }

  static playSound(soundName) {
    this.sounds[soundName].currentTime = 0;
    this.sounds[soundName].play();
  }
}
