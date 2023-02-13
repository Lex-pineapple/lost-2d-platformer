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

  playPickup1() {
    this.effects.play('pickupCoin1', soundConfigEffects);
  }

  playPickup2() {
    this.effects.play('pickupCoin2', soundConfigEffects);
  }

  playHurtSwing() {
    this.effects.stopAll();
    this.effects.play('hurtSwing', soundConfigEffects);
  }

  playForestMusicScene1() {
    // this.music.play('forestMusicScene1', soundConfigMusic);
    this.music.play('forestMusicScene1', { volume: 0.1 });
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
