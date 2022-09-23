import { MusicSetting } from "../../../model/MusicSetting";

const instrumentSelect = document.getElementById('instrument_select') as HTMLSelectElement;

export function menuMusicInstrumentInit(musicSetting :MusicSetting) {
    init();
    instrumentSelect.onchange = (e) => {
        const value = instrumentSelect.value;
        musicSetting.setInstrument(value);
    }

    function init() {
        musicSetting.instrumentNameAll().forEach(title => {
            const optionElm = document.createElement('option');
            optionElm.value = title;
            optionElm.innerText = title;
            instrumentSelect?.appendChild(optionElm);
            instrumentSelect.value = musicSetting.instrumentName;
        });
    }
}
export function refreshInstrument(musicSetting :MusicSetting) {
    instrumentSelect.value = musicSetting.instrumentName;
}