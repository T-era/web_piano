import { Instrument } from "./instruments";
import { aLevel, audioContext } from "../base";

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
const lengthSec = 10;
const sampleRate = audioContext.sampleRate;

// 位置音階分の音源データ
// コンストラクタ評価完了時にはまだ音源はなにもない状態です。
// コンストラクタの後、バックグラウンドで順次lengthSec秒分用意します(数秒かかってしまうため)
export class Player {
    private readonly level :number;
    private readonly audioBuffer : AudioBuffer;
    private readonly gain :number[];
    private _stopper?:Stopper;

    constructor(instrument :Instrument, level :number) {
        this.level = level;
        this.audioBuffer = new AudioBuffer({
            length: lengthSec * sampleRate, sampleRate
        });
        writeBuffer(this.audioBuffer, level, lengthSec, sampleRate, instrument);
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
        this._stopper = stopper;
        return stopper;
    }
    get stopper() :Stopper|undefined {
        return this._stopper;
    }
}

/**
 * バッファに音階ごとの波形データを設定します。
 * 時間がかかる処理なので、１秒分ごとに分割して波形生成します。
 */
function writeBuffer(buffer :AudioBuffer, level :number, lengthSec :number, sampleRate :number, instrument :Instrument) {
    const freq = Math.pow(aLevel, level) * sampleRate * (1/(2**22));
    setTimeout(() => recursiveWriteBuffer(0), 0);

    function recursiveWriteBuffer(sec :number) {
        // 一部ブラウザ(firefox, safari?)のための、バッファからの取り直し
        // (最初に再生したタイミングの波形データで、次からも再生されてしまう。
        // バッファから取り直せば、最初はブツ切れでも次に再生するときには最後まで再生できる)
        const bfArray = buffer.getChannelData(0);
        for (let j = 0; j < sampleRate; j ++) {
            const i = sec * sampleRate + j;
            bfArray[i] = instrument(i, freq)
                / freq / 10;  // 音階ごとの音量調整(高い音が比較的煩く感じる問題のワークアラウンド)
        }
        if (sec < lengthSec) {
            setTimeout(() => recursiveWriteBuffer(sec + 1), 0);
        }
    }
}

export class Stopper {
    private readonly audioBufferSource :AudioBufferSourceNode;
    private readonly fadeoutGainNode :GainNode;
    constructor(audioBufferSource :AudioBufferSourceNode, fadeoutGainNode :GainNode) {
        this.audioBufferSource = audioBufferSource;
        this.fadeoutGainNode = fadeoutGainNode;
    }
    stop() {
        this.fadeoutGainNode.gain.setValueCurveAtTime(
            [1,0], audioContext.currentTime, .1);
        this.audioBufferSource.stop(audioContext.currentTime + .2);
    }
}
