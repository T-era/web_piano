import { useMemo } from 'react';
import { scoreSheetRowHeight, scoreSideButtonWidth } from '../base';

const arrow_width = scoreSideButtonWidth - 2;
const arrow_height = scoreSheetRowHeight - 2;
const arrow_hor_height = arrow_height * 0.2;
const arrow_hor_width = arrow_width * 0.5;
const arrow_head_width = arrow_width * 0.5;
const arrow_head_height = arrow_height * 0.5;
interface CRMProps {
    isSelectedRow :boolean;
    y :number;
    onClick :()=>void;
}
export default function CurrentRowMark({isSelectedRow, y, onClick} :CRMProps) {
    const memoResult = useMemo(() => (
        <>
            <rect x={21} y={y+1} width={scoreSideButtonWidth-2} height={scoreSheetRowHeight-2} onClick={onClick} className='background' />
            { isSelectedRow
                && <path className="is_selected" onClick={onClick} width={scoreSideButtonWidth} height={scoreSheetRowHeight}
                    d={`M${scoreSideButtonWidth + 1} ${y + scoreSheetRowHeight / 2 - arrow_hor_height} l${arrow_hor_width} 0, 0 ${-(arrow_head_height-arrow_hor_height)}, ${arrow_head_width} ${arrow_head_height}, ${-arrow_head_width} ${arrow_head_height}, 0 ${-(arrow_head_height-arrow_hor_height)}, ${-arrow_hor_width} 0Z`} /> }
        </>
    ), [isSelectedRow]);
    return memoResult;
}
