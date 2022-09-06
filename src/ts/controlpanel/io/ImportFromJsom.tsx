import { useState } from "react";
import Modal from 'react-modal';
import { wrap } from "../../base";
import WithToolTip from "../../components/WithToolTip";
import { importFromJson } from "../../io/Text";
import { IoModel } from "../../viewmodels";
import { ImportFromJsonIcon } from "./IOIcons";

import './LoadDialog.scss';

Modal.setAppElement('#root');
const overlayStyle = {
    background: 'rgba(64, 64, 64, .5)',
}

interface Props {
    ioModel :IoModel;
}
export default function ImportFromJson({ ioModel } :Props) {
    const [textContents, setTextContents] = useState('');
    const modalIsOpenState = wrap(useState(false));
    const close = (isDone :boolean) => {
        if (isDone) {
            const saveData = importFromJson(textContents);
            if (saveData !== null) {
                ioModel.import(saveData);
            }
        }
        modalIsOpenState.set(false);
    }
    return (
        <WithToolTip toolTipLabel={<ImportFromJsonIcon/>} modalIsOpenState={modalIsOpenState}>
            <div>
                <textarea value={textContents} onChange={(e) => setTextContents(e.target.value)} />
            </div>
            <button onClick={()=>close(true)}>OK</button>
            <button onClick={()=>close(false)}>Cancel</button>
        </WithToolTip>
    )
}
