import { atomsFromScores, SaveData, exportToJson } from "../../../model/io/util";
import { ScoreModel } from "../../../model/score";

export function initSystemExport(scoreModel :ScoreModel) {
    const textarea = document.getElementById('export_to_json') as HTMLTextAreaElement;
    const toolTipLabel = document.getElementById('tooltip_label_export_to_json') as HTMLElement;
    const musicSetting = scoreModel.musicSetting;

    toolTipLabel.addEventListener('click', (e) => {
        const sd :SaveData = {
            beatSpeed: musicSetting.beatSpeed,
            instrumentName: musicSetting.instrumentName,
            melody: atomsFromScores(scoreModel.scoreItemCopy),
        };
        textarea.value = exportToJson(sd);
    });
}
