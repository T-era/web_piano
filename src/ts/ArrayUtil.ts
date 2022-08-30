export function flatten<T>(dArray :T[][]) :T[] {
    let res :T[] = [];
    for (let aArray of dArray) {
        res = res.concat(aArray);
    }
    return res;
}
export function replaceAt<T>(dArray :T[][], x :number, y :number, newValue :T) :T[][] {
    const ret = deepCopy(dArray);
    ret[y][x] = newValue;
    return ret;
}
export function deepCopy<T>(dArray :T[][]) :T[][] {
    return dArray.map((l) => l.slice()).slice();
}