export enum Direction {
    toUp,
    toDown
}
interface Props {
    x :number;
    size :number;
    direction :Direction;
    shortcutKey :string;
    onClick :()=>void;
}

export default function Octave(props :Props) {
    return (
        <>
            <rect x={props.x} y={100-props.size/2} width="40" height="40" rx="5" ry="5"
                className='btn_tone' onClick={props.onClick} />
            <text x={props.x+props.size/2} y={90} textAnchor='middle' dominantBaseline='central'
                className='btn_tone' onClick={props.onClick}>
                {props.direction == Direction.toDown
                    ? "<"
                    : ">"}
            </text>
            <text x={props.x+props.size/2} y={110} textAnchor='middle' dominantBaseline='central'
                className='btn_tone' onClick={props.onClick}>
                {`&${props.shortcutKey}`}
            </text>
        </>
    )
}
function DownArrow() {

}