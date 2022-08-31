import { SaveData } from "../../io/util";
import ExportToJson from "./ExportToJson";
import ImportFromJson from "./ImportFromJsom";
import Load from "./Load";
import Save from "./Save";

import './IO.scss';

interface Props {
    saveDataTitles :string[];
    onLoading :(title :string)=>void;
    onSaving :()=>void;
    saveData :SaveData;
    onImported :(saveData :SaveData)=>void;
}
export function IO(props :Props) {
    const {saveDataTitles, onLoading, onSaving} = props;
    const {saveData, onImported} = props;
    return (
        <details style={{display: "inline-block"}}>
            <summary>Save/Load</summary>
            <div className='details_content'>
                <SaveLoad saveDataTitles={saveDataTitles} onLoading={onLoading} onSaving={onSaving} />
                <ExpImp saveData={saveData} onImported={onImported} />
            </div>
        </details>
    );
}
interface SLProps {
    saveDataTitles :string[];
    onLoading :(title :string)=>void;
    onSaving :()=>void;
}

function SaveLoad({saveDataTitles, onLoading, onSaving} :SLProps) {
    return (
        <>
            <Save onSaving={onSaving} />
            <Load saveDataTitles={saveDataTitles} onLoading={onLoading} />
        </>
    );
}

interface ExImProps {
    saveData :SaveData;
    onImported :(saveData :SaveData)=>void;
}
function ExpImp({saveData, onImported} :ExImProps) {
    return (
        <>
            <ExportToJson saveData={saveData} />
            <ImportFromJson onImported={onImported}  />
        </>
   );
}