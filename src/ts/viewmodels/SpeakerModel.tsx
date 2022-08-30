import { makeASound, playAllMelody, ScoreItem, SelectedRow, State } from "../base"
import { all } from "../sound/instruments";

export class PlaySuspender {
    fToSuspend :()=>void;
    constructor(fToSuspend :()=>void) {
        this.fToSuspend = fToSuspend;
    }
}

export class SpeakerModel {
    private readonly playSuspenderState :State<PlaySuspender|null>;
    private readonly instrumentName :string;
    private readonly beatSpeed :number;
    private readonly scoreContents :ScoreItem[][];
    private readonly selectedScoreRow :SelectedRow;

    constructor(
        playSuspender :State<PlaySuspender|null>,
        scoreContents :ScoreItem[][],
        selectedScoreRow :SelectedRow,
        instrumentName :string,
        beatSpeed :number) {
        this.playSuspenderState = playSuspender;
        this.scoreContents = scoreContents;
        this.selectedScoreRow = selectedScoreRow;
        this.instrumentName = instrumentName;
        this.beatSpeed = beatSpeed;
    }
 
    makeASoundChord(levels :number[]) {
        const instrumentName = this.instrumentName;

        const instrument = all[instrumentName]
        makeASound(instrument, levels);
    }
    playAll() {
        const instrumentName = this.instrumentName;
        const scoreContents = this.scoreContents;
        const { set: setPlaySuspender } = this.playSuspenderState;
        const beatSpeed = this.beatSpeed;
        let fSuspend = playAllMelody(all[instrumentName], scoreContents, beatSpeed, () => {
            setPlaySuspender(null);
        });
        setPlaySuspender(new PlaySuspender(fSuspend));
    }
    playBelow() {
        const { row: selectedScoreRow } = this.selectedScoreRow;
        const instrumentName = this.instrumentName;
        const scoreContents = this.scoreContents;
        const { set: setPlaySuspender } = this.playSuspenderState;
        const beatSpeed = this.beatSpeed;
        const scoreBelow = scoreContents.slice(selectedScoreRow);
        let fSuspend = playAllMelody(all[instrumentName], scoreBelow, beatSpeed, () => {
            setPlaySuspender(null);
        });
        setPlaySuspender(new PlaySuspender(fSuspend));
    }
}