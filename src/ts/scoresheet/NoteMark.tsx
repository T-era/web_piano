import { useMemo } from 'react';
import { scoreButtonWidth, scoreSheetRowHeight } from '../base';

interface NMProps {
    y :number;
    onClicked :()=>void;
}

const note_left = 4;
const note_width = scoreButtonWidth - 2;
const note_height = scoreSheetRowHeight - 2;
const tadpole_height = note_height / 8;
const tadpole_width = note_width / 4
export default function NoteMark({y, onClicked} :NMProps) {
    return useMemo(() => (<>
        <rect x={1} y={y+1} width={scoreButtonWidth-2} height={scoreSheetRowHeight-2} onClick={onClicked} className='background'/>
        <path className='note_mark' onClick={onClicked}
            d={`M${note_left} ${y+note_height-tadpole_height} a${tadpole_width/2} ${tadpole_height/2} -10 0 0${tadpole_width} ${tadpole_height}, ${tadpole_width/2} ${tadpole_height/2} -10 1 0 ${-tadpole_width} ${-tadpole_height} m${note_width/2-tadpole_width/2} 0 l0 ${tadpole_width/2-note_height}z`}
        />
    </>), [onClicked]);
}