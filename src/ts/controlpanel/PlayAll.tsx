import { PlaySuspender } from '../viewmodels/SpeakerModel';
import './PlayAll.scss';

interface Props {
    playSuspender :PlaySuspender|null;
    onPlayAll :()=>void;
    onPlayBelow :()=>void;
}
export default function PlayAll({playSuspender, onPlayAll, onPlayBelow} :Props) {
    return (
        <>
            <button onClick={onPlayAll}>
                 Play!
            </button>
            <button onClick={onPlayBelow}>
                Play below..
            </button>
            { ! playSuspender || <button onClick={() => playSuspender.fToSuspend()}>Stop</button>}
        </>
    )
}