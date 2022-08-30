import { Instrument } from './instruments';

const channels = 1;

export interface Atom {
    start :number;
    level :number;
    length :number;
}
export default class Player {
    context :AudioContext = new window.AudioContext();
    beatSec :number;
	buffer :AudioBuffer;

    constructor(totalLen :number, beatSec :number) {
        const sampleRate = this.context.sampleRate;
        const frameCount = sampleRate * beatSec * totalLen;
        this.beatSec = beatSec;
        this.buffer = this.context.createBuffer(channels, frameCount, sampleRate);
    }
    play(instrument :Instrument, level :number) {
        this.playChord(instrument, [level]);
    }
    playChord(instrument :Instrument, levels :number[]) {
        if (levels.length === 0) {
            return;
        }
        const sp = support(this.context, this.buffer.getChannelData(0), this.beatSec, instrument);
        sp.setBuffer(0, levels, 1);
		var source = this.context.createBufferSource();
		// AudioBufferSourceNodeにバッファを設定する
		source.buffer = this.buffer;

		source.connect(this.context.destination);
		// 再生
		source.start(0);
    }
    playMelody(instrument :Instrument, melody :Atom[], onEnded :()=>void):()=>void {
        if (melody.length === 0) {
            setTimeout(onEnded, 0);
            return ()=>{};
        }
        const sp = support(this.context, this.buffer.getChannelData(0), this.beatSec, instrument);
        melody.forEach((atom) => {
            sp.setBuffer(atom.start, [atom.level], atom.length);
        })
        var source = this.context.createBufferSource();
        source.onended = onEnded;
        source.buffer = this.buffer;
        source.connect(this.context.destination);
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
  