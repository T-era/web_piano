import { useState } from "react";
import Modal from 'react-modal';
import { wrap } from "../../base";
import MenuDetail from "../../components/MenuDetail";
import { exportToJson, importFromJson } from "../../io/Text";
import { SaveData } from "../../io/util";

import './LoadDialog.scss';

Modal.setAppElement('#root');
const overlayStyle = {
    background: 'rgba(64, 64, 64, .5)',
}

interface Props {
    onImported :(saveData :SaveData) => void;
}
export default function ImportFromJson({ onImported } :Props) {
    const [textContents, setTextContents] = useState('');
    const modalIsOpenState = wrap(useState(false));
    const close = (isDone :boolean) => {
        if (isDone) {
            const saveData = importFromJson(textContents);
            if (saveData !== null) {
                onImported(saveData);
            }
        }
        modalIsOpenState.set(false);
    }
    return (
        <MenuDetail menu="Import" modalIsOpenState={modalIsOpenState}>
                <textarea value={textContents} onChange={(e) => setTextContents(e.target.value)} />
                <button onClick={()=>close(true)}>OK</button>
                <button onClick={()=>close(false)}>Cancel</button>
        </MenuDetail>
    )
}
