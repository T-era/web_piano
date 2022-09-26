import { ScoreModel } from "../../../model/score";
import { hide, show } from "../../components/html_tags";

const musicLengthInput = document.getElementById('music_length_input') as HTMLInputElement;
const musicLengthOk = document.getElementById('music_length_ok') as HTMLButtonElement;
const musicLengthCancel = document.getElementById('music_length_cancel') as HTMLButtonElement;
const musigLengthNotice = document.getElementById('music_length_notice') as HTMLElement;

enum State {
    Shorten,
    NoChaneg,
    Lengthen,
}
class MusicLength {
    private readonly scoreModel :ScoreModel;
    constructor(scoreModel :ScoreModel) {
        this.scoreModel = scoreModel;
        scoreModel.addNewRowListener(() => this.refreshValue());
        musicLengthInput.addEventListener('input', () => this.show());
        musicLengthOk.addEventListener('click', () => {
            const newRowCount = this.newValue;
            const currentRowCount = this.currentRowCount;
            if (newRowCount === currentRowCount) {
                // Nothing to do.
            } else if (newRowCount < currentRowCount) {
                throw '押せないはず'
            } else if (newRowCount > currentRowCount) {
                for (let rowCount = currentRowCount; rowCount < newRowCount; rowCount ++) {
                    scoreModel.control.addNewRow(false);
                }
            }
        });
        musicLengthCancel.addEventListener('click', () => {
            this.refreshValue();
        });
        this.refreshValue();
    }
    get newValue() :number {
        return musicLengthInput.valueAsNumber;
    }
    get currentRowCount() :number {
        return this.scoreModel.scoreItems.length;
    }
    show() {
        const newRowCount = this.newValue;
        const currentRowCount = this.currentRowCount;
        if (newRowCount === currentRowCount) {
            this.showAsNoChange();
        } else if (newRowCount < currentRowCount) {
            this.showAsShorten();
        } else if (newRowCount > currentRowCount) {
            this.showAsLengthten();
        }
    }
    showAsShorten() {
        hide(musicLengthOk);
        show(musicLengthCancel);
        musigLengthNotice.innerText = '減らす事はできません。';
    }
    showAsLengthten() {
        show(musicLengthOk);
        show(musicLengthCancel);
        musigLengthNotice.innerText = '';
    }
    showAsNoChange() {
        hide(musicLengthOk);
        hide(musicLengthCancel);
        musigLengthNotice.innerText = '';
    }
    refreshValue() {
        musicLengthInput.valueAsNumber = this.currentRowCount;
        this.show();
    }
}
export function menuMusicLengthInit(scoreModel :ScoreModel) {
    new MusicLength(scoreModel);
}