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
        <path className='note_mark' onClick={onClicked} fill="pink"
            d={`m9.56 ${y+2.6}c-1.7 -0.8,-3.1 -2.6,-3.1 -2.6v1.2,9.5c-0.5 -0.2,-1.1 -0.2,-1.8 -0.1,-1.5 0.3,-2.6 1.5,-2.3 2.7,0.2 1.2,1.7 1.9,3.2 1.6,1.4 -0.3,2.3 -1.2,2.4 -2.3v-8.3c4.4 0.5,3.7 3.6,3.4 4.5,2.5 -2.8,1.2 -4.8,-1.7 -6.3Z`} />
    </>), [y, onClicked]);
}