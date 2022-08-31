import { State } from "../base";
import { SaveData } from "../io/util";
import { PlaySuspender } from "../viewmodels/SpeakerModel";
import BeatSpeed from "./BeatSpeed";
import InstrumentSelect from "./InstrumentSelect";
import { IO } from "./io/IO";
import PlayAll from "./PlayAll";

import './ControlPanel.scss';

interface Props {
    selectedInstrumentNameState :State<string>;
    beatSpeedState :State<number>;
    playSuspender :PlaySuspender|null;
    saveDataTitles :string[];
    saveData :SaveData;
    onPlayAll :()=>void;
    onPlayBelow :()=>void;
    onPlayScope :()=>void;
    onSaving :()=>void;
    onLoading :(title :string)=>void;
    setSaveData :(saeData :SaveData)=>void;
}
export default function ControlPanel(props :Props) {
    const {
        selectedInstrumentNameState,
        beatSpeedState,
        playSuspender, onPlayAll, onPlayBelow, onPlayScope,
        saveDataTitles, onSaving, onLoading,
        saveData, setSaveData
    } = props;
    return (
        <div className='menu'>
            <IO
                saveDataTitles={saveDataTitles}
                onSaving={onSaving}
                onLoading={onLoading}
                saveData={saveData}
                onImported={setSaveData}
                />
            <PlayAll
                playSuspender={playSuspender}
                onPlayAll={onPlayAll}
                onPlayBelow={onPlayBelow}
                onPlayScope={onPlayScope}
                />
            <InstrumentSelect
                selectedInstrumentNameState={selectedInstrumentNameState}
                />
            <BeatSpeed
                beatSpeedState={beatSpeedState}
                />
        </div>
    )
}