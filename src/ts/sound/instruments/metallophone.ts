// 鉄琴

export default function metallophone(i :number, freq :number) :number {
    return (
        Math.sin(i * freq) *.7
        + Math.sin(i*freq*8)*.15
        + Math.sin(i*freq*32)*.15)
   * 800 / (800+i);
}
metallophone.title = 'Metallophone';
metallophone.gain = [1,0];

