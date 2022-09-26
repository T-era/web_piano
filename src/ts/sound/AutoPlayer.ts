import { ScoreItem } from "../base"
import { ScoreItemsRef } from "../model/score";
import { ScoreModel } from "../model/score";
import { RecMode } from "../model/score/RecModeControl";
import { soundContext } from "./SoundContext";

interface OptionPlay {
    startRow?:number;
    endRow?:number;
}
interface OptionRec {
    startRow?:number;
    recMode?:RecMode
}
type Option = OptionPlay | OptionRec;

export class AutomationPlayer {
    private readonly scoreModel :ScoreModel;
    private readonly scoreItems :ScoreItemsRef;
    private readonly doneThen :()=>void;
    private readonly endRow :number;
    private readonly recMode?:RecMode;
    private readonly beatSpeedMSec :number;
    private stopRequested = false;

    constructor(scoreModel :ScoreModel, doneThen :()=>void, opt?:Option) {
        const option = opt || {};
        const {startRow = 0 } = option;
        const endRow = ('endRow' in option ? option.endRow : undefined);
        const recMode = ('recMode' in option ? option.recMode : undefined);
        this.scoreModel = scoreModel;
        this.scoreItems = scoreModel.scoreItems;
        this.doneThen = doneThen;
        this.beatSpeedMSec = scoreModel.musicSetting.beatSpeed * 1000;
        this.endRow = endRow ?? this.scoreItems.length - 1;
        this.recMode = recMode;

        setTimeout(()=>this.automationPlayAt(startRow), 0);
    }

    private automationPlayAt(row :number) {
        const nextSound = soundFromScores(row, this.scoreItems);
        nextSound.forEach(aSound => {
            const stopper = soundContext.getPlayer(this.scoreModel.musicSetting, aSound.level).play();
            setTimeout(() => stopper.stop(), aSound.length * this.beatSpeedMSec);
        });
        if (this.recMode) {
            // 長音を記録する
            this.recMode.record(row);
        }
        if (this.stopRequested || (! this.recMode && this.endRow <= row)) {
            this.doneThen();
        } else {
            setTimeout(()=>this.automationPlayAt(row+1), this.beatSpeedMSec);
        }
    }
    requestStop() {
        this.stopRequested = true;
    }
}

interface ASound {
    level :number;
    length :number;
}

function soundFromScores(row :number, scoreItems :ScoreItemsRef) :ASound[] {
    const nextRow = scoreItems[row];
    return nextRow.map((_, level) => {
        return { level, length: lengthCount(level) }
    }).filter(aSound => aSound.length > 0)
    function lengthCount(level :number) :number {
        if (scoreItems[row][level].value === ScoreItem.Start) {
            return lengthContinue(1, level, row + 1);
        } else {
            return 0;
        }
    }
    function lengthContinue(counter :number, level :number, row :number) :number {
        if (scoreItems.length === row) {
            return counter;
        }
        if (scoreItems[row][level].value === ScoreItem.Continue) {
            return lengthContinue(counter + 1, level, row + 1);
        } else {
            return counter;
        }
    }
}