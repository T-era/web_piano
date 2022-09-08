import { Instrument } from './instruments';

const channels = 1;
const audioContext = new window.AudioContext();

export interface Atom {
    start :number;
    level :number;
    length :number;
}
export default class Player {
    beatSec :number;
	buffer :AudioBuffer;

    constructor(totalLen :number, beatSec :number) {
        const sampleRate = audioContext.sampleRate;
        const frameCount = sampleRate * beatSec * totalLen;
        this.beatSec = beatSec;
        this.buffer = audioContext.createBuffer(channels, frameCount, sampleRate);
    }
    play(instrument :Instrument, level :number) {
        this.playChord(instrument, [level]);
    }
    playChord(instrument :Instrument, levels :number[]) {
        if (levels.length === 0) {
            return;
        }
        const sp = support(audioContext, this.buffer.getChannelData(0), this.beatSec, instrument);
        sp.setBuffer(0, levels, 1);
		var source = audioContext.createBufferSource();
		// AudioBufferSourceNodeにバッファを設定する
		source.buffer = this.buffer;

		source.connect(audioContext.destination);
		// 再生
		source.start(0);
    }
    playMelody(instrument :Instrument, melody :Atom[], onEnded :()=>void):()=>void {
        if (melody.length === 0) {
            setTimeout(onEnded, 0);
            return ()=>{};
        }
        const sp = support(audioContext, this.buffer.getChannelData(0), this.beatSec, instrument);
        melody.forEach((atom) => {
            sp.setBuffer(atom.start, [atom.level], atom.length);
        })
        var source = audioContext.createBufferSource();
        source.onended = onEnded;
        source.buffer = this.buffer;
        source.connect(audioContext.destination);
        source.start(0);
        return () => source.stop();
    }
}


function support(context :AudioContext, bfArray :Float32Array, beatSec :number, instrument :Instrument) {
    let aLevel = Math.pow(2, 1.0 / 12);
    let singleBeat = beatSec * context.sampleRate
    return {
      context: context,
      beatSec: beatSec,
      setBuffer: function(start :number, levels :(number[]|null), beatCount :number) {
        var len = this.beatSec * beatCount * this.context.sampleRate;
        for (var i = 0; i < len; i ++) {
          if (levels != null) {
            var freqs = levels.map((level) => Math.pow(aLevel, level) * this.context.sampleRate * .0000003)
            let bf = freqs.reduce((sum, freq) => sum + instrument(i, freq, len), 0);
            bfArray[start * singleBeat + i] = (bfArray[start * singleBeat + i] || 0) + bf;
          }
        }
      },
    };
}
  