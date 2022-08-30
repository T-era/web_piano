import { useState } from "react";
import Modal from 'react-modal';

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
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState(saveDataTitles[0])
    const close = (isSelected :boolean) => {
        if (isSelected) {
            onLoading(selectedTitle);
        }
        setModalIsOpen(false);
    }
    return (
        <>
            <button onClick={()=>setModalIsOpen(true)}>Load</button>
            <Modal isOpen={modalIsOpen} style={{ overlay: overlayStyle}} className='load_dialog_contents'>
                <FileSelect selectedTitle={selectedTitle} saveDataTitles={saveDataTitles} onSelectChanged={setSelectedTitle}/>
                <button onClick={()=>close(true)}>OK</button>
                <button onClick={()=>close(false)}>Cancel</button>
          </Modal>
        </>
    )
}

interface FSProps {
    selectedTitle :string;
    saveDataTitles :string[];
    onSelectChanged :(title :string)=>void;
}
function FileSelect({ selectedTitle, saveDataTitles, onSelectChanged } :FSProps) {
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
