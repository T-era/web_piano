import { MusicSetting } from "../../../model/MusicSetting";
import { ScoreModel } from "../../../model/score";
import { menuMusicBeatSpeedInit, refreshBeatSpeed } from "./MusicBeatSpeed";
import { menuMusicInstrumentInit, refreshInstrument } from "./MusicInstrument";
import { menuMusicLengthInit } from "./MusicLength";

export function menuMusicInit(scoreModel :ScoreModel) {
    menuMusicBeatSpeedInit(scoreModel.musicSetting);
    menuMusicInstrumentInit(scoreModel.musicSetting);
    menuMusicLengthInit(scoreModel)
}
export function refreshMenuMusic(musicSetting :MusicSetting) {
    refreshBeatSpeed(musicSetting);
    refreshInstrument(musicSetting);
}