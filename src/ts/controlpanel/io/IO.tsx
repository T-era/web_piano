import Load from "./Load";
import Save from "./Save";

interface Props {
    saveDataTitles :string[];
    onLoading :(title :string)=>void;
    onSaving :()=>void;
}
export default function IO({saveDataTitles, onLoading, onSaving} :Props) {
    return (
        <>
            <Save onSaving={onSaving} />
            <Load saveDataTitles={saveDataTitles} onLoading={onLoading} />
        </>
    )
}