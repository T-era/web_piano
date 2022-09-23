import { MusicSetting } from "../model/MusicSetting";
import { Player, PlayerSet } from "./Player";


export class SoundContext {
    // getPlayer で要求されたら初期化します。
    playerByInstrument :{[name: string] :PlayerSet} = {};

    getPlayer(musicSetting :MusicSetting, level :number) :Player {
        const instrumentName = musicSetting.instrumentName;
        if (! this.playerByInstrument[instrumentName]) {
            this.playerByInstrument[instrumentName] = new PlayerSet(musicSetting.instrument)
        }
        return this.playerByInstrument[instrumentName].getPlayer(level);
    }
}

export const soundContext = new SoundContext();