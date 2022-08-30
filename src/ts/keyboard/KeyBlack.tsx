import { keyboardBlackWidth } from '../base';

interface Props {
    x :number;
    shortcutKey :string;
    onClicked :()=>void;
}
export default function KeyBlack(props :Props) {
    return (
        <g onClick={props.onClicked}>
            <rect x={props.x - keyboardBlackWidth / 2} y="10" width={keyboardBlackWidth} height="110" className='key black' />
            <text x={props.x} y="105" textAnchor='middle' dominantBaseline='central' className='key black'>{`&${props.shortcutKey}`}</text>
        </g>
    )
}