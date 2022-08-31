import { keyboardShiftWidth, octaveWidth, scoreButtonWidth, ScoreItem, scoreSheetRowHeight, scoreSideButtonWidth } from '../base';

import './ScoreSheet.scss';
import ScoreSheetRow from './ScoreSheetRow';

const xList = range(0, 48, (a) => a+1);

function range<T>(from :T, to :T, f :(t:T)=>T) :T[] {
    let ret = [];
    for (let i = from; i <= to; i = f(i)) {
        ret.push(i);
    }
    return ret;
}
interface Props {
    scoreContents :ScoreItem[][];
    selectedScoreRow :number;
    onPlayingChord :(levels :number[])=>void;
    onPutASoundAt :(row :number, level :number)=>void;
    onRowSelected :(row :number)=>void;
}
export default function ScoreSheet(props :Props) {
    const rowCount = props.scoreContents.length;
    const svgHeight = rowCount * scoreSheetRowHeight;
    const yList = range(0, rowCount, (y) => y + 1);
    return (<>
        <svg xmlns='http://www.w3.org/2000/svg'
            viewBox={`0 0 ${keyboardShiftWidth * 2 + octaveWidth * 4} ${svgHeight}`}
            width={keyboardShiftWidth * 2 + octaveWidth * 4}
            height={svgHeight}
            style={{width: keyboardShiftWidth * 2 + octaveWidth * 4, height: svgHeight}}>
            <g>
                { xList.map((x) => 
                    <line key={x} x1={keyboardShiftWidth + scoreButtonWidth * x} y1={0} x2={keyboardShiftWidth + scoreButtonWidth * x} y2={svgHeight} className="vertical" />
                )}
                { yList.map((y) =>
                    <line key={`v${scoreSheetRowHeight * y}`} x1={keyboardShiftWidth} x2={keyboardShiftWidth+octaveWidth*4} y1={scoreSheetRowHeight * y} y2={scoreSheetRowHeight * y} className="horizontal" />
                )}
            </g>
            { props.scoreContents.map((scoreRow, i) => 
                <ScoreSheetRow key={`ssr${i}`}
                    scoreContents={props.scoreContents}
                    rowAt={i}
                    isSelectedRow={i == props.selectedScoreRow}
                    onRowSelected={props.onRowSelected}
                    onPlayingChord={props.onPlayingChord}
                    onPutASoundAt={props.onPutASoundAt} />
            )}
        </svg>
    </>);
}