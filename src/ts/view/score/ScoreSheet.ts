import { keyboardShiftWidth, octaveWidth, scoreButtonWidth, scoreSheetRowHeight } from "../../base";
import { ScoreModel } from "../../model/score";
import { soundContext } from "../../sound";
import { SvgG, SvgLine } from "../components/svg_tags";
import { ScoreSheetRow } from "./ScoreSheetRow";

export class ScoreSheet {
    private readonly svg :SVGElement;
    private readonly gGrid :SvgG;
    private readonly scoresGrid :SvgG;
    private rowCount :number = 0;
    private readonly vertical :SvgLine[] = [];
    private readonly horizontal :SvgLine[] = [];
    private readonly rows :ScoreSheetRow[] = [];
    private readonly scoreModel :ScoreModel;

    constructor(scoreModel :ScoreModel) {
        this.scoreModel =scoreModel;
        scoreModel.addNewRowListener(() => {
            this.addNewRow();
        });
        scoreModel.addRefreshRowsListener(() => {
            this.rows.length = 0;
            this.horizontal.length = 1;
            const scoreGCopy = [].slice.apply(this.scoresGrid.elm.childNodes)
            scoreGCopy.forEach(elem => {
                this.scoresGrid.elm.removeChild(elem);
            })
            this.rowCount = 0;
        });
        this.svg = document.querySelector('svg#score_sheet') as SVGElement;
        const thisSvg = { elm :this.svg };
        this.gGrid = new SvgG().addTo(thisSvg);
        this.scoresGrid = new SvgG(['scores']).addTo(thisSvg);

        for (var x = 0; x <= 48; x ++) {
            const line = new SvgLine(
                {
                    x1: keyboardShiftWidth + scoreButtonWidth * x,
                    x2: keyboardShiftWidth + scoreButtonWidth * x,
                    y1: 0,
                    y2: 0,
                },
                ['vertical']).addTo(this.gGrid);
            this.vertical.push(line);
        }
        const hLine = horizontalLine(this.gGrid, 0);
        this.horizontal.push(hLine);

        this.fitupSvg();
    }

    private fitupSvg() {
        const svgWidth = keyboardShiftWidth * 2 + octaveWidth * 4;
        const svgHeight = this.rowCount * scoreSheetRowHeight;
        this.svg.setAttribute('viewPort', `0 0 ${svgWidth} ${svgHeight}`)
        this.svg.setAttribute('width', String(svgWidth));
        this.svg.setAttribute('height', String(svgHeight));
        this.svg.setAttribute('style', `width: ${svgWidth}px; height: ${svgHeight}px;`);
        this.vertical.forEach(line => line.elm.setAttribute('y2', String(svgHeight)))
    }
    addNewRow() {
        this.rows.push(new ScoreSheetRow(this.scoreModel, {
            parent: this.scoresGrid,
            rowAt: this.rowCount,
            soundContext: soundContext,
            rowAdding: (row) => this.scoreModel.control.insertARowBefore(row),  
            rowRemoving: (row) => this.scoreModel.control.remveRow(row)
        }));
        this.rowCount ++;
        const hLine = horizontalLine(this.gGrid, this.rowCount);
        this.horizontal.push(hLine);
        this.fitupSvg();
    }
    selectRowAt(rowAt :number) {
        this.rows[rowAt].select();
    }
}

function horizontalLine(parent :SvgG, rowCount :number) :SvgLine {
    return new SvgLine(
        {
            x1: keyboardShiftWidth,
            y1: scoreSheetRowHeight * rowCount,
            x2: keyboardShiftWidth + octaveWidth*4,
            y2: scoreSheetRowHeight * rowCount
        },
        ['horizontal']).addTo(parent);
}
