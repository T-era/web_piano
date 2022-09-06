import { useState } from "react";
import Modal from 'react-modal';
import { wrap } from "../../base";
import MenuDetail from "../../components/WithToolTip";
import { IoModel } from "../../viewmodels";
import { LoadIcon } from "./IOIcons";

import './LoadDialog.scss';

Modal.setAppElement('#root');

interface Props {
    saveDataTitles :string[];
    ioModel :IoModel;
}
const overlayStyle = {
    background: 'rgba(64, 64, 64, .5)',
}
export default function Load({ saveDataTitles, ioModel } :Props) {
    const modalIsOpenState = wrap(useState(false));
    const [selectedTitle, setSelectedTitle] = useState(saveDataTitles[0])
    const close = (isSelected :boolean) => {
        if (isSelected) {
            ioModel.load(selectedTitle);
        }
        modalIsOpenState.set(false);
    }
    return (
        <MenuDetail toolTipLabel={<LoadIcon/>} modalIsOpenState={modalIsOpenState}>
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
