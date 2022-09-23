import { MusicSetting } from "../../../model/MusicSetting";

const beatSpeedInput = document.getElementById('beat_speed_input') as HTMLInputElement;

export function menuMusicBeatSpeedInit(musicSetting :MusicSetting) {
    init();
    beatSpeedInput.onchange = (e) => {
        const value = beatSpeedInput.valueAsNumber;
        if (value === 0) {
            // 0だと良いを為さないのでキャンセルして元の値を設定する
            beatSpeedInput.valueAsNumber = musicSetting.beatSpeed;
        } else {
            musicSetting.beatSpeed = value;
        }
    }

    function init() {
        beatSpeedInput.valueAsNumber = musicSetting.beatSpeed;
    }
}
export function refreshBeatSpeed(musicSetting :MusicSetting) {
    beatSpeedInput.valueAsNumber = musicSetting.beatSpeed;
}