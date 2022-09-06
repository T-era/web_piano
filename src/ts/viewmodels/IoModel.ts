import { atomsFromScores, ScoreItem, scoresFromMelody, State } from "../base"
import lsio from "../io/LocalStorageIo";
import { SaveData } from "../io/util";

export class IoModel {
    readonly title :State<string>;
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
    save() :void {
        const { value: title } = this.title;
        const { set: setSaveDataTitles } = this.saveDataTitles;

        lsio.save(title, this.export());
        setSaveDataTitles(lsio.fileNames);
    }
    load(title :string) {
        const { set: setTitle } = this.title;

        const loadedData = lsio.load(title);
        if (loadedData !== null) {
            setTitle(title);
            this.import(loadedData);
        }
    }
    export() :SaveData {
        const { value: scoreContents } = this.scoreContents;
        const { value: instrumentName } = this.instrumentName;
        const { value: beatSpeed } = this.beatSpeed;
        return {
            melody: atomsFromScores(scoreContents),
            instrumentName: instrumentName,
            beatSpeed: beatSpeed,
        }
    }
    import(saveData :SaveData) :void {
        const { set: setScoreContents } = this.scoreContents;
        const { set: setInstrumentName } = this.instrumentName;
        const { set: setBeatSpeed } = this.beatSpeed;
        setScoreContents(scoresFromMelody(saveData.melody));
        setInstrumentName(saveData.instrumentName);
        setBeatSpeed(saveData.beatSpeed);
    }
}