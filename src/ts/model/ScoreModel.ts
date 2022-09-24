import { ActionChain, WithListener } from "../Listener";
import { levelAll, newScoreRow, ScoreItem, scoreSheetRowHeight } from "../base";
import { SoundContext } from "../sound";
import { MusicSetting } from "./MusicSetting";

type ItemListener = ActionChain<ScoreItem, void>;

export class ScoreModel {
    private readonly _musicSetting :MusicSetting;
    private readonly _scoreItems :ScoreItem[][] = [];
    private readonly newRowListener :ActionChain<void, void> = new ActionChain();
    private readonly refreshRowsListener :ActionChain<void, void> = new ActionChain();
    private readonly itemListeners :ItemListener[][] = [];
    private _selectedRow :WithListener<number> = new WithListener(0);

    private readonly soundContext :SoundContext;
    private readonly sheetDiv :HTMLDivElement;

    constructor(musicSetting :MusicSetting, sheetDiv :HTMLDivElement, soundContext :SoundContext) {
        this._musicSetting = musicSetting;
        this.sheetDiv = sheetDiv;
        this.soundContext = soundContext;
        this.scoreItems[0] = newScoreRow();
    }
    putAShortSound(level :number) {
        this.putAShortSoundAt(this.selectedRow, level);
    }
    addNewRowListener(f :()=>void) {
        this.newRowListener.add(f);
    }
    addActionListener(row:number, level:number, f :(s:ScoreItem)=>void) {
        if (! this.itemListeners[row]) this.itemListeners[row] = [];
        if (! this.itemListeners[row][level]) this.itemListeners[row][level] = new ActionChain();
        this.itemListeners[row][level].add(f);
    }
    addSelectedRowListener(f :(row:number)=>void) {
        this._selectedRow.addListener(f);
    }
    addRefreshRowsListener(f :()=>void) {
        this.refreshRowsListener.add(f);
    }
    putAShortSoundAt(row :number, level :number, withFocus :boolean = false) {
        this.replaceScore(row, level);

        if (withFocus) {
            this._setSelectedRow(row, withFocus);
        }
        const stopper = this.soundContext.getPlayer(this.musicSetting, level)
            .play();
        setTimeout(()=>stopper.stop(), 300);
    }
    playARow(row :number, withFocus :boolean = true, withScroll = false) :()=>void {
        if (withFocus) {
            this._setSelectedRow(row, withScroll);
        }
        const levels = this.scoreItems[row].map((scoreItem, level) => {
            if (scoreItem == ScoreItem.None) return -1;
            else return level
        }).filter((level_) => level_ !== -1);
        const stoppers = levels.map((level) => {
            return this.soundContext.getPlayer(this.musicSetting, level)
                .play();
        })
        return ()=>stoppers.forEach(stopper=> stopper.stop());
    }
    putSilentAt(level :number, withFocus :boolean = true) {
        this.replaceScore(this.selectedRow, level);
        if (withFocus) {
            this._setSelectedRow(this.selectedRow, true);
        }
    }
    setSelectedRow(row :number, forceScroll :boolean) {
        this._setSelectedRow(row, forceScroll);
    }
    addNewRow(forceFocus :boolean = false) {
        this.scoreItems.push(newScoreRow())
        this.itemListeners.push([]);
        this.newRowListener.fire();
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
            if (scoreItem !== ScoreItem.None) {
                this.scoreItems[currentRow + 1][level] = ScoreItem.Continue;
                this.itemListeners[currentRow + 1][level].fire(ScoreItem.Continue);
            }
        });
    }
    // 引数で与えられた譜面で scoreItems を入れ替えます。
    resetAllRows(newScore :ScoreItem[][]) {
        this.scoreItems.length = 0;
        this.refreshRowsListener.fire();
        newScore.forEach(newRow => {
            this.scoreItems.push(newRow);
            this.newRowListener.fire();
        });
        this._selectedRow.value = 0;
    }
    insertARowBefore(rownum :number) {
        const before = this.scoreItems.slice(0, rownum);
        const after = this.scoreItems.slice(rownum);
        // afterの先頭がcontinueの場合、newScoreRowもcontinueにする
        const afterHead = after[0] || [];
        const newRow = newScoreRow();
        levelAll.forEach((level) => {
            if (afterHead[level] === ScoreItem.Continue) {
                newRow[level] = ScoreItem.Continue;
            }
        });

        this.resetAllRows(before.concat([newRow, ...after]));
    }
    remveRow(rownum :number) {
        const before = this.scoreItems.slice(0, rownum);
        const after = this.scoreItems.slice(rownum + 1);
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
                if (cell !== ScoreItem.None) {
                    this.scoreItems[rowIndex][cellIndex] = ScoreItem.None;
                    this.itemListeners[rowIndex][cellIndex].fire(ScoreItem.None);
                }
            })
        })
    }
    clearLine() {
        const row = this.scoreItems[this.selectedRow];
        row.forEach((scoreItem, index) => {
            if (scoreItem !== ScoreItem.None) {
                this.replaceScore(this.selectedRow, index, ScoreItem.None);
            }
        });
    }
    replaceScore(row :number, level :number, scoreItem?:ScoreItem) {
        const findToBe = () => {
            const currentItem = this.scoreItems[row][level];
            return (currentItem === ScoreItem.None
                ? ScoreItem.Start
                : currentItem === ScoreItem.Continue
                    ? ScoreItem.None
                    : (this.scoreItems[row - 1] && this.scoreItems[row - 1][level] !== ScoreItem.None)
                        ? ScoreItem.Continue
                        : ScoreItem.None);
        }

        const toBe = scoreItem || findToBe();
        this.scoreItems[row][level] = toBe;
        this.itemListeners[row][level].fire(toBe);
        if (toBe === ScoreItem.None && this.scoreItems[row + 1] && this.scoreItems[row + 1][level] === ScoreItem.Continue) {
            this.scoreItems[row + 1][level] = ScoreItem.Start;
            this.itemListeners[row + 1][level].fire(ScoreItem.Start);
        }
    }

    get musicSetting() :MusicSetting {
        return this._musicSetting;
    }
    get selectedRow() :number {
        return this._selectedRow.value;
    }
    get scoreItems() :ScoreItem[][] {
        return this._scoreItems;
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
 