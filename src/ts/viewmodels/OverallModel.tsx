import { replaceAt } from "../ArrayUtil";
import { KeyboardToneShift, makeASound, ScoreItem, State } from "../base"
import { SelectedRow } from "../base";
import { all } from "../sound/instruments";

export function newScoreRow() {
    const ret :ScoreItem[] = [];
    for (let i = 0; i < 12 * 4; i ++) {
        ret.push(ScoreItem.None);
    }
    return ret;
}

function replaceScore(scores:ScoreItem[][], level :number, row :number) {
    const current = scores[row][level];
    const prevItem = (scores[row-1] ? scores[row-1][level] : ScoreItem.None);
    const newItem = replaceToNext(current, prevItem);
    let scoresReplaced = replaceAt(scores, level, row, newItem);
    if (newItem === ScoreItem.None) {
        const nextItem = (scores[row+1] ? scores[row+1][level] : ScoreItem.None);
        if (nextItem === ScoreItem.Continue) {
            scoresReplaced = replaceAt(scoresReplaced, level, row + 1, ScoreItem.Start);
        }
    }
    return scoresReplaced
}
function replaceToNext(current :ScoreItem, prevItem :ScoreItem) :ScoreItem {
    return (current === ScoreItem.None
            ? ScoreItem.Start
            : current === ScoreItem.Start
                ? (prevItem !== ScoreItem.None
                    ? ScoreItem.Continue
                    : ScoreItem.None)
                : ScoreItem.None);
}

export class Model {
    private readonly ktsState :State<KeyboardToneShift>;
    private readonly scoreContentsState :State<ScoreItem[][]>;
    private readonly selectedScoreRowState :State<SelectedRow>;
    private readonly instrumentName :string;

    constructor(
        kts :State<KeyboardToneShift>,
        scoreContents :State<ScoreItem[][]>,
        selectedScoreRow :State<SelectedRow>,
        instrumentName :string) {
        this.ktsState = kts;
        this.scoreContentsState = scoreContents;
        this.selectedScoreRowState = selectedScoreRow;
        this.instrumentName = instrumentName;
    }
    setRowWithFocus(row :SelectedRow) {
        const { set: setSelectedScoreRow } = this.selectedScoreRowState;
        setSelectedScoreRow(row);
    }
    putASound(level :number) {
        const instrumentName = this.instrumentName;
        const { value: { row: selectedScoreRow } } = this.selectedScoreRowState;
        const { set: setScoreContents } = this.scoreContentsState;

        const instrument = all[instrumentName]

        makeASound(instrument, [level]);
        setScoreContents((scoreContents) => 
            replaceScore(scoreContents, level, selectedScoreRow));
    }
    putASoundAt(row :number, level :number, withFocus :boolean = true) {
        const instrumentName = this.instrumentName;
        const { set: setScoreContents } = this.scoreContentsState;
        const instrument = all[instrumentName]

        makeASound(instrument, [level]);
        setScoreContents((scoreContents) => 
            replaceScore(scoreContents, level, row));

        this.setRowWithFocus({ row, forceFocus: withFocus });
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
