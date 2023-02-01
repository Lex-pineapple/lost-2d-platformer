class Button {
  constructor(x: number, y: number, label: string, scene: Phaser.Scene, callback: () => void) {
    const button = scene.add.text(x, y, label);
    button
      .setOrigin(0.5)
      .setPadding(10)
      .setStyle({
        backgroundColor: '#073454',
        fill: '#3afefd',
      })
      .setInteractive({
        useHandCursor: true,
      })
      .on('pointerdown', () => callback())
      .on('pointerover', () => button.setStyle({ fill: '#00EDEC' }))
      .on('pointerout', () => button.setStyle({ fill: '#3afefd' }));
  }
}

export default Button;
