import ExportToJson from "./ExportToJson";
import ImportFromJson from "./ImportFromJsom";
import Load from "./Load";
import Save from "./Save";
import NamePlate from "./NamePlate";
import { State } from "../../base";
import { IoModel } from "../../viewmodels";

import './IO.scss';

interface Props {
    titleState :State<string>;
    saveDataTitles :string[];
    ioModel :IoModel;
}
export function IO(props :Props) {
    const {titleState, saveDataTitles, ioModel} = props;
    return (
        <>
            <SaveLoad saveDataTitles={saveDataTitles} ioModel={ioModel} />
            <ExpImp ioModel={ioModel} />
        </>
    );
}
interface SLProps {
    saveDataTitles :string[];
    ioModel :IoModel;
}

function SaveLoad({saveDataTitles, ioModel} :SLProps) {
    return (
        <>
            <Save ioModel={ioModel} />
            <Load saveDataTitles={saveDataTitles} ioModel={ioModel} />
        </>
    );
}

interface ExImProps {
    ioModel :IoModel;
}
function ExpImp({ioModel} :ExImProps) {
    return (
        <>
            <ExportToJson ioModel={ioModel} />
            <ImportFromJson ioModel={ioModel}  />
        </>
   );
}