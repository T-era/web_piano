// ピアノはムリである。諦めた
const n = 10000;
export default function piano(i :number, freq :number) :number {
    return (
        Math.sin(i * freq) *.4
        + Math.sin(i*freq*2)*.2
        + Math.sin(i*freq*3)*.1
        + Math.sin(i*freq*4)*.2
        + Math.sin(i*freq*5)*.025
        + Math.sin(i*freq*6)*.025
        + Math.sin(i*freq*7)*.025
        + Math.sin(i*freq*8)*.025)
        * Math.cos(i * freq * 2)
        * Math.cos(i * freq * 4)
   * n / (n+i);
}
piano.title = '謎';
piano.gain = [1,0];

