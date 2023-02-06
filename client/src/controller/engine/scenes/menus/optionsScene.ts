import { Scene, GameObjects } from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import { Slider } from 'phaser3-rex-plugins/templates/ui/ui-components';

enum EnumLang {
  ru = 'Язык: Русский',
  en = 'Lang: English',
}

class OptionsScene extends Scene {
  private rexUI!: RexUIPlugin;

  private _langButton!: GameObjects.Text;

  private _backButton!: GameObjects.Sprite;

  returnToMainMenu = () => {
    this.scene.start('MainMenuScene');
  };

  changeLang = () => {
    const { text } = this._langButton;
    if (text === EnumLang.en) this._langButton.text = EnumLang.ru;
    else this._langButton.text = EnumLang.en;
  };

  constructor() {
    super('OptionsScene');
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

  createLangButton(xPos: number, yPos: number) {
    this._langButton = this.add
      .text(xPos, yPos, EnumLang.en, { color: '#ffffff' })
      .setAlign('center')
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', this.changeLang);
  }

  createBackButton(xPos: number, yPos: number) {
    this._backButton = this.add.sprite(xPos, yPos, 'menu-arrow');
    this._backButton.setInteractive({ useHandCursor: true });
    this._backButton.setScale(0.5, 0.45);
    this._backButton.on('pointerdown', this.returnToMainMenu);
  }

  create() {
    const xAxis = this.cameras.main.width / 2;
    const yAxis = this.cameras.main.height / 2;
    this.createBackButton(40, 30);
    this.createSlider(xAxis, yAxis - 50, ' Master Volume', this.changeMasterVolume);
    this.createSlider(xAxis, yAxis - 25, '  Music Volume', this.changeMusicVolume);
    this.createSlider(xAxis, yAxis, 'Effects Volume', this.changeMusicVolume);
    this.createLangButton(xAxis, yAxis + 25);
  }
}

export default OptionsScene;
