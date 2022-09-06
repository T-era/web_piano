import { State } from "../base";
import BeatSpeed from "./BeatSpeed";
import InstrumentSelect from "./InstrumentSelect";

import './Music.scss';

interface Props {
    beatSpeedState :State<number>;
    selectedInstrumentNameState :State<string>;
}
export default function Music({beatSpeedState, selectedInstrumentNameState} :Props) {
    return (
        <div className='music_menu_frame'>
            <dl className='music_menu_item'>
                <dt>楽器</dt>
                <dd>
                    <InstrumentSelect selectedInstrumentNameState={selectedInstrumentNameState} />
                </dd>
            </dl>
            <dl className='music_menu_item'>
                <dt>テンポ</dt>
                <dd>
                    <BeatSpeed beatSpeedState={beatSpeedState}/>
                </dd>
            </dl>
        </div>
    );
}