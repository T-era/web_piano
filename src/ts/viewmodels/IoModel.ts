import { atomsFromScores, ScoreItem, scoresFromMelody, State } from "../base"
import lsio from "../io/LocalStorageIo";

export class IoModel {
    private readonly title :State<string>;
    private readonly saveDataTitles :State<string[]>
    private readonly scoreContents :State<ScoreItem[][]>;
    private readonly instrumentName :State<string>;
    private readonly beatSpeed :State<number>;

    constructor(title :State<string>,
        saveDataTitles :State<string[]>,
        scoreContents :State<ScoreItem[][]>,
        instrumentName :State<string>,
        beatSpeed :State<number>) {
        this.title = title;
        this.saveDataTitles = saveDataTitles;
        this.scoreContents = scoreContents;
        this.instrumentName = instrumentName;
        this.beatSpeed = beatSpeed;
    }
    save() {
        const { value: title } = this.title;
        const { value: scoreContents } = this.scoreContents;
        const { value: instrumentName } = this.instrumentName;
        const { value: beatSpeed } = this.beatSpeed;
        const { set: setSaveDataTitles } = this.saveDataTitles;
        lsio.save(title, {
            melody: atomsFromScores(scoreContents),
            instrumentName: instrumentName,
            beatSpeed: beatSpeed,
        });
        setSaveDataTitles(lsio.fileNames);
    }
    load(title :string) {
        const { set: setTitle } = this.title;
        const { set: setScoreContents } = this.scoreContents;
        const { set: setInstrumentName } = this.instrumentName;
        const { set: setBeatSpeed } = this.beatSpeed;

        const loadedData = lsio.load(title);
        if (loadedData !== null) {
            setTitle(title);
            setScoreContents(scoresFromMelody(loadedData.melody));
            setInstrumentName(loadedData.instrumentName);
            setBeatSpeed(loadedData.beatSpeed);
        }
    }
}