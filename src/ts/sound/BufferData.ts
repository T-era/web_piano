import { Instrument } from "./instruments";
import { aLevel, audioContext } from "../base";

export function bufferData(instrument :Instrument, level :number, bufferLengthSec :number) :AudioBuffer {
    const sampleRate = audioContext.sampleRate
    const audioBuffer = new AudioBuffer({
        length: bufferLengthSec * sampleRate, sampleRate
    })
    writeBuffer(audioBuffer, level, bufferLengthSec, sampleRate, instrument);

    return audioBuffer;
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
