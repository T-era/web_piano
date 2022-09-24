import { scoreButtonWidth, scoreSheetRowHeight } from "../../base";
import { SvgG, SvgPath, SvgRect } from "../components/svg_tags";

type HowToStop = ()=>void;
interface Props {
    y :number;
    playARow :()=>HowToStop;
}

class MouseSoundHandler {
    private readonly playARow :()=>HowToStop
    private howToStop ?:HowToStop;
    constructor(playARow :()=>HowToStop) {
        this.playARow = playARow;
    }
    start() {
        this.howToStop = this.playARow();
    }
    stop() {
        if (this.howToStop) this.howToStop();
        this.howToStop = undefined;
    }
}
export class NoteMark extends SvgG {
    constructor({y, playARow} :Props) {
        super()
        const mouseSoundHandler = new MouseSoundHandler(playARow);
        this.add(
            new SvgRect(
                {x:0, y: y + 1, width: scoreButtonWidth - 1, height: scoreSheetRowHeight - 2},
                ['note_mark', 'background']
            ).addListener(
                'mouseenter', () => { mouseSoundHandler.start() }
            ).addListener(
                'mouseleave', () => { mouseSoundHandler.stop() }
            )
        );
        this.add(
            new SvgPath(
                { d: `m9.56 ${y+2.6}c-1.7 -0.8,-3.1 -2.6,-3.1 -2.6v1.2,9.5c-0.5 -0.2,-1.1 -0.2,-1.8 -0.1,-1.5 0.3,-2.6 1.5,-2.3 2.7,0.2 1.2,1.7 1.9,3.2 1.6,1.4 -0.3,2.3 -1.2,2.4 -2.3v-8.3c4.4 0.5,3.7 3.6,3.4 4.5,2.5 -2.8,1.2 -4.8,-1.7 -6.3Z` },
                ['note_mark']
            )
        );
    }
}
