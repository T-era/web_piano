import { KeyboardEvent } from "react";
import { replaceAt } from "../ArrayUtil";
import { KeyboardToneShift, ScoreItem, SelectedRow, State } from "../base"
import { Model, newScoreRow } from "./OverallModel";

export class KeyListener {
    private readonly scoreContentsState :State<ScoreItem[][]>;
    private readonly model :Model;
    private readonly kts :KeyboardToneShift;
    private readonly selectedScoreRow :SelectedRow;

    constructor(
        model :Model,
        scoreContents :State<ScoreItem[][]>,
        kts :KeyboardToneShift,
        selectedScoreRow :SelectedRow) {
        this.model = model;
        this.kts = kts;
        this.scoreContentsState = scoreContents;
        this.selectedScoreRow = selectedScoreRow;
    }
    keyboardEventHandler(e :KeyboardEvent) :void {
        this._keyboardEventHandlerEnter(e);
        this._keyboardEventHandlerKeyboard(e);
        this._keyboardEventHandlerSpace(e);
        this._keyboardEventHandlerArrow(e);
    }
    private _keyboardEventHandlerEnter(e :KeyboardEvent) :void {
        const { value: scoreContents, set: setScoreContents } = this.scoreContentsState;
        if (e.key === 'Enter') {
            const newSC = scoreContents.concat([newScoreRow()]);
            setScoreContents(newSC);
            if (! e.shiftKey) {
                this.model.setRowWithFocus({ row: newSC.length - 1, forceFocus: true });
            }
        }
    }
    private _keyboardEventHandlerArrow(e :KeyboardEvent) :void {
        const { row: selectedScoreRow} = this.selectedScoreRow;
        const { value: scoreContents } = this.scoreContentsState;
        if (e.key === 'ArrowUp') {
            if (selectedScoreRow === 0) {
                this.model.setRowWithFocus({ row: scoreContents.length - 1, forceFocus: true });
            } else {
                this.model.setRowWithFocus({ row: selectedScoreRow - 1, forceFocus: true });
            }
        } else if (e.key === 'ArrowDown') {
            if (selectedScoreRow === scoreContents.length - 1) {
                this.model.setRowWithFocus({ row: 0, forceFocus: true });
            } else {
                this.model.setRowWithFocus({ row: selectedScoreRow + 1, forceFocus: true });
            }
        }
    }
    private _keyboardEventHandlerKeyboard(e :KeyboardEvent) :void {
        const kts = this.kts;
        switch (e.key) {
            case 'a': this.model.onToneChanging(false); return;
            case 'l': this.model.onToneChanging(true); return;

            case 's': this.model.putASound(kts * 12 + 0); return;
            case 'e': this.model.putASound(kts * 12 + 1); return;
            case 'd': this.model.putASound(kts * 12 + 2); return;
            case 'r': this.model.putASound(kts * 12 + 3); return;
            case 'f': this.model.putASound(kts * 12 + 4); return;
            case 'g': this.model.putASound(kts * 12 + 5); return;
            case 'y': this.model.putASound(kts * 12 + 6); return;
            case 'h': this.model.putASound(kts * 12 + 7); return;
            case 'u': this.model.putASound(kts * 12 + 8); return;
            case 'j': this.model.putASound(kts * 12 + 9); return;
            case 'i': this.model.putASound(kts * 12 + 10); return;
            case 'k': this.model.putASound(kts * 12 + 11); return;
        }
    }
    private _keyboardEventHandlerSpace(e :KeyboardEvent) :void {
        const { value: scoreContents, set: setScoreContents } = this.scoreContentsState;
        const { row: selectedScoreRow } = this.selectedScoreRow;
        if (e.key === ' ') {
            const originRowNum = e.shiftKey ? selectedScoreRow - 1 : selectedScoreRow;
            const targetRowNum = e.shiftKey ? selectedScoreRow : selectedScoreRow + 1;

            if (originRowNum < 0) return;
            let modified = (targetRowNum >= scoreContents.length)
                ? scoreContents.concat([newScoreRow()])
                : scoreContents;
            scoreContents[originRowNum].forEach((item, x) => {
                if (item === ScoreItem.None) return;
                else modified = replaceAt(modified, x, targetRowNum, ScoreItem.Continue);
            })
            setScoreContents(modified);
        }
    }
}