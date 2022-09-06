import { useMemo } from 'react';
import { PlaySuspender, SpeakerModel } from '../viewmodels/SpeakerModel';
import './PlayAll.scss';

interface Props {
    playSuspender :PlaySuspender|null;
    speakerModel :SpeakerModel;
}
export default function PlayAll({playSuspender, speakerModel} :Props) {
    return useMemo(() => (
        <>
            <PlayIcon title='Play ALL' caption='ALL' onClick={() => speakerModel.playAll()}/>
            <PlayIcon title='Play below...' caption='|=>' onClick={() => speakerModel.playBelow()}/>
            <PlayIcon title='Play only view range' caption='|〜|' onClick={() => speakerModel.playScope()}/>
            { ! playSuspender || <PlaySuspendIcon onClick={() => playSuspender.fToSuspend()}/>}
        </>
    ), [playSuspender, speakerModel]);
}

function PlayIcon({title, caption, onClick} :{title:string,caption:string,onClick:()=>void}) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg'
            viewBox={`0 0 200 200`}
            className="play_controll"
            onClick={onClick}>
            <title>{title}</title>
            <path className='trigrid' x={0} y={0} width={200} height={200}
                d="M10 10,10 190,190 100Z" />
            <path className='trimark' x={0} y={0} width={200} height={200}
                d="M20 25,20 175,170 100Z" />
            <text x={70} y={100} fontSize={50} textAnchor='middle' dominantBaseline='central' fill="white">{caption}</text>
        </svg>
    )
}
function PlaySuspendIcon({onClick} :{onClick:()=>void}) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox={`0 0 200 200`} className="play_controll" onClick={onClick}>
            <path className='trigrid' x={0} y={0} width={200} height={200}
                d="M10 10,10 190,190 190,190 10Z" />
            <path className='trimark' x={0} y={0} width={200} height={200}
                d="M20 20,20 180,180 180,180 20Z" />
            <text x={100} y={100} fontSize={50} textAnchor='middle' dominantBaseline='central' fill="white">STOP</text>
        </svg>

    )
}