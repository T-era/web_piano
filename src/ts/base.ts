import Player, { Atom } from "./sound/Player";
import { Instrument } from "./sound/instruments";
import { newScoreRow } from "./viewmodels/OverallModel";
import { Dispatch, SetStateAction } from "react";

export const keyboardShiftWidth = 40;
export const octaveWidth = 252;    // 鍵盤幅は /7, スコアシートは /12
export const keyboardWhiteWidth = octaveWidth / 7;
export const keyboardBlackWidth = keyboardWhiteWidth * .7;
export const scoreButtonWidth = octaveWidth / 12;
export const scoreSideButtonWidth = keyboardShiftWidth / 2;
export const scoreSheetRowHeight = 15;

export enum ScoreItem {
    Start,
    Continue,
    None,
}
export enum KeyboardToneShift {
    a = 0,
    b = 1,
    c = 2,
    d = 3
}
export interface State<T> {
    value :T;
    set :Dispatch<SetStateAction<T>>;
}

export function wrap<T>([value, set] : [T, Dispatch<SetStateAction<T>>]) :State<T> {
    return { value, set };
}


export function playAllMelody(instrument :Instrument, scoreContents :ScoreItem[][], beatSpeed :number, onEnded :()=>void) :()=>void{
    const speaker = new Player(scoreContents.length, beatSpeed);
    const atoms = atomsFromScores(scoreContents);

    return speaker.playMelody(instrument, atoms, onEnded);
}
export function makeASound(instrument :Instrument, levels :number[]) {
    const speaker = new Player(1, .3);
    speaker.playChord(instrument, levels);
} 

export function levelsFromScores(scoreItems :ScoreItem[]) :number[] {
    return scoreItems.map(
        (scoreItem, i) => scoreItem === ScoreItem.None ? -1 : i
    ).filter(
        (nullOrI) => nullOrI !== -1
    );
}
export function atomsFromScores(scoreContents :ScoreItem[][]) :Atom[] {
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

export interface SelectedRow {
    row :number;
    forceFocus :boolean;
}
