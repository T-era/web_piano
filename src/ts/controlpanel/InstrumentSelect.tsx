import { State } from "../base";
import { all } from "../sound/instruments";

interface Props {
    selectedInstrumentNameState :State<string>;
}
export default function InstrumentSelect({selectedInstrumentNameState} :Props) {
    const { value, set } = selectedInstrumentNameState;
    return (
        <select
            size={3}
            value={value}
            onChange={(e) => set(e.target.value)}>
            { Object.keys(all).map((item) => 
                <option key={item} value={item}>{item}</option>
            )}
        </select>
    )
}