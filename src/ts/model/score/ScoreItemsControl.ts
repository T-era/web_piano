import { levelAll, newScoreRow, ScoreItem, scoreSheetRowHeight } from "../../base";
import { WithListener } from "../../Listener";
import { ScoreItemsCore } from "./ScoreItemsCore";

/**
 * 楽譜譜面の操作を行います。
 * 
 * 音の再生を伴う処理は、ScoreModel のメソッドを呼ぶ必要があります。
 */
export class ScoreItemsControl {
    private readonly _scoreItems :ScoreItemsCore;
    private _selectedRow :WithListener<number>;
    private readonly sheetDiv :HTMLDivElement;

    constructor(scoreItems :ScoreItemsCore, selectedRow :WithListener<number>, sheetDiv :HTMLDivElement) {
        this._scoreItems = scoreItems;
        this._selectedRow = selectedRow;
        this.sheetDiv = sheetDiv;
    }

    /**
     * 楽譜に音符を設定します。引数に scoreItem を指定しなかった場合、自然な指定順序に従います
     */
    putScoreItem(row :number, level :number, withFocus :boolean = false, scoreItem?:ScoreItem) {
        this.replaceScore(row, level, scoreItem);
    }
    putScoreItemAt(level :number, withFocus :boolean = false, scoreItem?:ScoreItem) {
        this.replaceScore(this._selectedRow.value, level, scoreItem);
    }
    setSelectedRow(row :number, forceScroll :boolean) {
        this._setSelectedRow(row, forceScroll);
    }
    addNewRow(forceFocus :boolean = false) {
        this._scoreItems.appendNewRow();
        if (forceFocus) {
            this._setSelectedRow(this.scoreItems.length - 1, forceFocus);
        }
    }
    scrollUp() {
        this._setSelectedRow(this.selectedRow === 0
            ? this.scoreItems.length - 1
            : this.selectedRow - 1, true);
    }
    scrollDown() {
        this._setSelectedRow(this.selectedRow === this.scoreItems.length - 1
            ? 0
            : this.selectedRow + 1, true);
    }
    // 今カーソルがある行の全ての音を次行まで伸します。
    continueRow() {
        const currentRow = this.selectedRow;
        if (currentRow === this.scoreItems.length - 1) {
            this.addNewRow();
        }
        const currentItems = this.scoreItems[currentRow];
        currentItems.forEach((scoreItem, level) => {
            if (scoreItem.value !== ScoreItem.None) {
                this._scoreItems.setScoreItemAt(currentRow + 1, level, ScoreItem.Continue);
            }
        });
    }
    // 引数で与えられた譜面で scoreItems を入れ替えます。
    resetAllRows(newScore :ScoreItem[][]) {
        this._scoreItems.setScoreItems(newScore);

        this._selectedRow.value = 0;
    }
    insertARowBefore(rownum :number) {
        const copy = this._scoreItems.copy;
        const before = copy.slice(0, rownum);
        const after = copy.slice(rownum);
        // afterの先頭がcontinueの場合、newScoreRowもcontinueにする
        const afterHead = after[0] || [];
        const newRow = newScoreRow();
        levelAll.forEach((level) => {
            if (afterHead[level] === ScoreItem.Continue) {
                newRow[level] = ScoreItem.Continue;
            }
        });

        this._scoreItems.setScoreItems(before.concat([newRow, ...after]));
    }
    remveRow(rownum :number) {
        const copy = this._scoreItems.copy;
        const before = copy.slice(0, rownum);
        const after = copy.slice(rownum + 1);
        // afterの先頭がcontinueの場合、beforeの末尾とつじつま合わせをする
        const afterHead = after[0] || [];
        const beforeTail = before[before.length - 1] || [];
        levelAll.forEach((level) => {
            if (afterHead[level] === ScoreItem.Continue
                && beforeTail[level] === ScoreItem.None) {
                afterHead[level] = ScoreItem.Start;
            }
        });

        this.resetAllRows(before.concat(after));
    }
    clearAll() {
        this.scoreItems.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if (cell.value !== ScoreItem.None) {
                    this._scoreItems.setScoreItemAt(rowIndex, cellIndex, ScoreItem.None);
                }
            })
        })
    }
    clearLine() {
        const row = this.scoreItems[this.selectedRow];
        row.forEach((scoreItem, index) => {
            if (scoreItem.value !== ScoreItem.None) {
                this.replaceScore(this.selectedRow, index, ScoreItem.None);
            }
        });
    }
    replaceScore(row :number, level :number, scoreItem?:ScoreItem) {
        const copy = this._scoreItems.copy;
        const findToBe = () => {
            const currentItem = copy[row][level];
            return (currentItem === ScoreItem.None
                ? ScoreItem.Start
                : currentItem === ScoreItem.Continue
                    ? ScoreItem.None
                    : (this.scoreItems[row - 1] && copy[row - 1][level] !== ScoreItem.None)
                        ? ScoreItem.Continue
                        : ScoreItem.None);
        }

        const toBe = scoreItem || findToBe();
        this._scoreItems.setScoreItemAt(row, level, toBe);
        if (toBe === ScoreItem.None && copy[row + 1] && copy[row + 1][level] === ScoreItem.Continue) {
            this._scoreItems.setScoreItemAt(row + 1, level, ScoreItem.Start);
        }
    }
    get selectedRow() :number {
        return this._selectedRow.value;
    }
    get scoreItems() :ReadonlyArray<ReadonlyArray<WithListener<ScoreItem>>> {
        return this._scoreItems.ref;
    }

    private _setSelectedRow(row :number, forceScroll :boolean) {
        this._selectedRow.value = row;
        if (forceScroll) {
            this.scrollToRow(row);
        }
    }
    private scrollToRow(row :number) {
        this.sheetDiv.scrollTo(0, (row - 3) * scoreSheetRowHeight);
    }
}
 