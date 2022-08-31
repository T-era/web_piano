import Octave from './Octave';
import ButtonTone, { Direction } from './ButtonTone';

import './KeyboardSvg.scss';
import { keyboardShiftWidth, KeyboardToneShift, octaveWidth } from '../base';

interface Props {
    kts :KeyboardToneShift;
    onToneChanging :(toUpper :boolean) => void;
    onPutASound :(level :number) => void;
}
export default function Keyboard(props :Props) {
    const onSoundClicked = (level :number) => {
        props.onPutASound(level);
    }
    const width = keyboardShiftWidth * 2 + octaveWidth * 4;
    function s(level :number|null, length :number) { return {level, length}; }
    return (<>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox={`0 0 ${width} 200`} style={{width}}>
            <ButtonTone shortcutKey='a' x={0} size={keyboardShiftWidth} direction={Direction.toDown}
                onClick={() => props.onToneChanging(false)} />
            <Octave dx={keyboardShiftWidth} dTone={0} isKeyinActive={props.kts === KeyboardToneShift.a} onClicked={onSoundClicked}/>
            <Octave dx={keyboardShiftWidth} dTone={1} isKeyinActive={props.kts === KeyboardToneShift.b} onClicked={onSoundClicked}/>
            <Octave dx={keyboardShiftWidth} dTone={2} isKeyinActive={props.kts === KeyboardToneShift.c} onClicked={onSoundClicked}/>
            <Octave dx={keyboardShiftWidth} dTone={3} isKeyinActive={props.kts === KeyboardToneShift.d} onClicked={onSoundClicked}/>
            <ButtonTone shortcutKey='l' x={keyboardShiftWidth + octaveWidth * 4} size={keyboardShiftWidth} direction={Direction.toUp}
                onClick={() => props.onToneChanging(true)} />
        </svg>
    </>);
}
