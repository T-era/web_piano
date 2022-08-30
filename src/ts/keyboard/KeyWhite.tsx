import { keyboardWhiteWidth } from '../base';

interface Props {
    x :number;
    shortcutKey :string;
    onClicked :()=>void;
}
export default function KeyWhite(props :Props) {
    return (
        <g onClick={props.onClicked}>
            <rect x={props.x} y="10" width={keyboardWhiteWidth} height="190" className='key white' />
            <text x={props.x + keyboardWhiteWidth / 2} y="185" textAnchor='middle' dominantBaseline='central' className='key white'>{`&${props.shortcutKey}`}</text>
        </g>
    )
}