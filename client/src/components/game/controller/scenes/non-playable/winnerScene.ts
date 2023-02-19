import NonPlayableBaseScene from './nonPlayableBaseScene';
import DialogueModal from '../../actor/dialogueModal';
import { ISharedState } from '../../../../../types/interfaces';

const testScore = 6666; // fix: change this to shared state score

const dialogArr = ['Congratulations!', 'You finished the game!', `Your score: ${testScore}`, 'Back to main menu?'];

class WinnerScene extends NonPlayableBaseScene {
  private dialogueModal!: DialogueModal;

  messageCounter: number;

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
    this.messageCounter = 0;
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    const xAxis = this.getMiddlePositionX();
    const yAxis = this.getMiddlePositionY();
    this.add.image(xAxis, yAxis, 'winnerBackground');
    this.add.sprite(xAxis + 95, yAxis - 90, 'speechBubble');
    this.displayWinnerMessage();
    this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
      if (event.key === 'f') {
        this.displayWinnerMessage();
      }
    });
    this.soundServise.playVictoryMusic();
  }

  displayWinnerMessage() {
    if (this.messageCounter < dialogArr.length) {
      this.dialogueModal.setText(dialogArr[this.messageCounter], true);
    } else {
      this.soundServise.stopAnyEffects();
      this.scene.stop('WinnerScene');
      this.scene.start('MainMenuScene');
    }
    this.messageCounter += 1;
  }
}

export default WinnerScene;
