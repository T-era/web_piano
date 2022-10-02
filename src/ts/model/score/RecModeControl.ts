import { ScoreItem } from "../../base";
import { soundContext } from "../../sound";
import { ScoreModel } from "./ScoreModel";


/**
 * Rec モードの専用の譜面管理
 */
export class RecMode {
    private readonly scoreModel :ScoreModel;

    constructor(scoreModel :ScoreModel) {
        this.scoreModel = scoreModel;
    }
    /**
     * Recモードのために、譜面に音符を記録します。
     * 
     * 打鍵自体は、Keyboardイベント経由で記録されるため、ここで記録するのは長音のみ。
     */
    record(row :number) {
        const levelsContinue = soundContext.getLevelsContine(this.scoreModel.musicSetting);
        levelsContinue.forEach(level => {
            if (this.scoreModel.scoreItems[row][level].scoreItem.value !== ScoreItem.Start) {
                this.scoreModel.control.replaceScore(row, level, ScoreItem.Continue)
            }
        });

        this.scoreModel.control.setSelectedRow(row, true); 
        // Recモードの時には、楽譜は自動的に伸長する
        if (this.scoreModel.scoreItems.length <= row + 1) {
            this.scoreModel.control.addNewRow();
        }
    }
}
