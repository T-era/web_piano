import { levelAll } from "../../base";
import { ScoreModel } from "../../model/ScoreModel";
import { soundContext } from "../../sound";
import { Stopper } from "../../sound";
import { KeyboardContext } from "./KeyboardContext";

function keyboardId(level :number) {
    return `keyboard_${level}`;
}

export function initClickHandler(scoreModel :ScoreModel, keyboardContext :KeyboardContext) {
    initKeyboardClickHandler(scoreModel);
    initToneShiftClickHandler(keyboardContext);
}
function initKeyboardClickHandler(scoreModel :ScoreModel) {
    levelAll.forEach((level) => {
        const svgG = document.getElementById(keyboardId(level)) as Element as SVGGElement;
        let stopper :Stopper|undefined = undefined;
        svgG.addEventListener('pointerdown', () => {
            const player = soundContext.getPlayer(scoreModel.musicSetting, level);
            stopper = player.play();
            scoreModel.putSilentAt(level);
        });
        svgG.addEventListener('pointercancel', () => {
            stopper?.stop();
        });
        svgG.addEventListener('pointerup', () => {
            stopper?.stop();
        });
    })
}
function initToneShiftClickHandler(keyboardContext :KeyboardContext) {
    const svgGUp = document.getElementById('button_tone_u')
    svgGUp!.addEventListener('click',  () => {
        keyboardContext.shiftUp();
    });

    const svgGDown = document.getElementById('button_tone_d')
    svgGDown!.addEventListener('click',  () => {
        keyboardContext.shiftDown();
    });
}
