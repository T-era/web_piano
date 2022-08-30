export function flatten<T>(dArray :T[][]) :T[] {
    let res :T[] = [];
    for (let aArray of dArray) {
        res = res.concat(aArray);
    }
    return res;
}

// 非破壊変更でリストの一要素を変えます。変更点以外は、極力元のリストを使います
export function replaceAt<T>(dArray :T[][], x :number, y :number, newValue :T) :T[][] {
    return dArray.map((row, _y) => {
        if (y === _y) {
            return row.map((item, _x) => {
                if (x === _x) {
                    return newValue;
                } else {
                    return item;
                }
            })
        } else {
            return row;
        }
    });
}
