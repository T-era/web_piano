import { ScoreModel } from "../../model/score";

export function menuClearInit(scoreModel :ScoreModel) {
    const clearAll = document.getElementById('menu_clear_all')!;
    const clearLine = document.getElementById('menu_clear_line')!;

    clearAll.addEventListener('click', () => scoreModel.control.clearAll())
    clearLine.addEventListener('click', () => scoreModel.control.clearLine())
}