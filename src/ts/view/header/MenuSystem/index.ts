import { ScoreModel } from "../../../model/score";
import { initSystemExport } from "./Export";
import { initSystemImport } from "./Import";
import { initSystemLoad } from "./Load";
import { initSystemSave } from "./Save";

export function systemInit(scoreModel :ScoreModel) {
    initSystemLoad(scoreModel);
    initSystemSave(scoreModel);
    initSystemExport(scoreModel);
    initSystemImport(scoreModel);
}
