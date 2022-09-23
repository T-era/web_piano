import { scoresFromMelody, importFromJson } from "../../../model/io/util";
import { ScoreModel } from "../../../model/ScoreModel";
import { eventToolTipClose } from "../../components/WithToolTip";

export function initSystemImport(scoreModel :ScoreModel) {
    const textarea = document.getElementById('import_from_json') as HTMLTextAreaElement;
    const okButton = document.getElementById('import_from_json_ok')!;
    const cancelButton = document.getElementById('import_from_json_cancel')!;
    const musicSetting = scoreModel.musicSetting;

    okButton.addEventListener('click',  () => {
        try {
            const jsonStr = textarea.value;
            const saveData = importFromJson(jsonStr);
    
            if(saveData) {
                scoreModel.resetAllRows(scoresFromMelody(saveData.melody));
                musicSetting.beatSpeed = saveData.beatSpeed;
                musicSetting.setInstrument(saveData.instrumentName);
        
                document.dispatchEvent(new CustomEvent(eventToolTipClose));
            } else [
                alert('Import failure!')
            ]
        } catch {
            alert('error!');
        }
    });
    cancelButton.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent(eventToolTipClose));
    })

}
