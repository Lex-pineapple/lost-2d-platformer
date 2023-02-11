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
      .setFixedSize(150, 0)
      .setAlign('center')
      .setOrigin(0.5)
      .setPadding(10)
      .setStyle({
        backgroundColor: '#073454',
        fill: '#3afefd',
      })
      .setInteractive({
        useHandCursor: true,
      })
      .on('pointerup', () => callback())
      .on('pointerover', () => this.button.setStyle({ fill: '#00EDEC' }))
      .on('pointerout', () => this.button.setStyle({ fill: '#3afefd' }));
  }

  getObj() {
    return this.button;
  }
}

export default Button;
