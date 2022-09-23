import { audioContext } from "../../base";

// 木琴
export default function xylophone(i :number, freq :number) :number {
    return Math.sin(i * freq)
        * Math.pow(100 / (100+i), 1); // 硬い音を急速に減衰させると木琴っぽい？
}
xylophone.title = 'Xylophone';
xylophone.gain = [1,0];