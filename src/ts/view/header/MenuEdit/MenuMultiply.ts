import { ScoreModel } from "../../../model/score";

export function menuMultiplyInit(scoreModel :ScoreModel) {
    const oneThird = document.getElementById('menu_onethird')!;
    const half = document.getElementById('menu_half')!;
    const twice = document.getElementById('menu_twice')!;
    const threeTimes = document.getElementById('menu_threetimes')!;

    oneThird.addEventListener('click', () => scoreModel.resizer.oneNth(3));
    half.addEventListener('click', () => scoreModel.resizer.oneNth(2));
    twice.addEventListener('click', () => scoreModel.resizer.nTimes(2));
    threeTimes.addEventListener('click', () => scoreModel.resizer.nTimes(3));
}