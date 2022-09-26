import { newScoreRow, ScoreItem } from "../../base";

export interface SaveData {
    beatSpeed :number;
    instrumentName :string;
    melody :Atom[];
}

export interface Atom {
    start :number;
    level :number;
    length :number;
}

export function scoresFromMelody(melody :Atom[]) :ScoreItem[][] {
    const ret :ScoreItem[][] = [];
    const length = melody.reduce(
        (max, atom) => {
            return Math.max(max, atom.start + atom.length)
        },
        1);
    for (let i = 0; i < length; i ++) {
        ret.push(newScoreRow());
    }
    melody.forEach((atom) => {
        let { start, level, length } = atom;
        ret[start][level] = ScoreItem.Start;
        for (let i = 1; i < length; i ++) {
            ret[start + i][level] = ScoreItem.Continue;
        }
    })
    return ret;
}
export function atomsFromScores(scoreContents :ReadonlyArray<ReadonlyArray<ScoreItem>>) :Atom[] {
    const ret :Atom[] = [];
    scoreContents.forEach((line, start) => {
        line.forEach((scoreItem, level) => {
            if (scoreItem === ScoreItem.Start) {
                let length = 1;
                let tempRow = start;
                while (scoreContents[++ tempRow] && scoreContents[tempRow][level] === ScoreItem.Continue)
                        length ++;
                ret.push({ start, level, length});
            }
        });
    });
    return ret;
}

export function exportToJson(data :SaveData) :string {
    return JSON.stringify(data);
}
export function importFromJson(jsonData :string) :SaveData|null {
    return JSON.parse(jsonData) as SaveData;
}
