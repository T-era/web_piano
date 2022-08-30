import { all } from "../sound/instruments";

interface Props {
    selectedInstrumentName :string;
    onSelectedInstrumentNameChanging :(newValue :string)=>void;
}
export default function InstrumentSelect({selectedInstrumentName, onSelectedInstrumentNameChanging} :Props) {
    return (
        <select
            size={3}
            value={selectedInstrumentName}
            onChange={(e) => onSelectedInstrumentNameChanging(e.target.value)}>
            { Object.keys(all).map((item) => 
                <option key={item} value={item}>{item}</option>
            )}
        </select>
    )
}