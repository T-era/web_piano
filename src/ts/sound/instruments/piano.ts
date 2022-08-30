// ピアノ

export default function piano(i :number, freq :number, len:number) :number {
    return (
            Math.sin(i * freq) *.4
            + Math.sin(i*freq*2)*.3
            + Math.sin(i*freq*4)*.2
            + Math.sin(i*freq*8)*.1)
        * 1600 / (1600+i)
        * (1-Math.pow(i+1, -16));
}
piano.title = 'Piano';
