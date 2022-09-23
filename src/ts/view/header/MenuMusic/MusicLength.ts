import { ScoreModel } from "../../../model/ScoreModel";

const musicLengthInput = document.getElementById('music_length_input') as HTMLInputElement;
const musicLengthOk = document.getElementById('music_length_ok') as HTMLButtonElement;
const musicLengthCancel = document.getElementById('music_length_cancel') as HTMLButtonElement;
const musigLengthNotice = document.getElementById('music_length_notice') as HTMLElement;

export function menuMusicLengthInit(scoreModel :ScoreModel) {
    init();
    scoreModel.addNewRowListener(refresh);


    function init() {
        musicLengthInput.addEventListener('change', (e) => {
            const newRowCount = musicLengthInput.valueAsNumber;
            const currentRowCount = rowCount();
            if (newRowCount === currentRowCount) {
                hide(musicLengthOk);
                hide(musicLengthCancel);
                musigLengthNotice.innerText = '';
            } else if (newRowCount < currentRowCount) {
                hide(musicLengthOk);
                show(musicLengthCancel);
                musigLengthNotice.innerText = '減らす事はできません。';
            } else if (newRowCount > currentRowCount) {
                show(musicLengthOk);
                show(musicLengthCancel);
                musigLengthNotice.innerText = '';
            }

        });
        musicLengthOk.addEventListener('click', () => {
            const newRowCount = musicLengthInput.valueAsNumber;
            const currentRowCount = rowCount();
            if (newRowCount === currentRowCount) {
                // Nothing to do.
            } else if (newRowCount < currentRowCount) {
                throw '押せないはず'
            } else if (newRowCount > currentRowCount) {
                for (let rowCount = currentRowCount; rowCount < newRowCount; rowCount ++) {
                    scoreModel.addNewRow(false);
                }
            }
        });
        musicLengthCancel.addEventListener('click', () => {
            refresh();
        });
        refresh();
    }
    function refresh() {
        musicLengthInput.valueAsNumber = rowCount();
        hide(musicLengthOk);
        hide(musicLengthCancel);
        musigLengthNotice.innerText = '';
    }
    function rowCount() {
        return scoreModel.scoreItems.length;
    }
    function show(button :HTMLButtonElement) {
        button.style.display = 'unset';
    }
    function hide(button :HTMLButtonElement) {
        button.style.display = 'none';
    }
}
