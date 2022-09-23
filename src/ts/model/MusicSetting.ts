import { WithListener } from "../Listener";
import { soundContext } from "../sound";
import { all, Instrument, defaultInstrument } from "../sound";
import lsio from "./io/LocalStorageIo";

export class MusicSetting {
    private _instrument :Instrument;
    private _beatSpeed :number = 0.2;
    private _title :WithListener<string> = new WithListener(lsio.autoNaming());

    constructor() {
        this._instrument = defaultInstrument;
    }
    instrumentNameAll() :string[] {
        return Object.keys(all);
    }
    setInstrument(instrumentName :string) {
        this._instrument = all[instrumentName];
        // バッファ初期化を開始するために、一度プレイヤーを取得しておく
        soundContext.getPlayer(this, 0);
    }
    addTitleListener(f :(s:string)=>void) {
        this._title.addListener(f);
    }
    get title() :string {
        return this._title.value;
    }
    set title(title :string) {
        this._title.value = title;
    }
    get instrument() :Instrument {
        return this._instrument
    }
    get instrumentName() :string {
        return this._instrument.title;
    }
    set beatSpeed(value :number) {
        this._beatSpeed = value;
    }
    get beatSpeed() :number {
        return this._beatSpeed;
    }
}
