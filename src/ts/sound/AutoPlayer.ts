import { ScoreItem } from "../base"
import { ScoreItemsRef } from "../model/score";
import { ScoreModel } from "../model/score";
import { RecMode } from "../model/score/RecModeControl";
import { Cell } from "../model/score/ScoreItemsCore";
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
            aSound.cellRefs.forEach(cellRef => cellRef.highlighted.value = true);
            const stopper = soundContext.getPlayer(this.scoreModel.musicSetting, aSound.level).play();
            setTimeout(() => {
                stopper.stop();
                aSound.cellRefs.forEach(cellRef => cellRef.highlighted.value = false);
            }, aSound.cellRefs.length * this.beatSpeedMSec);
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
    cellRefs :Cell[];
}

function soundFromScores(row :number, scoreItems :ScoreItemsRef) :ASound[] {
    const nextRow = scoreItems[row];
    return nextRow.map((cell, level) => {
        return { level, cellRefs: findContinue(level) };
    }).filter(aSound => aSound.cellRefs.length > 0)
    function findContinue(level :number) :Cell[] {
        const cell = scoreItems[row][level];
        if (cell.scoreItem.value === ScoreItem.Start) {
            return lengthContinue(level, row + 1, [cell]);
        } else {
            return [];
        }
    }
    function lengthContinue(level :number, row :number, temp :Cell[]) :Cell[] {
        if (scoreItems.length === row) {
            return temp;
        }
        if (scoreItems[row][level].scoreItem.value === ScoreItem.Continue) {
            return lengthContinue(level, row + 1, temp.concat([scoreItems[row][level]]));
        } else {
            return temp;
        }
    }
}