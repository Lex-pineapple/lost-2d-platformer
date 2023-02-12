import { Sound } from 'phaser';
import { soundConfigEffects, soundConfigMusic } from './audioConfigs';

class SoundService {
  public music: Sound.HTML5AudioSoundManager;

  public effects: Sound.HTML5AudioSoundManager;

  constructor(
    effectsAudioManager: Sound.HTML5AudioSoundManager,
    musicAudioManager: Sound.HTML5AudioSoundManager
    ) {
    this.effects = effectsAudioManager;
    this.music = musicAudioManager;
  }

  playSoundButton() {
    this.effects.play('buttonSound', soundConfigEffects);
  }

  playCavernMusic() {
    this.music.play('cavernMusic', soundConfigMusic);
  }

  setVolumeMusic(value: number) {
    soundConfigMusic.volume = value;
    this.music.setVolume(soundConfigMusic.volume);
    console.log(this.music.volume);
  }

  setVolumeEffects(value: number) {
    soundConfigEffects.volume = value;
    this.effects.setVolume(soundConfigEffects.volume);
    console.log(value);
  }
}

export default SoundService;
