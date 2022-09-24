import { levelAll, ScoreItem } from "../base"
import { ScoreModel } from "../model/ScoreModel";
import { soundContext } from "./SoundContext";

interface Option {
    startRow?:number;
    endRow?:number;
    withRec?:boolean
}
export class AutomationPlayer {
    private readonly scoreModel :ScoreModel;
    private readonly scoreItems :ScoreItem[][];
    private readonly doneThen :()=>void;
    private readonly endRow :number;
    private readonly withRec :boolean;
    private readonly beatSpeedMSec :number;
    private stopRequested = false;

    constructor(scoreModel :ScoreModel, doneThen :()=>void, option?:Option) {
        const {startRow = 0, endRow, withRec = false } = option || {};
        this.scoreModel = scoreModel;
        this.scoreItems = scoreModel.scoreItems;
        this.doneThen = doneThen;
        this.beatSpeedMSec = scoreModel.musicSetting.beatSpeed * 1000;
        this.endRow = endRow === undefined ? this.scoreItems.length - 1 : endRow;
        this.withRec = withRec;

        setTimeout(()=>this.automationPlayAt(startRow), 0);
    }

    private automationPlayAt(row :number) {
        const nextSound = soundFromScores(row, this.scoreItems);
        nextSound.forEach(aSound => {
            const stopper = soundContext.getPlayer(this.scoreModel.musicSetting, aSound.level).play();
            setTimeout(() => stopper.stop(), aSound.length * this.beatSpeedMSec);
        });
        if (this.withRec) {
            // 長音を記録する
            const levelsContinue = soundContext.getLevelsContine(this.scoreModel.musicSetting);
            levelsContinue.forEach(level => {
                if (this.scoreItems[row][level] !== ScoreItem.Start) {
                    this.scoreModel.replaceScore(row, level, ScoreItem.Continue)
                }
            });

            this.scoreModel.setSelectedRow(row, true); 
            if (this.endRow <= row) {
                this.scoreModel.addNewRow();
            }
        }
        if (this.stopRequested || (! this.withRec && this.endRow <= row)) {
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

function soundFromScores(row :number, scoreItems :ScoreItem[][]) :ASound[] {
    const nextRow = scoreItems[row];
    return nextRow.map((_, level) => {
        return { level, length: lengthCount(level) }
    }).filter(aSound => aSound.length > 0)
    function lengthCount(level :number) :number {
        if (scoreItems[row][level] === ScoreItem.Start) {
            return lengthContinue(1, level, row + 1);
        } else {
            return 0;
        }
    }
    function lengthContinue(counter :number, level :number, row :number) :number {
        if (scoreItems.length === row) {
            return counter;
        }
        if (scoreItems[row][level] === ScoreItem.Continue) {
            return lengthContinue(counter + 1, level, row + 1);
        } else {
            return counter;
        }
    }
}