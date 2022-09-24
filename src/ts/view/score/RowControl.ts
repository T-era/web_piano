import { octaves, octaveWidth, scoreButtonWidth, scoreSheetRowHeight } from "../../base";
import { SvgCircle, SvgG, SvgLine, SvgPath, SvgRect } from "../components/svg_tags";

const cxAdd = scoreButtonWidth * 2.5 + octaveWidth * octaves;
const dcyAdd = 0;
const cxRemove = scoreButtonWidth * 3.5 + octaveWidth * octaves;
const dcyRemove = scoreSheetRowHeight / 2;
const r = scoreSheetRowHeight / 2 - 2;

interface Props {
    y :number;
}

export class AddPrevRowButton extends SvgG {
    constructor({y} :Props) {
        super();
        this.add(
            new SvgCircle(
                {
                    cx: cxAdd,
                    cy: y + dcyAdd,
                    r: r,
                },
                ['add_prev_row_circle']
            )
        ).add(
            new SvgLine(
                {
                    x1: cxAdd - r * .7,
                    x2: cxAdd + r * .7,
                    y1: y + dcyAdd,
                    y2: y + dcyAdd
                },
                ['add_prev_row_cross']
            )
        ).add(
            new SvgLine(
                {
                    x1: cxAdd,
                    x2: cxAdd,
                    y1: y + dcyAdd - r * .7,
                    y2: y + dcyAdd + r * .7
                },
                ['add_prev_row_cross']
            )
        )
    }
}

export class RemoveRowButton extends SvgG {
    constructor({y} :Props) {
        super();
        this.add(
            new SvgCircle(
                {
                    cx: cxRemove,
                    cy: y + dcyRemove,
                    r: r,
                },
                ['remove_row_circle']
            )
        ).add(
            new SvgLine(
                {
                    x1: cxRemove - r * .7,
                    x2: cxRemove + r * .7,
                    y1: y + dcyRemove,
                    y2: y + dcyRemove
                },
                ['remove_row_bar']
            )
        )
    }
}
