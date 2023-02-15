import { GameObjects } from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import { Slider } from 'phaser3-rex-plugins/templates/ui/ui-components';
import NonPlayableBaseScene from './nonPlayableBaseScene';
import { ISharedState } from '../../../types/interfaces';

import { soundConfigMusic, soundConfigEffects, soundConfigMaster } from '../../audio/audioConfigs';

enum EnumLang {
  ru = 'Язык: Русский',
  en = 'Lang: English',
}

class OptionsScene extends NonPlayableBaseScene {
  private rexUI!: RexUIPlugin;

  private _langButton!: GameObjects.Text;

  private masterSlider!: Slider;

  private effectsSlider!: Slider;

  private musicSlider!: Slider;

  private currentMasterVolumeValue = soundConfigMaster.volume!;

  constructor(name: string, protected sharedState: ISharedState) {
    super('OptionsScene', sharedState);
  }

  // private previousScene!: string;
  // init(data: IInitScene) {
  //   this.previousScene = data.key;
  // }

  create() {
    super.create();
    const xAxis = this.getMiddlePositionX();
    const yAxis = this.getMiddlePositionY();
    const volumeMusic = soundConfigMusic.volume!;
    const volumeEffects = soundConfigEffects.volume!;
    this.createBackButton(40, 30);
    this.masterSlider = this.createSlider(xAxis, yAxis - 50, ' Master Volume', this.currentMasterVolumeValue, this.changeMasterVolume);
    this.musicSlider = this.createSlider(xAxis, yAxis - 25, '  Music Volume', volumeMusic, this.changeMusicVolume);
    this.effectsSlider = this.createSlider(xAxis, yAxis, 'Effects Volume', volumeEffects, this.changeEffectsVolume);
    this.createLangButton(xAxis, yAxis + 25);
  }

  createBackButton(xPos: number, yPos: number) {
    this.add
      .sprite(xPos, yPos, 'menu-arrow')
      .setInteractive({ useHandCursor: true })
      .setScale(0.5, 0.45)
      .on('pointerup', this.returnBack.bind(this));
  }

  createSlider(xPos: number, yPos: number, labelText: string, volume: number, callback: Function) {
    const labeLSlider = this.add.text(xPos - 63, yPos, `${labelText}:`);
    labeLSlider.setStyle({ fill: '#ffffff' }).setOrigin(0.5).setAlign('left');
    labeLSlider.width = 100;
    const volumeSlider = new Slider(this, {
      x: xPos + 75,
      y: yPos,
      width: 100,
      height: 10,
      value: volume,
      input: 'click',
      track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 5, 0x222222),
      indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 5, 0x3afefd),
      thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 7, 0xffffff),
      valuechangeCallback: (value) => {
        callback.call(this, value);
      },
    });
    volumeSlider.layout();
    return volumeSlider;
  }

  changeMasterVolume(value: number) {
    soundConfigMaster.volume = value;
    if (this.currentMasterVolumeValue !== undefined) {
      const prevMasterValue = this.currentMasterVolumeValue;
      this.currentMasterVolumeValue = value;
      if (value > prevMasterValue) {
        if (this.effectsSlider) {
          const effectsVolumeValue = this.effectsSlider.value;
          const newEffectVolumeValue = effectsVolumeValue + (value - prevMasterValue);
          if (effectsVolumeValue < 1) {
            this.effectsSlider.value = newEffectVolumeValue;
            this.changeEffectsVolume(newEffectVolumeValue);
          }
        }
        if (this.musicSlider) {
          const musicVolumeValue = this.musicSlider.value;
          const newMusicVolumeValue = musicVolumeValue + (value - prevMasterValue);
          if (musicVolumeValue < 1) {
            this.musicSlider.value = newMusicVolumeValue;
            this.changeMusicVolume(newMusicVolumeValue);
          }
        }
      }
      if (value < prevMasterValue) {
        if (this.effectsSlider) {
          const effectsVolumeValue = this.effectsSlider.value;
          const newEffectVolumeValue = effectsVolumeValue - (prevMasterValue - value);
          if (effectsVolumeValue > 0) {
            this.effectsSlider.value = newEffectVolumeValue;
            this.changeEffectsVolume(newEffectVolumeValue);
          }
        }
        if (this.musicSlider) {
          const musicVolumeValue = this.musicSlider.value;
          const newMusicVolumeValue = musicVolumeValue - (prevMasterValue - value);
          if (musicVolumeValue > 0) {
            this.musicSlider.value = newMusicVolumeValue;
            this.changeMusicVolume(newMusicVolumeValue);
          }
        }
      }
    }
  }

  changeMusicVolume(value: number) {
    this.soundServise.setVolumeMusic(value);
  }

  changeEffectsVolume(value: number) {
    this.soundServise.setVolumeEffects(value);
  }

  createLangButton(xPos: number, yPos: number) {
    this._langButton = this.add
      .text(xPos, yPos, EnumLang.en, { color: '#ffffff' })
      .setAlign('center')
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', this.changeLang.bind(this));
  }

  changeLang() {
    const { text } = this._langButton;
    if (text === EnumLang.en) this._langButton.text = EnumLang.ru;
    else this._langButton.text = EnumLang.en;
  }

  returnBack() {
    if (this.sharedState.playableScenePaused) {
      this.scene.start('PauseMenuScene');
    } else {
      this.scene.start('MainMenuScene');
    }
    this.soundServise.playSoundButton();
  }
}

export default OptionsScene;
