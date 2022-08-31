import { useMemo } from 'react';
import { PlaySuspender } from '../viewmodels/SpeakerModel';
import './PlayAll.scss';

interface Props {
    playSuspender :PlaySuspender|null;
    onPlayAll :()=>void;
    onPlayBelow :()=>void;
    onPlayScope :()=>void;
}
export default function PlayAll({playSuspender, onPlayAll, onPlayBelow, onPlayScope} :Props) {
    return useMemo(() => (
        <div className='menuitem play_controll'>
            <button onClick={onPlayAll}>Play!</button>
            <ul className='play_buttons'>
                <li>
                </li>
                <li>
                    <button onClick={onPlayBelow}>Play below..</button>
                </li>
                <li>
                    <button onClick={onPlayScope}>Play view range</button>
                </li>
            </ul>
            { ! playSuspender || <button onClick={() => playSuspender.fToSuspend()}>Stop</button>}
        </div>
    ), [playSuspender]);
}