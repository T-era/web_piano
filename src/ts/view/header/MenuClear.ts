import { ScoreModel } from "../../model/ScoreModel";

export function menuClearInit(scoreModel :ScoreModel) {
    const clearAll = document.getElementById('menu_clear_all')!;
    const clearLine = document.getElementById('menu_clear_line')!;

    clearAll.addEventListener('click', () => scoreModel.clearAll())
    clearLine.addEventListener('click', () => scoreModel.clearLine())
}