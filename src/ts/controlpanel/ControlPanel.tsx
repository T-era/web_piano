import { PlaySuspender } from "../viewmodels/SpeakerModel";
import BeatSpeed from "./BeatSpeed";
import InstrumentSelect from "./InstrumentSelect";
import IO from "./io/IO";
import PlayAll from "./PlayAll";

interface Props {
    selectedInstrumentName :string;
    playSuspender :PlaySuspender|null;
    beatSpeed :number;
    saveDataTitles :string[];
    onSelectedInstrumentNameChanging :(newValue :string)=>void;
    onPlayAll :()=>void;
    onPlayBelow :()=>void;
    onBeatSpeedChanging :(value :number)=>void;
    onSaving :()=>void;
    onLoading :(title :string)=>void;
}
export default function ControlPanel(props :Props) {
    const {
        selectedInstrumentName, onSelectedInstrumentNameChanging,
        beatSpeed, onBeatSpeedChanging,
        playSuspender, onPlayAll, onPlayBelow, 
        saveDataTitles, onSaving, onLoading,
    } = props;
    return (
        <>
            <InstrumentSelect
                selectedInstrumentName={selectedInstrumentName}
                onSelectedInstrumentNameChanging={onSelectedInstrumentNameChanging}
                />
            <BeatSpeed
                beatSpeed={beatSpeed}
                onChanging={onBeatSpeedChanging} />
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