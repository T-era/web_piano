import { newScoreRow, ScoreItem } from "../../base";
import { ScoreItemsCore } from "./ScoreItemsCore";
import { ScoreModel } from "./ScoreModel";

/**
 * 楽譜譜面の操作を行います。譜面の長さのリサイズ
 */
export class ScoreItemsResizer {
    private readonly model :ScoreModel;
    private readonly _scoreItems :ScoreItemsCore;

    constructor(model :ScoreModel, scoreItems :ScoreItemsCore) {
        this.model = model;
        this._scoreItems = scoreItems;
    }

    /**
     * 現在の譜面をn倍に伸します
     */
    nTimes(n :number) {
        this.nThContinue(n-1);
    }
    private nThContinue(n :number) {
        const asis = this._scoreItems.ref;
        const tobe :ScoreItem[][] = [];
        asis.forEach(row => {
            const row1 = row.map(cell => cell.scoreItem.value);
            tobe.push(row1);
            for (var i = 0; i < n; i ++) {
                const row2 = row.map(cell => 
                    cell.scoreItem.value === ScoreItem.None
                        ? ScoreItem.None
                        : ScoreItem.Continue);
                tobe.push(row2);
            }
        });
        this.model.control.resetAllRows(tobe);
    }
    /**
     * 現在の譜面をn分の1に圧縮します
     */
     oneNth(n :number) {
        const asis = this._scoreItems.ref;
        const tobe :ScoreItem[][] = [];
        for (let i = 0; i < asis.length; i ++) {
            const j = Math.floor(i / n);
            tobe[j] = tobe[j] || newScoreRow();
            const asisRow = asis[i];
            const tobeRow = tobe[j];

            asisRow.forEach((scoreItem, level) => {
                if (scoreItem.scoreItem.value === ScoreItem.Start) {
                    tobeRow[level] = ScoreItem.Start;
                } else if (scoreItem.scoreItem.value === ScoreItem.Continue && tobeRow[level] !== ScoreItem.Start) {
                    tobeRow[level] = ScoreItem.Continue;
                }
            })
        }
        this.model.control.resetAllRows(tobe);
    }
}
 