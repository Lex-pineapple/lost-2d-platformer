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

  playDoorSound() {
    this.effects.play('doorSound', soundConfigEffects);
  }

  playPickup1() {
    this.effects.play('pickupCoin1', soundConfigEffects);
  }

  playPickup2() {
    this.effects.play('pickupCoin2', soundConfigEffects);
  }

  playPickup3() {
    this.effects.play('pickupCoin3', soundConfigEffects);
  }

  playKeyPickup() {
    this.effects.play('keyPuckup', soundConfigEffects);
  }

  playHealthPickup() {
    this.effects.play('healthPickup', soundConfigEffects);
  }

  playHurtSwing() {
    this.effects.play('hurtSwing', soundConfigEffects);
  }

  playForestMusicScene1() {
    this.stopAnyMusic();
    this.music.play('forestMusicScene1', soundConfigMusic);
  }

  playDialogEffect() {
    this.effects.play('dialogSound', soundConfigEffects);
  }

  playCavernMusic() {
    this.stopAnyMusic();
    this.music.play('cavernMusic', soundConfigMusic);
  }

  playForestMusicScene3() {
    this.stopAnyMusic();
    this.music.play('forestMusicScene3', soundConfigMusic);
  }

  playVictoryMusic() {
    this.stopAnyMusic();
    this.music.play('victoryMusic', { volume: soundConfigMusic.volume });
  }

  playGameOverMusic() {
    this.stopAnyMusic();
    this.music.play('gamoOverMusic', { volume: soundConfigMusic.volume });
  }

  setVolumeMusic(value: number) {
    soundConfigMusic.volume = value;
    this.music.setVolume(soundConfigMusic.volume);
  }

  setVolumeEffects(value: number) {
    soundConfigEffects.volume = value;
    this.effects.setVolume(soundConfigEffects.volume);
  }

  stopAnyMusic() {
    this.music.stopAll();
  }

  stopAnyEffects() {
    this.effects.stopAll();
  }
}

export default SoundService;
