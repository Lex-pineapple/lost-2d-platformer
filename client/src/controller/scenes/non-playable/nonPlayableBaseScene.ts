import { Scene, Sound } from 'phaser';
import Button from '../../helpers/button';
// import AudioMaster from '../../audio/audioManager1';
import SoundService from '../../audio/soundServise';

class NonPlayableBaseScene extends Scene {
  protected lastSceneKey: string | undefined;

  private keyESC!: Phaser.Input.Keyboard.Key;

  soundServise!: SoundService;

  protected menuScenes: IMenuScenes = {
    mainMenu: 'MainMenuScene',
    optionsMenu: 'OptionsScene',
    pauseMenu: 'PauseMenuScene',
  };

  constructor(name: string, protected sharedState: ISharedState) {
    super({ key: name });
  }

  preload() {
    this.initServices();
  }

  create() {
    this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  initServices(): void {
    this.soundServise = new SoundService( // @ts-ignore: Unreachable code error
      this.game.effectsAudioManager, // @ts-ignore: Unreachable code error
      this.game.musicAudioManager
      );
  }

  getMiddlePositionX() {
    return this.cameras.main.width / 2;
  }

  getMiddlePositionY() {
    return this.cameras.main.height / 2;
  }

  createMenu(ctx: Phaser.Scene, menu: IMenuItem[], startPosYMargin?: number) {
    const yPos = this.getMiddlePositionY();
    const startPosY = startPosYMargin !== undefined ? yPos - startPosYMargin : yPos;
    let lastMenuItemPosY = 0;

    menu.forEach((menuItem) => {
      const menuItemFn = menuItem.handleEvents
        ? menuItem.handleEvents
        : (item: IMenuItem = menuItem) => {
            if (item && item.sceneKey) {
              if (typeof item.sceneKey === 'string') {
                ctx.scene.start(item.sceneKey);
              } else {
                const value = item.sceneKey();

                if (typeof value === 'string') {
                  ctx.scene.start(value);
                }
              }
            }
          };

      menuItem.textGameObj = new Button( // eslint-disable-line
        this.getMiddlePositionX(),
        startPosY + lastMenuItemPosY,
        menuItem.text,
        ctx,
        menuItemFn
      ).getObj();

      lastMenuItemPosY += 50;
    });
  }

  update() {
    this.checkEsc();
  }

  checkEsc() {
    // This is for the case if ESC key pressed in any non playable scene (menu)
    if (this.keyESC && Phaser.Input.Keyboard.JustDown(this.keyESC)) {
      if (!this.scene.isPaused()) {
        const sceneKey = this.scene.key;

        if (sceneKey === 'PauseMenuScene') {
          this.scene.stop();

          if (this.sharedState.playableScenePaused) {
            this.scene.resume(this.sharedState.playableScenePaused);
            this.sharedState.playableScenePaused = null;
          }
        }

        if (sceneKey === 'OptionsScene') {
          this.scene.stop();

          if (this.sharedState.playableScenePaused) {
            this.scene.start('PauseMenuScene');
          } else {
            this.scene.start('MainMenuScene');
          }
        }
      }
    }
  }
}

export default NonPlayableBaseScene;
