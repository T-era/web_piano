import lsio from "../../../model/io/LocalStorageIo";
import { atomsFromScores } from "../../../model/io/util";
import { MusicSetting } from "../../../model/MusicSetting";
import { ScoreModel } from "../../../model/ScoreModel";
import { eventToolTipClose } from "../../components/WithToolTip";

export function initSystemSave(scoreModel :ScoreModel) {
    const nameplate = document.getElementById('title_input') as HTMLInputElement;
    const okButton = document.getElementById('system_save_ok')!;
    const musicSetting = scoreModel.musicSetting;

    musicSetting.addTitleListener(title => {
        nameplate.value = title;
    });
    okButton.addEventListener('click',  (e) => {
        e.stopPropagation();
        nameplate.classList.remove('error');
        const fileName = nameplate.value;
        if (fileName) {
            const saveData = atomsFromScores(scoreModel.scoreItems);
            lsio.save(fileName, {
                melody: saveData,
                instrumentName: musicSetting.instrumentName,
                beatSpeed: musicSetting.beatSpeed,
            });
            document.dispatchEvent(new CustomEvent(eventToolTipClose));
        } else {
            // 名前未入力エラー表示
            setTimeout(() => nameplate.classList.add('error'), 0);
        }
    });

}
