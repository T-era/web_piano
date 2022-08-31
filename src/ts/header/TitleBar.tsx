import { useMemo, useState } from "react";
import { State } from "../base";
import './TitleBar.scss';

interface Props {
    titleState :State<string>;
}
export default function TitleBar({titleState} :Props) {
    const { value: title, set: setTitle } = titleState;
    let [isReadOnly, setReadOnly] = useState(true);

    const onClick = () => {
        setReadOnly(false);
    }
    const onFocusOut = () => {
        setReadOnly(true);
    }
    return (
        <div className='title_bar'>
            <label htmlFor='title_input' onClick={onClick}>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox="0 0 32 32">
                    <PencilIcon />
                </svg>
            </label>
            <input id='title_input' type="text" readOnly={isReadOnly} value={title}
                className='title_plate'
                onBlur={onFocusOut}
                onChange={(e) => setTitle(e.target.value)}
                onClick={onClick} />
        </div>
    )
}
function PencilIcon() {
    return useMemo(() => (
        <>
            <rect x={1} y={1} width={31} height={31} stroke={"darkorange"} fill={"none"} rx={4} ry={4}/>
            <rect x={16} y={0} width={16} height={16} stroke={"white"} fill={"white"} />
            <path x={1} y={1} width={31} height={31} stroke={"brown"} fill={"pink"}
                d="M5 18L5 27,14 27,14 23,9 18Z
                  M5 18,20 3  M9 18,24 3  M14 23,29 8  M14 27,29 12
                  M20 3,24 3  M24 3,29 8  M29 8,29 12" />
            <path x={1} y={1} width={31} height={31} stroke={"black"} fill={"black"}
                d="M5 24l0 3,3 0Z" />
        </>
    ), [])
}