// ギターっぽい
const n = 10000;
function temp(i :number, freq :number) :number {
    return (
        Math.sin(i * freq) *.2
        + Math.sin(i*freq*2)*.2
        + Math.sin(i*freq*3)*.2
        + Math.sin(i*freq*4)*.2
        + Math.sin(i*freq*5)*.05
        + Math.sin(i*freq*6)*.05
        + Math.sin(i*freq*7)*.05
        + Math.sin(i*freq*8)*.05)
        * Math.cos(i * freq * 13)
        * Math.cos(i * freq * 1)
   * n / (n+i);
}
temp.gain = [1,0];
temp.title = 'Guiter';
export const guiter = temp;
