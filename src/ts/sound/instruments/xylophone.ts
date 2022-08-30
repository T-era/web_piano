// 木琴

export default function xylophone(i :number, freq :number) :number {
    return Math.sin(i * freq) * Math.pow(100 / (100+i), 1);
}
xylophone.title = 'Xylophone';
