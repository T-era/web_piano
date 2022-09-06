import { useCallback, useMemo } from 'react';
import { levelsFromScores, octaveWidth, scoreButtonWidth, ScoreItem, scoreSheetRowHeight } from '../base';
import { Model, SpeakerModel } from '../viewmodels';
import { ScoreModel } from '../viewmodels/ScoreModel';
import CurrentRowMark from './CurrentRowMark';
import NoteMark from './NoteMark';
import ScoreSheetCell from './ScoreSheetCell';

import './ScoreSheetRow.scss';

interface Props {
    scoreContents :ScoreItem[][];
    rowAt :number;
    isSelectedRow :boolean;
    onRowSelected :(row :number)=>void;
    speakerModel :SpeakerModel;
    model :Model;
    scoreModel :ScoreModel;
}
export default function ScoreSheetRow({model, scoreModel, speakerModel, scoreContents, rowAt, isSelectedRow, onRowSelected, } :Props) {
    const lineAt = scoreContents[rowAt];
    const onClickNoteMark = useCallback(() => {
        const levels = levelsFromScores(lineAt);
        speakerModel.makeASoundChord(levels);
    }, [lineAt, speakerModel]);

    const memoResult = useMemo(() => (
        <g>
            <rect x={0} y={rowAt * scoreSheetRowHeight}
                width={scoreButtonWidth * 2+octaveWidth*4}
                height={scoreSheetRowHeight}
                visibility={isSelectedRow ? 'visible' : 'hidden'}
                className='is_selected' />
            <CurrentRowMark isSelectedRow={isSelectedRow} y={rowAt * scoreSheetRowHeight}
                onClick={() => onRowSelected(rowAt)} />
            <NoteMark y={rowAt * scoreSheetRowHeight}
                onClicked={onClickNoteMark}/>
            {lineAt.map((item, x) => 
                <ScoreSheetCell
                    key={x} rowAt={rowAt} levelAt={x}
                    scoreContents={scoreContents}
                    model={model}
                    scoreModel={scoreModel} />
            )}
        </g>
    ), [model, speakerModel, lineAt, isSelectedRow]);
    return memoResult;
}
