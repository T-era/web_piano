import lsio from "../../../model/io/LocalStorageIo";
import { scoresFromMelody } from "../../../model/io/util";
import { MusicSetting } from "../../../model/MusicSetting";
import { ScoreModel } from "../../../model/ScoreModel";
import { eventToolTipClose } from "../../components/WithToolTip";

export function initSystemLoad(scoreModel :ScoreModel) {
    const fileSelect = document.getElementById('system_load_select') as HTMLSelectElement;
    const okButton = document.getElementById('system_load_ok')!;
    const cancelButton = document.getElementById('system_load_cancel')!;

    okButton.parentElement!.addEventListener('click',  (e) => e.stopPropagation());

    lsio.addFileNamesListener((fileNames) => {
        fileSelect.childNodes.forEach(option => fileSelect.removeChild(option));
        addAllOption(fileNames);
    });
    addAllOption(lsio.fileNames.value);

    cancelButton.addEventListener('click',  () => {
        document.dispatchEvent(new CustomEvent(eventToolTipClose));
    });
    okButton.addEventListener('click',  (e) => {
        e.stopPropagation();
        const selected = fileSelect.value;
        const loadedData = lsio.load(selected);
        if (loadedData) {
            scoreModel.musicSetting.title = selected;
            scoreModel.musicSetting.setInstrument(loadedData.instrumentName);
            scoreModel.musicSetting.beatSpeed = loadedData.beatSpeed;
            const newScoreItems = scoresFromMelody(loadedData.melody);
            scoreModel.resetAllRows(newScoreItems);
        }
        document.dispatchEvent(new CustomEvent(eventToolTipClose));
        return false;
    });

    function addAllOption(fileNames :string[]) {
        fileNames.forEach((fileName) => {
            const option = document.createElement('option');
            option.value = fileName;
            option.innerText = fileName;
            fileSelect.appendChild(option);
        });
    }
}