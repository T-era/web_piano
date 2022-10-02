import { ScoreModel } from "../../../model/score";
import { menuClearInit } from "./MenuClear";
import { menuMultiplyInit } from "./MenuMultiply";

export function menuEditInit(scoreModel :ScoreModel) {
    menuClearInit(scoreModel);
    menuMultiplyInit(scoreModel);
}
