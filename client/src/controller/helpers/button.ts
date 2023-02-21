import { IMenuItem } from '../../types/interfaces';

class Button {
  private button: Phaser.GameObjects.Text;

  constructor(
    x: number,
    y: number,
    label: string,
    ctx: Phaser.Scene,
    callback: (menuItem?: IMenuItem) => void
  ) {
    this.button = ctx.add.text(x, y, label);
    this.button
      .setFixedSize(200, 0)
      .setAlign('center')
      .setOrigin(0.5)
      .setPadding(10)
      .setStyle({
        backgroundColor: '#ffffff',
        fill: '#0d7575',
        stroke: '#0d7575',
        fontFamily: 'sans-serif',
        strokeThickness: 0.5,
      })
      .setInteractive({
        useHandCursor: true,
      })
      .on('pointerup', () => callback())
      .on('pointerover', () => this.button.setStyle({ fill: '#29c2c2', stroke: '#29c2c2' }))
      .on('pointerout', () => this.button.setStyle({ fill: '#0d7575', stroke: '#0d7575' }));
  }

  getObj() {
    return this.button;
  }
}

export default Button;
