class NPC extends Phaser.Physics.Arcade.Sprite {
  name: string;

  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, name: string, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame);
    this.scene = scene;
    this.name = name;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.getBody().setCollideWorldBounds(true);
    this.initAnimation();
    this.flipX = true;
    this.setSize(100, 100);
  }

  getName() {
    return this.name;
  }

  private initAnimation() {
    this.scene.anims.create({
      key: 'sit',
      frames: this.scene.anims.generateFrameNames('a-npc1-sit', {
        prefix: 'npc1-sit-frames-',
        suffix: '.png',
        start: 1,
        end: 4,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.anims.play('sit', true);
  }

  protected getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }
}

export default NPC;
