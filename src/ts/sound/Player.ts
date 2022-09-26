import { Instrument } from "./instruments";
import { audioContext } from "../base";
import { Stopper } from "./Stopper";
import { bufferData } from "./BufferData";

// 各音階の音源データを用意します。
export class PlayerSet {
    private readonly players :Player[];

    constructor(instrument :Instrument, levels :number = 48) {
        this.players = new Array(levels).fill(0).map((_, level) => 
            new Player(instrument, level)
        )
    }
    getPlayer(level :number) :Player {
        return this.players[level];
    }
}

// AudioBufferは、MDNによると
// 「一般的には 45 秒未満の、断片的な音声を保持するために設計されています」
// https://developer.mozilla.org/ja/docs/Web/API/AudioBuffer
export const bufferLengthSec = 10;
const sampleRate = audioContext.sampleRate;

// 位置音階分の音源データ
// コンストラクタ評価完了時にはまだ音源はなにもない状態です。
// コンストラクタの後、バックグラウンドで順次lengthSec秒分用意します(数秒かかってしまうため)
export class Player {
    private readonly level :number;
    private readonly audioBuffer : AudioBuffer;
    private readonly gain :number[];
    private _stopper :Stopper[] = [];

    constructor(instrument :Instrument, level :number) {
        this.level = level;
        this.audioBuffer = bufferData(instrument, level, bufferLengthSec);
        this.gain = instrument.gain;
    }
    play() :Stopper {
        const audioBufferSource = new AudioBufferSourceNode(audioContext, {
            buffer: this.audioBuffer,
            loop: false,
        });
        const gainNode = new GainNode(audioContext);
        const fadeoutGainNode = new GainNode(audioContext);
        gainNode.gain.setValueCurveAtTime(
             this.gain, audioContext.currentTime, 10);
        audioBufferSource.connect(
            gainNode
        ).connect(
            fadeoutGainNode
        ).connect(
            audioContext.destination
        );
        audioBufferSource.start(audioContext.currentTime);
        const stopper = new Stopper(audioBufferSource, fadeoutGainNode);

        this.addStopper(stopper);
        return stopper;
    }
    playSec(sec :number) {
        const stopper = this.play();
        setTimeout(() => stopper.stop(), sec * 1000);
    }
    addStopper(stopper :Stopper) {
        this._stopper = this._stopper.filter(item => item.isAlive)
            .concat([stopper]);
    }
    get stopper() :Stopper[] {
        this._stopper = this._stopper.filter(item => item.isAlive);
        return this._stopper;
    }
}
