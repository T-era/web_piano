import { useMemo } from 'react';
import { levelsFromScores, octaveWidth, scoreButtonWidth, ScoreItem, scoreSheetRowHeight } from '../base';
import CurrentRowMark from './CurrentRowMark';
import NoteMark from './NoteMark';
import ScoreSheetCell from './ScoreSheetCell';

import './ScoreSheetRow.scss';

interface Props {
    scoreContents :ScoreItem[][];
    rowAt :number;
    isSelectedRow :boolean;
    onRowSelected :(row :number)=>void;
    onPlayingChord :(levels:number[])=>void;
    onPutASoundAt :(row :number, level :number)=>void;
}
export default function ScoreSheetRow({scoreContents, rowAt, isSelectedRow, onRowSelected, onPlayingChord, onPutASoundAt} :Props) {
    const lineAt = scoreContents[rowAt];
    const memoResult = useMemo(() => (
        <g>
            <rect x={0} y={rowAt * scoreSheetRowHeight}
                width={scoreButtonWidth * 2+octaveWidth*4}
                height={scoreSheetRowHeight}
                visibility={isSelectedRow ? 'visible' : 'hidden'}
                className='is_selected' />
            <CurrentRowMark isSelectedRow={isSelectedRow} y={rowAt * scoreSheetRowHeight}
                onClick={() => onRowSelected(rowAt)} />
            <NoteMark y={rowAt * scoreSheetRowHeight} onClicked={()=>{
                const levels = levelsFromScores(lineAt);
                onPlayingChord(levels);
            }}/>
            {lineAt.map((item, x) => 
                <ScoreSheetCell
                    key={x} rowAt={rowAt} levelAt={x}
                    scoreContents={scoreContents}
                    onClick={() => onPutASoundAt(rowAt, x)} />
            )}
        </g>
    ), [lineAt, isSelectedRow]);
    return memoResult;
}
