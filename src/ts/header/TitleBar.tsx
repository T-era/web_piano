import { useState } from "react";
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
                { "->" }
            </label>
            <input id='title_input' type="text" hidden={isReadOnly} value={title}
                className='title_plate'
                onBlur={onFocusOut}
                onChange={(e) => setTitle(e.target.value)}
                onClick={onClick} />
            <label htmlFor='title_input' className='title_plate' onClick={onClick}>{ isReadOnly && title }</label>
        </div>
    )
}