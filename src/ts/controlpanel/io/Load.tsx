import { useState } from "react";
import Modal from 'react-modal';
import { wrap } from "../../base";
import MenuDetail from "../../components/MenuDetail";

import './LoadDialog.scss';

Modal.setAppElement('#root');

interface Props {
    saveDataTitles :string[];
    onLoading :(title :string)=>void;
}
const overlayStyle = {
    background: 'rgba(64, 64, 64, .5)',
}
export default function Load({ saveDataTitles, onLoading } :Props) {
    const modalIsOpenState = wrap(useState(false));
    const [selectedTitle, setSelectedTitle] = useState(saveDataTitles[0])
    const close = (isSelected :boolean) => {
        if (isSelected) {
            onLoading(selectedTitle);
        }
        modalIsOpenState.set(false);
    }
    return (
        <MenuDetail menu="Load" modalIsOpenState={modalIsOpenState}>
            <FileSelect saveDataTitles={saveDataTitles} onSelectChanged={setSelectedTitle}/>
            <button onClick={()=>close(true)}>OK</button>
            <button onClick={()=>close(false)}>Cancel</button>
        </MenuDetail>
    )
}

interface FSProps {
    saveDataTitles :string[];
    onSelectChanged :(title :string)=>void;
}
function FileSelect({ saveDataTitles, onSelectChanged } :FSProps) {
    return (
        <div>
            <select onChange={(e) => onSelectChanged(e.target.value)} size={5}>
                { saveDataTitles.map((title) => 
                    <option value={title} key={title}>{title}</option>
                )}
            </select>
        </div>
    )
}
