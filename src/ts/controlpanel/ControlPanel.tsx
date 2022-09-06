import { State } from "../base";
import { PlaySuspender, SpeakerModel } from "../viewmodels/SpeakerModel";
import BeatSpeed from "./BeatSpeed";
import InstrumentSelect from "./InstrumentSelect";
import { IO } from "./io/IO";
import PlayAll from "./PlayAll";

import './ControlPanel.scss';
import RibonMenu from "../components/ribon/Ribon";
import { IoModel } from "../viewmodels";
import Music from "./Music";

interface Props {
    ioModel :IoModel;
    selectedInstrumentNameState :State<string>;
    beatSpeedState :State<number>;
    titleState :State<string>;
    playSuspender :PlaySuspender|null;
    saveDataTitles :string[];
    speakerModel :SpeakerModel;
}
export default function ControlPanel(props :Props) {
    const {
        ioModel,
        selectedInstrumentNameState,
        beatSpeedState,
        playSuspender, speakerModel,
        titleState,
        saveDataTitles,
    } = props;
    return (
        <div className='control_panel_grid'>
            <RibonMenu
                menuItems={[
                    { menuLabel:'Play', menuContent: <PlayAll
                        playSuspender={playSuspender}
                        speakerModel={speakerModel}
                        />},
                    { menuLabel: "Music", menuContent: <Music
                        beatSpeedState={beatSpeedState}
                        selectedInstrumentNameState={selectedInstrumentNameState}
                        />},
                    { menuLabel:'System', menuContent: <IO
                        ioModel={ioModel}
                        titleState={titleState}
                        saveDataTitles={saveDataTitles}
                        /> },
                ]}/>
        </div>
    )
}
