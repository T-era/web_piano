import { State } from "../base";
import { PlaySuspender } from "../viewmodels/SpeakerModel";
import BeatSpeed from "./BeatSpeed";
import InstrumentSelect from "./InstrumentSelect";
import IO from "./io/IO";
import PlayAll from "./PlayAll";

interface Props {
    selectedInstrumentNameState :State<string>;
    beatSpeedState :State<number>;
    playSuspender :PlaySuspender|null;
    saveDataTitles :string[];
    onPlayAll :()=>void;
    onPlayBelow :()=>void;
    onSaving :()=>void;
    onLoading :(title :string)=>void;
}
export default function ControlPanel(props :Props) {
    const {
        selectedInstrumentNameState,
        beatSpeedState,
        playSuspender, onPlayAll, onPlayBelow, 
        saveDataTitles, onSaving, onLoading,
    } = props;
    return (
        <>
            <InstrumentSelect
                selectedInstrumentNameState={selectedInstrumentNameState}
                />
            <BeatSpeed
                beatSpeedState={beatSpeedState}
                />
            <PlayAll
                onPlayAll={onPlayAll}
                onPlayBelow={onPlayBelow}
                playSuspender={playSuspender}
                />
            <IO
                saveDataTitles={saveDataTitles}
                onSaving={onSaving}
                onLoading={onLoading}
                />
        </>
    )
}