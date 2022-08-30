// オルガン

export default function organ(i :number, freq :number, len:number) :number {
    return (
            Math.sin(i * freq) *.6
             + Math.sin(i*freq*4)*.3
              + Math.sin(i*freq*3)*.1)
        * 800 / (800+i)
        * Math.pow(Math.sin(Math.PI * i / len), 0.5);
}
organ.title = 'Organ';
