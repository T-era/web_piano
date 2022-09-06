import { KeyboardToneShift, State } from "../base"
import { SelectedRow } from "../base";

export class Model {
    private readonly ktsState :State<KeyboardToneShift>;
    private readonly selectedScoreRowState :State<SelectedRow>;

    constructor(
        kts :State<KeyboardToneShift>,
        selectedScoreRow :State<SelectedRow>) {
        this.ktsState = kts;
        this.selectedScoreRowState = selectedScoreRow;
    }
    setRowWithFocus(row :SelectedRow) {
        const { set: setSelectedScoreRow } = this.selectedScoreRowState;
        setSelectedScoreRow(row);
    }
    onToneChanging(toUp :boolean) {
        const { value: kts, set: setKts } = this.ktsState;
        if (toUp) {
            if (kts === KeyboardToneShift.d) {
            } else {
                setKts(kts + 1);
            }
        } else {
            if (kts === KeyboardToneShift.a) {
            } else {
                setKts(kts - 1);
            }
        }
    }
}
