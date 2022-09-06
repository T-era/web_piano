import { replaceAt } from "../ArrayUtil";
import { makeASound, ScoreItem, State } from "../base"
import { SelectedRow } from "../base";
import { all } from "../sound/instruments";
import { Model } from "./OverallModel";

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

export class ScoreModel {
    private readonly model :Model;
    private readonly scoreContentsState :State<ScoreItem[][]>;
    private readonly selectedScoreRowState :State<SelectedRow>;
    private readonly instrumentName :string;

    constructor(
        model :Model,
        scoreContents :State<ScoreItem[][]>,
        selectedScoreRow :State<SelectedRow>,
        instrumentName :string) {
        this.model = model;
        this.scoreContentsState = scoreContents;
        this.selectedScoreRowState = selectedScoreRow;
        this.instrumentName = instrumentName;
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

        this.model.setRowWithFocus({ row, forceFocus: withFocus });
    }
}
