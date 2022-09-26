import { levelAll, octaves } from "../../base";
import { ScoreModel } from "../../model/score";
import { soundContext, Stopper } from "../../sound";

const whitekeyKeys = ['a','s','d','f','g','h','j','k','l',';',':',']'];
const levelForPos = [
    0*12+0,0*12+2,0*12+4,0*12+5,0*12+7,0*12+9,0*12+11,
    1*12+0,1*12+2,1*12+4,1*12+5,1*12+7,1*12+9,1*12+11,
    2*12+0,2*12+2,2*12+4,2*12+5,2*12+7,2*12+9,2*12+11,
    3*12+0,3*12+2,3*12+4,3*12+5,3*12+7,3*12+9,3*12+11];
const aliasIndexMax = levelForPos.length - whitekeyKeys.length;
const blackKeys = ['q', 'w','e','r','t','y','u','i','o','p','@','['];
const keyboardWidth = whitekeyKeys.length;  // 12 ('a'から']')

export class KeyboardContext {
    private posForA :number = 7;
    private readonly gDomForLevels :HTMLElement[];
    private readonly textDomForLevels :SVGTextElement[];
    private keyBinds :{[name:string] :number} = {};
    private readonly keyBindStopper :{[name:string] :Stopper} = {};
    private readonly scoreModel :ScoreModel;

    constructor(scoreModel :ScoreModel) {
        this.scoreModel = scoreModel;
        this.gDomForLevels = [];
        this.textDomForLevels = [];
        levelAll.forEach(level => {
            const gDom = document.getElementById(`keyboard_${level}`)!;
            this.gDomForLevels[level] = gDom;
            this.textDomForLevels[level] = gDom.getElementsByTagName('text')[0]!;
        })
        this.reshowAlias();
    }

    shiftUp() {
        if (this.posForA < aliasIndexMax) {
            this.posForA ++
            this.reshowAlias();
        }
    }
    shiftDown() {
        if (this.posForA > 0) {
            this.posForA --;
            this.reshowAlias();
        }
    }
    private reshowAlias() {
        this.textDomForLevels.forEach(textDom => textDom.textContent = '')

        const levelForA = levelForPos[this.posForA]
        let prevLevelW = levelForA-1;
        const newKeyBinds :{[key:string] :number} = {};
        for (let dp = 0; dp < keyboardWidth; dp ++) {
            const levelW = levelForPos[this.posForA + dp];
            const aliasW = whitekeyKeys[dp];
            const textDomW = this.textDomForLevels[levelW];
            textDomW.textContent = aliasW;
            newKeyBinds[aliasW] = levelW;

            if (levelW - 1 !== prevLevelW) {
                const levelB = levelW - 1;
                const aliasB = blackKeys[dp];
                const textDomB = this.textDomForLevels[levelB];
                textDomB.textContent = aliasB;
                newKeyBinds[aliasB] = levelB;
            }
            prevLevelW = levelW;
        }
        this.keyBinds = newKeyBinds;
    }
    keyDownListener(e :KeyboardEvent) {
        const key = e.key.toLowerCase();
        const level = this.keyBinds[key];
        if (level !== undefined && ! this.keyBindStopper[key]) {
            const player = soundContext.getPlayer(this.scoreModel.musicSetting, level);
            const stopper = player.play();
            this.keyBindStopper[key] = stopper;

            this.scoreModel.control.putScoreItemAt(level);
        }
    }
    keyUpListener(e :KeyboardEvent) {
        const key = e.key.toLowerCase();
        const stopper = this.keyBindStopper[key];
        if (stopper) {
            stopper.stop();
        }
        delete this.keyBindStopper[key];
    }
    keyToneShiftListener(e: KeyboardEvent) {
        const key = e.key.toLocaleLowerCase();
        if (key === 'z') {
            this.shiftDown();
        } else if (key === '_') {
            this.shiftUp();
        }
    }
}
