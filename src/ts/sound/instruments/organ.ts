// オルガン

export default function organ(i :number, freq :number) :number {
    return (
        Math.sin(i * freq) *.4
        + Math.sin(i*freq*2)*.3
        + Math.sin(i*freq*4)*.2
        + Math.sin(i*freq*8)*.1);
}
organ.title = 'Organ';
organ.gain = [1,0];