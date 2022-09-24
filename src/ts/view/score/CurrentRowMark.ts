import { scoreSheetRowHeight, scoreSideButtonWidth } from '../../base';
import { SvgG, SvgPath, SvgRect } from '../components/svg_tags';

const arrow_width = scoreSideButtonWidth - 2;
const arrow_height = scoreSheetRowHeight - 2;
const arrow_hor_height = arrow_height * 0.2;

interface Props {
    y :number;
    onClick :()=>void;
}
export default class CurrentRowMark extends SvgG {
    private rowMark :SvgPath;
    constructor({ y, onClick } :Props) {
        super();
        const rect = new SvgRect(
            {
                x: 21,
                y: y + 1,
                width: arrow_width,
                height: arrow_height,
            },
            ['background'],)
            .addTo(this)
            .addListener('click', onClick);

        this.rowMark = new SvgPath(
            {
                d: `M21 ${y + scoreSheetRowHeight / 2 - arrow_hor_height}l9 0,0 -3.9,9 6.5,-9 6.5,0 -3.9,-9 0Z`,
            },
            ['is_selected'],
            {},
            true)
            .addTo(this)
            .addListener('click', onClick);
    }
    show(): this {
        this.rowMark.show();
        return this;
    }
    hide(): this {
        this.rowMark.hide();
        return this;
    }
}
