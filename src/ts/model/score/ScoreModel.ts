import { ScoreItem } from "../../base";
import { WithListener } from "../../Listener";
import { SoundContext } from "../../sound";
import { MusicSetting } from "../MusicSetting";
import { ScoreItemsCore, Event, ScoreItems, Cell } from "./ScoreItemsCore";
import { ScoreItemsControl } from "./ScoreItemsControl";
import { ScoreItemsResizer } from "./ScoreItemsResizer";

export class ScoreModel {
    private readonly _scoreItems :ScoreItemsCore = new ScoreItemsCore([]);
    private _selectedRow :WithListener<number> = new WithListener(0);

    private readonly _musicSetting :MusicSetting;
    private readonly soundContext :SoundContext;
    private readonly _control :ScoreItemsControl;
    private readonly _resizer :ScoreItemsResizer;

    constructor(musicSetting :MusicSetting, sheetDiv :HTMLDivElement, soundContext :SoundContext) {
        this._musicSetting = musicSetting;
        this.soundContext = soundContext;
        this._scoreItems.appendNewRow();
        this._control = new ScoreItemsControl(this._scoreItems, this._selectedRow, sheetDiv);
        this._resizer = new ScoreItemsResizer(this, this._scoreItems);
    }
    addNewRowListener(f :Event<void>) {
        this._scoreItems.addAppendRowListener(f);
    }
    addScoreItemListener(row:number, level:number, f :Event<ScoreItem>) {
        this._scoreItems.addScoreItemListenerAt(row, level, f);
    }
    addHighlightListener(row :number, level :number, f :Event<boolean>) {
        this._scoreItems.addHighlightListenerAt(row, level, f);
    }
    addSelectedRowListener(f :Event<number>) {
        this._selectedRow.addListener(f);
    }
    addRefreshRowsListener(f :Event<ScoreItems>) {
        this._scoreItems.addRefreshListener(f);
    }

    /**
     * 楽譜に音符を設定し、また一定時間、指定された音階の音を鳴らします。
     */
    putAShortSoundAt(row :number, level :number, withFocus :boolean = false) {
        this._control.putScoreItem(row, level, withFocus);

        this.soundContext.getPlayer(this.musicSetting, level)
            .playSec(0.3);
    }
    /**
     * 楽譜一行分の音を鳴らします。戻り値の関数をコールすれば音を止められます。
     */
    playARow(row :number) :()=>void {
        const levels = this.scoreItems[row].map((cell, level) => {
            if (cell.scoreItem.value == ScoreItem.None) return -1;
            else return level
        }).filter((level_) => level_ !== -1);
        const stoppers = levels.map((level) => {
            return this.soundContext.getPlayer(this.musicSetting, level)
                .play();
        })
        return ()=>stoppers.forEach(stopper=> stopper.stop());
    }
    get control() :ScoreItemsControl {
        return this._control;
    }
    get resizer() :ScoreItemsResizer {
        return this._resizer;
    }
    get musicSetting() :MusicSetting {
        return this._musicSetting;
    }
    get selectedRow() :number {
        return this._selectedRow.value;
    }
    get scoreItems() :ReadonlyArray<ReadonlyArray<Cell>> {
        return this._scoreItems.ref;
    }
    get scoreItemCopy() :ScoreItems {
        return this._scoreItems.copy;
    }
}
 