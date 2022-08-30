import { keyboardBlackWidth, keyboardWhiteWidth, octaveWidth, scoreButtonWidth } from '../base';

import KeyBlack from './KeyBlack';
import KeyWhite from './KeyWhite';

interface Props {
    dx :number;
    dTone :number;
    isKeyinActive :boolean;
    onClicked :(level :number)=>void;
}
export default function Octave(props :Props) {
    let dx = props.dx + props.dTone * octaveWidth;
    const onKeyClicked = (dLevel :number) => {
        props.onClicked(props.dTone * 12 + dLevel);
    };
    return (
        <g className={ props.isKeyinActive ? 'keyin_active' : undefined }>
            <KeyWhite x={dx + keyboardWhiteWidth * 0} shortcutKey='s' onClicked={() => onKeyClicked(0)}/>
            <KeyWhite x={dx + keyboardWhiteWidth * 1} shortcutKey='d' onClicked={() => onKeyClicked(2)}/>
            <KeyWhite x={dx + keyboardWhiteWidth * 2} shortcutKey='f' onClicked={() => onKeyClicked(4)}/>
            <KeyWhite x={dx + keyboardWhiteWidth * 3} shortcutKey='g' onClicked={() => onKeyClicked(5)}/>
            <KeyWhite x={dx + keyboardWhiteWidth * 4} shortcutKey='h' onClicked={() => onKeyClicked(7)}/>
            <KeyWhite x={dx + keyboardWhiteWidth * 5} shortcutKey='j' onClicked={() => onKeyClicked(9)}/>
            <KeyWhite x={dx + keyboardWhiteWidth * 6} shortcutKey='k' onClicked={() => onKeyClicked(11)}/>

            <KeyBlack x={dx + keyboardWhiteWidth * 1} shortcutKey='e' onClicked={() => onKeyClicked(1)}/>
            <KeyBlack x={dx + keyboardWhiteWidth * 2} shortcutKey='r' onClicked={() => onKeyClicked(3)}/>
            <KeyBlack x={dx + keyboardWhiteWidth * 4} shortcutKey='y' onClicked={() => onKeyClicked(6)}/>
            <KeyBlack x={dx + keyboardWhiteWidth * 5} shortcutKey='u' onClicked={() => onKeyClicked(8)}/>
            <KeyBlack x={dx + keyboardWhiteWidth * 6} shortcutKey='i' onClicked={() => onKeyClicked(10)}/>

            <line className='guideline' x1={dx + keyboardWhiteWidth * 0} y1={10} x2={dx + scoreButtonWidth * 0} y2={0} />
            <line className='guideline' x1={dx + keyboardWhiteWidth * 1 - keyboardBlackWidth / 2} y1={10} x2={dx + scoreButtonWidth * 1} y2={0} />
            <line className='guideline' x1={dx + keyboardWhiteWidth * 1 + keyboardBlackWidth / 2} y1={10} x2={dx + scoreButtonWidth * 2} y2={0} />
            <line className='guideline' x1={dx + keyboardWhiteWidth * 2 - keyboardBlackWidth / 2} y1={10} x2={dx + scoreButtonWidth * 3} y2={0} />
            <line className='guideline' x1={dx + keyboardWhiteWidth * 2 + keyboardBlackWidth / 2} y1={10} x2={dx + scoreButtonWidth * 4} y2={0} />
            <line className='guideline' x1={dx + keyboardWhiteWidth * 3} y1={10} x2={dx + scoreButtonWidth * 5} y2={0} />
            <line className='guideline' x1={dx + keyboardWhiteWidth * 4 - keyboardBlackWidth / 2} y1={10} x2={dx + scoreButtonWidth * 6} y2={0} />
            <line className='guideline' x1={dx + keyboardWhiteWidth * 4 + keyboardBlackWidth / 2} y1={10} x2={dx + scoreButtonWidth * 7} y2={0} />
            <line className='guideline' x1={dx + keyboardWhiteWidth * 5 - keyboardBlackWidth / 2} y1={10} x2={dx + scoreButtonWidth * 8} y2={0} />
            <line className='guideline' x1={dx + keyboardWhiteWidth * 5 + keyboardBlackWidth / 2} y1={10} x2={dx + scoreButtonWidth * 9} y2={0} />
            <line className='guideline' x1={dx + keyboardWhiteWidth * 6 - keyboardBlackWidth / 2} y1={10} x2={dx + scoreButtonWidth * 10} y2={0} />
            <line className='guideline' x1={dx + keyboardWhiteWidth * 6 + keyboardBlackWidth / 2} y1={10} x2={dx + scoreButtonWidth * 11} y2={0} />
            <line className='guideline' x1={dx + keyboardWhiteWidth * 7} y1={10} x2={dx + scoreButtonWidth * 12} y2={0} />
        </g>
    )
}