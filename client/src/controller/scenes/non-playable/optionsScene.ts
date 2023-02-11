import { GameObjects } from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import { Slider } from 'phaser3-rex-plugins/templates/ui/ui-components';
import NonPlayableBaseScene from './nonPlayableBaseScene';
import { ISharedState } from '../../../types/interfaces';

enum EnumLang {
  ru = 'Язык: Русский',
  en = 'Lang: English',
}

class OptionsScene extends NonPlayableBaseScene {
  private rexUI!: RexUIPlugin;

  private _langButton!: GameObjects.Text;

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
    this.createBackButton(40, 30);
    this.createSlider(xAxis, yAxis - 50, ' Master Volume', this.changeMasterVolume);
    this.createSlider(xAxis, yAxis - 25, '  Music Volume', this.changeMusicVolume);
    this.createSlider(xAxis, yAxis, 'Effects Volume', this.changeMusicVolume);
    this.createLangButton(xAxis, yAxis + 25);
  }

  createBackButton(xPos: number, yPos: number) {
    this.add
      .sprite(xPos, yPos, 'menu-arrow')
      .setInteractive({ useHandCursor: true })
      .setScale(0.5, 0.45)
      .on('pointerup', this.returnBack.bind(this));
  }

  createSlider(xPos: number, yPos: number, labelText: string, callback: Function) {
    const labeLSlider = this.add.text(xPos - 63, yPos, `${labelText}:`);
    labeLSlider.setStyle({ fill: '#ffffff' }).setOrigin(0.5).setAlign('left');
    labeLSlider.width = 100;
    const volumeSlider = new Slider(this, {
      x: xPos + 75,
      y: yPos,
      width: 100,
      height: 10,
      value: 0.5,
      input: 'click',
      track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 5, 0x222222),
      indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 5, 0x3afefd),
      thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 7, 0xffffff),
      valuechangeCallback: (value) => {
        callback.call(this, value);
      },
    });
    volumeSlider.layout();
  }

  changeMasterVolume(value: number) {
    this.game.sound.volume = value;
    console.log(value);
  }

  changeMusicVolume(value: number) {
    return () => value;
  }

  changeEffectsVolume(value: number) {
    return () => value;
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
  }
}

export default OptionsScene;
