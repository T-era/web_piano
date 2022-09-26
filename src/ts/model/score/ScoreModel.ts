import { levelAll, newScoreRow, ScoreItem, scoreSheetRowHeight } from "../../base";
import { WithListener } from "../../Listener";
import { SoundContext } from "../../sound";
import { MusicSetting } from "../MusicSetting";
import { ScoreItemsCore, Event, ScoreItems } from "./ScoreItemsCore";
import { ScoreItemsControl } from "./ScoreItemsControl";

export class ScoreModel {
    private readonly _scoreItems :ScoreItemsCore = new ScoreItemsCore([]);
    private _selectedRow :WithListener<number> = new WithListener(0);

    private readonly _musicSetting :MusicSetting;
    private readonly soundContext :SoundContext;
    private readonly sheetDiv :HTMLDivElement;
    private readonly _control :ScoreItemsControl;

    constructor(musicSetting :MusicSetting, sheetDiv :HTMLDivElement, soundContext :SoundContext) {
        this._musicSetting = musicSetting;
        this.sheetDiv = sheetDiv;
        this.soundContext = soundContext;
        this._scoreItems.appendNewRow();
        this._control = new ScoreItemsControl(this._scoreItems, this._selectedRow, sheetDiv);
    }
    addNewRowListener(f :Event<void>) {
        this._scoreItems.addAppendRowListener(f);
    }
    addScoreItemListener(row:number, level:number, f :Event<ScoreItem>) {
        this._scoreItems.addScoreItemListenerAt(row, level, f);
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
        const levels = this.scoreItems[row].map((scoreItem, level) => {
            if (scoreItem.value == ScoreItem.None) return -1;
            else return level
        }).filter((level_) => level_ !== -1);
        const stoppers = levels.map((level) => {
            return this.soundContext.getPlayer(this.musicSetting, level)
                .play();
        })
        return ()=>stoppers.forEach(stopper=> stopper.stop());
    }
    get control() {
        return this._control;
    }
    get musicSetting() :MusicSetting {
        return this._musicSetting;
    }
    get selectedRow() :number {
        return this._selectedRow.value;
    }
    get scoreItems() :ReadonlyArray<ReadonlyArray<WithListener<ScoreItem>>> {
        return this._scoreItems.ref;
    }
    get scoreItemCopy() :ScoreItems {
        return this._scoreItems.copy;
    }
}
 