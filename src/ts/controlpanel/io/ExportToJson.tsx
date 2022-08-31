import MenuDetail from "../../components/MenuDetail";
import { exportToJson } from "../../io/Text";
import { SaveData } from "../../io/util";

import './LoadDialog.scss';

interface Props {
    saveData :SaveData;
}
export default function ExportToJson({ saveData } :Props) {
    return (
        <MenuDetail menu="Export">
            <textarea value={exportToJson(saveData)} />
        </MenuDetail>
    )
}
