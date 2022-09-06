import { useCallback, useMemo } from 'react';
import { keyboardShiftWidth, scoreButtonWidth, ScoreItem, scoreSheetRowHeight } from '../base';
import { Model } from '../viewmodels';
import { ScoreModel } from '../viewmodels/ScoreModel';

import './ScoreSheetCell.scss';

function fillColor(distance :number) :string {
    const f = Math.floor;
    const d = distance + 1
    const r = 255 - f(0 / d);
    const g = 255 - 30 - f(158 / d);
    const b = 255 - 20 - f(150 / d);
    return `rgba(${r},${g},${b},1)`
}

interface Props {
    model :Model;
    scoreModel :ScoreModel;
    scoreContents :ScoreItem[][];
    rowAt :number;
    levelAt :number;
}
// fill: #f45; 255 68 85

function seekDistanceFromStart(scoreContents :ScoreItem[][], level :number, row :number) {
    let distance = 0;
    let r = row;
    while (scoreContents[r][level] === ScoreItem.Continue) {
        r --;
        distance ++;
    }
    return distance;
}

export default function ScoreSheetCell({model, scoreModel, scoreContents, levelAt, rowAt} :Props) {
    const itemAt = scoreContents[rowAt][levelAt];
    const classNameMain = itemAt === ScoreItem.None
        ? 'empty'
        : 'fill';
    const distance = seekDistanceFromStart(scoreContents, levelAt, rowAt);
    const isContinueItem = itemAt === ScoreItem.Continue;
    const onClick = useCallback(() => scoreModel.putASoundAt(rowAt, levelAt, false),
        [scoreModel, rowAt, levelAt]);
    const memoResult = useMemo(() => (
        <>
            <rect
                x={keyboardShiftWidth + scoreButtonWidth * levelAt + 1}
                y={rowAt * scoreSheetRowHeight + 1}
                width={scoreButtonWidth - 2}
                height={scoreSheetRowHeight - 2}
                className={`cell ${classNameMain}`}
                fill={fillColor(distance)}
                onClick={onClick}/>
            { isContinueItem
                ? <path d={`M${keyboardShiftWidth + (levelAt+0.5) * scoreButtonWidth} ${rowAt * scoreSheetRowHeight - 5}
                    l 0 10`} stroke='blue' />
                : undefined }
        </>
    ), [itemAt, distance]);
    return memoResult;
}
