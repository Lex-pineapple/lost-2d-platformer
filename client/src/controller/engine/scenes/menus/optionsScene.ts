import { Scene, GameObjects } from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import { Slider } from 'phaser3-rex-plugins/templates/ui/ui-components';

enum EnumLang {
  ru = 'Язык: Русский',
  en = 'Lang: English',
}

class OptionsScene extends Scene {
  private rexUI!: RexUIPlugin;

  private _volumeLabel!: GameObjects.Text;

  private _volumeSlider!: Slider;

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
    return () => {};
  }

  createSlider(xPos: number, yPos: number, labelText: string, callback: Function) {
    this._volumeLabel = this.add.text(xPos - 63, yPos, `${labelText}:`);
    this._volumeLabel.setStyle({ fill: '#ffffff' }).setOrigin(0.5).setAlign('left');
    this._volumeLabel.width = 100;
    this._volumeSlider = new Slider(this, {
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
        callback(value); // fix it
      },
    }).layout();
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
    this.createLangButton(xAxis, yAxis + 25);
    this.createSlider(xAxis, yAxis - 50, 'Master Volume', () => this.changeMasterVolume);
    this.createBackButton(40, 30);
  }
}

export default OptionsScene;
