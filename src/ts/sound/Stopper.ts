import { audioContext } from "../base";
import { bufferLengthSec } from "./Player";

export class Stopper {
    private readonly audioBufferSource :AudioBufferSourceNode;
    private readonly fadeoutGainNode :GainNode;
    private _isAlive :boolean = true;
    private timer :NodeJS.Timeout;
    constructor(audioBufferSource :AudioBufferSourceNode, fadeoutGainNode :GainNode) {
        this.audioBufferSource = audioBufferSource;
        this.fadeoutGainNode = fadeoutGainNode;
        this.timer = setTimeout(()=> this._isAlive = false, bufferLengthSec * 1000)
    }
    stop() {
        this._isAlive = false;
        this.fadeoutGainNode.gain.setValueCurveAtTime(
            [1,0], audioContext.currentTime, .1);
        this.audioBufferSource.stop(audioContext.currentTime + .2);
        clearTimeout(this.timer);
    }
    get isAlive() {
        return this._isAlive; 
    }
}
