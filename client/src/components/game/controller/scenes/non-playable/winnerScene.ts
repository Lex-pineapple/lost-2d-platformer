import NonPlayableBaseScene from './nonPlayableBaseScene';
import DialogueModal from '../../actor/dialogueModal';
import { IMenuItem, ISharedState } from '../../../../../types/interfaces';

class WinnerScene extends NonPlayableBaseScene {
  private dialogueModal!: DialogueModal;

  private speechBubble!: Phaser.GameObjects.Sprite;

  private messageCounter: number;

  private dialogArr!: Array<string>;

  private menu: IMenuItem[] = [
    {
      sceneKey: 'MainMenuScene',
      text: 'Main Menu',
      textGameObj: null,
      handleEvents: this.returnToMainMenu.bind(this),
    },
  ];

  constructor(name: string, protected sharedState: ISharedState) {
    super('WinnerScene', sharedState);
    this.dialogueModal = new DialogueModal(this, {
      paddingX: 300,
      paddingY: 87,
      fontSize: '28px',
    });
    this.messageCounter = 0;
  }

  create() {
    super.create();
    this.dialogArr = ['Congratulations!', 'You finished the game!', `Your score: ${this.sharedState.score}`, 'Back to main menu?'];
    this.messageCounter = 0;
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    const xAxis = this.getMiddlePositionX();
    const yAxis = this.getMiddlePositionY();
    this.add.image(xAxis, yAxis, 'winnerBackground');
    this.speechBubble = this.add.sprite(xAxis + 95, yAxis - 90, 'speechBubble');
    this.displayWinnerMessage();
    this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
      if (event.key === 'f') {
        this.displayWinnerMessage();
      }
    });
    this.createFullscreenSwitch();

    this.soundServise.playVictoryMusic();
  }

  displayWinnerMessage() {
    if (this.messageCounter < this.dialogArr.length) {
      this.dialogueModal.setText(this.dialogArr[this.messageCounter], true);
    } else {
      this.speechBubble.destroy();
      this.dialogueModal.setText('', false);
      this.createMenu(this, this.menu, 150);
    }
    this.messageCounter += 1;
  }
}

export default WinnerScene;
