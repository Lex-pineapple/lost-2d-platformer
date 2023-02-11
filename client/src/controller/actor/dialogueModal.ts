import dialogFlow from '../../assets/data/dialogFlow';

interface DialogueModalConfig {
  borderThickness?: number;
  borderColor?: number;
  borderAlpha?: number;
  windowAlpha?: number;
  windowColor?: number;
  windowHeight?: number;
  padding?: number;
  closeBtnColor?: string;
  dialogSpeed?: number;
}

interface IDialogData {
  [PlaySceneOne: string]: {
    [NPC: string]: INPCDialogData;
  };
}

interface INPCDialogData {
  story: string[];
  idle: string[];
}

class DialogueModal {
  borderThickness: number;

  borderColor: number;

  borderAlpha: number;

  windowAlpha: number;

  windowColor: number;

  windowHeight: number;

  padding: number;

  closeBtnColor: string;

  dialogSpeed: number;

  eventCounter: number;

  visible: boolean;

  text!: Phaser.GameObjects.Text;

  dialog!: string[];

  scene: Phaser.Scene;

  graphics!: Phaser.GameObjects.Graphics;

  timedEvent!: Phaser.Time.TimerEvent;

  dialogData: IDialogData;

  dialogCounter: number;

  mainDialogDone: boolean;

  dialogFinished: boolean;

  created: boolean;

  // closeBtn: any;

  constructor(scene: Phaser.Scene, config: DialogueModalConfig) {
    this.scene = scene;
    this.borderThickness = config.borderThickness || 3;
    this.borderColor = config.borderColor || 0x907748;
    this.borderAlpha = config.borderAlpha || 1;
    this.windowAlpha = config.windowAlpha || 0.8;
    this.windowColor = config.windowColor || 0x303030;
    this.windowHeight = config.windowHeight || 150;
    this.padding = config.padding || 32;
    this.closeBtnColor = config.closeBtnColor || 'darkgoldenrod';
    this.dialogSpeed = config.dialogSpeed || 3;
    this.eventCounter = 0;
    // if the dialog window is shown
    this.visible = true;
    this.dialogData = dialogFlow;
    this.mainDialogDone = false;
    this.dialogCounter = 0;
    this.dialogFinished = false;
    this.created = false;

    // the text that will be displayed in the window
    // this.graphics;
    // this.closeBtn;
    // Create the dialog window
    this.createWindow();
  }

  protected getGameWidth() {
    return +this.scene.sys.game.config.width;
  }

  protected getGameHeight() {
    return +this.scene.sys.game.config.height;
  }

  private calculateWindowDimensions(width: number, height: number) {
    const x = this.padding;
    const y = this.windowHeight - this.padding;
    const rectWidth = width - this.padding * 2;
    const rectHeight = this.windowHeight;
    return {
      x,
      y,
      rectWidth,
      rectHeight,
    };
  }

  private createInnerWindow(x: number, y: number, rectWidth: number, rectHeight: number) {
    this.graphics.fillStyle(this.windowColor, this.windowAlpha);
    this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
  }

  private createOuterWindow(x: number, y: number, rectWidth: number, rectHeight: number) {
    this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
    this.graphics.strokeRect(x, y, rectWidth, rectHeight);
  }

  protected createWindow() {
    const gameHeight = this.getGameHeight();
    const gameWidth = this.getGameWidth();
    const positionX = this.scene.cameras.main.worldView.x + this.padding;
    const positionY = this.scene.cameras.main.worldView.y + this.padding;

    const dimensions = this.calculateWindowDimensions(gameWidth, gameHeight);
    this.graphics = this.scene.add.graphics();
    this.graphics.setDepth(1);


    this.createOuterWindow(positionX, positionY, dimensions.rectWidth, dimensions.rectHeight);
    this.createInnerWindow(positionX, positionY, dimensions.rectWidth, dimensions.rectHeight);
    this.created = true;
  }

  setText(text: string, animate: boolean) {
    this.eventCounter = 0;
    this.dialog = text.split('');
    if (this.timedEvent) {
      this.timedEvent.remove();
    }

    const tempText = animate ? '' : text;
    this._setText(tempText);

    if (animate) {
      this.timedEvent = this.scene.time.addEvent({
        delay: 150 - this.dialogSpeed * 30,
        callback: this._animateText,
        callbackScope: this,
        loop: true,
      });
    }
  }

  _animateText() {
    this.eventCounter += 1;
    this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
    if (this.eventCounter === this.dialog.length) {
      this.timedEvent.remove();
    }
  }

  _setText(text: string) {
    if (this.text) this.text.destroy();
    const x = this.padding + 10;
    const y = this.windowHeight - 10;
    const positionX = this.scene.cameras.main.worldView.x + this.padding + 10;
    const positionY = this.scene.cameras.main.worldView.y + this.padding + 10;
    this.text = this.scene.make.text({
      x: positionX,
      y: positionY,
      text,
      style: {
        wordWrap: { width: this.getGameWidth() - this.padding * 2 - 25 },
      },
    });
    this.text.setDepth(1);
  }

  _removeWindow() {
    this.graphics.destroy();
    this.timedEvent.remove();

    this.text.destroy();
    this.created = false;
  }

  displayNPCdialogue(npcName: string, sceneName: string) {
    const idleDialog = this.dialogData[sceneName][npcName].idle;
    const mainDialog = this.dialogData[sceneName][npcName].story;
    if (!this.created) {
      this.createWindow();
    }
    if (this.dialogFinished) {
      this.setText(idleDialog[0], true);
    }
    if (this.dialogCounter < mainDialog.length) {
      this.setText(mainDialog[this.dialogCounter], true);
    } else {
      this.dialogFinished = true;
      this._removeWindow();
    }
    this.dialogCounter += 1;
    
  }
}

export default DialogueModal;
