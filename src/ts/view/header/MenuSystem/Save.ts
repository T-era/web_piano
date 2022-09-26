import lsio from "../../../model/io/LocalStorageIo";
import { atomsFromScores } from "../../../model/io/util";
import { ScoreModel } from "../../../model/score";
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
            const saveData = atomsFromScores(scoreModel.scoreItemCopy);
            lsio.save(fileName, {
                melody: saveData,
                instrumentName: musicSetting.instrumentName,
                beatSpeed: musicSetting.beatSpeed,
            });
            document.dispatchEvent(new CustomEvent(eventToolTipClose));
        } else {
            // 名前未入力エラー表示
            // setTimeout でタイミングを遅らせているのは、(このタイミングで設定すると)remove('error')と同時になり
            // クラス指定が変化していないと判断されてしまい、CSSアニメーションが発生しないため
            setTimeout(() => nameplate.classList.add('error'), 0);
        }
    });

}
