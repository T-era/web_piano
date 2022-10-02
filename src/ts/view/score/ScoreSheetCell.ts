import { keyboardShiftWidth, scoreButtonWidth, ScoreItem, scoreSheetRowHeight } from '../../base';
import { ScoreModel } from '../../model/score';
import { SvgG, SvgPath, SvgRect } from '../components/svg_tags';

function fillColor(distance :number) :string {
    const f = Math.floor;
    const d = distance + 1
    const r = 255 - f(0 / d);
    const g = 255 - 30 - f(158 / d);
    const b = 255 - 20 - f(150 / d);
    return `rgba(${r},${g},${b},1)`
}

interface Props {
    rowAt :number;
    levelAt :number;
    onClicked :(row:number, level:number) => void;
}

function seekDistanceFromStart(scoreContents :ReadonlyArray<ReadonlyArray<ScoreItem>>, row :number, level :number) :number {
    let distance = 0;
    let r = row;
    while (scoreContents[r] && scoreContents[r][level] === ScoreItem.Continue) {
        r --;
        distance ++;
    }
    return distance;
}

export class ScoreSheetCell extends SvgG {
    private readonly scoreModel :ScoreModel;
    private readonly rowAt :number;
    private readonly levelAt :number;
    private readonly svgRect :SvgRect;
    private readonly svgPathContinuation :SvgPath;
    
    constructor(scoreModel :ScoreModel, {levelAt, rowAt, onClicked} :Props) {
        super();
        this.scoreModel = scoreModel;
        const cellRect = new SvgRect(
            {
                x: keyboardShiftWidth + scoreButtonWidth * levelAt + 1,
                y: rowAt * scoreSheetRowHeight + 1,
                width: scoreButtonWidth - 2,
                height: scoreSheetRowHeight - 2,
            },
            ['cell'],
            {
                fill: 'none'
            }).addTo(this)
            .addListener('click', () => onClicked(rowAt, levelAt));

        const continuePath = new SvgPath(
            {
                d: `M${keyboardShiftWidth + (levelAt+0.5) * scoreButtonWidth} ${rowAt * scoreSheetRowHeight - 5}l 0 10`
            },
            ['continuation_mark'],
            {},
            true).addTo(this);

        this.rowAt = rowAt;
        this.levelAt = levelAt;
        this.svgRect = cellRect;
        this.svgPathContinuation = continuePath;
        scoreModel.addScoreItemListener(rowAt, levelAt, () => {
            this.reshow();
        })
        scoreModel.addHighlightListener(rowAt, levelAt, (highlighted :boolean) => {
            const rawRect = this.svgRect.elm;
            if (highlighted) {
                rawRect.classList.add('highlighted');
            } else {
                rawRect.classList.remove('highlighted');
            }
        })
        this.reshow();
    }

    reshow() {
        const copy = this.scoreModel.scoreItemCopy;
        const itemAt = copy[this.rowAt][this.levelAt];
        if (itemAt !== undefined) {
            const rawRect = this.svgRect.elm;
            if (itemAt === ScoreItem.None) {
                rawRect.classList.add('empty');
                rawRect.classList.remove('fill');
                rawRect.setAttribute('fill', 'white');
            } else {
                rawRect.classList.add('fill');
                rawRect.classList.remove('empty');
                const distance = seekDistanceFromStart(copy, this.rowAt, this.levelAt);
                const color = fillColor(distance);
                rawRect.setAttribute('fill', color);
            }

            const isContinueItem = itemAt === ScoreItem.Continue;
            if (isContinueItem) {
                this.svgPathContinuation.show();
            } else {
                this.svgPathContinuation.hide();
            }
        }
    }
}
