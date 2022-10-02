import { ActionChain, WithListener } from "../../Listener";
import { newScoreRow, ScoreItem } from "../../base";

export type Event<T> = (arg:T)=>void;
export type ScoreRow = ReadonlyArray<ScoreItem>;
export type ScoreItems = ReadonlyArray<ScoreRow>;

export interface Cell {
    scoreItem :WithListener<ScoreItem>;
    highlighted :WithListener<boolean>;
} 
export type ScoreItemsRef = ReadonlyArray<ReadonlyArray<Cell>>;

/** 譜面と譜面変更によるイベント発火を司ります。
 * 
 * 取り扱うイベントは以下3つ
 *  - 譜面全体の更新(ロードや行削除、中間行挿入など)
 *  - 行の末尾追加
 *  - 譜面1行1音階の変更
 * (譜面行操作は、大抵全体再代入になる。だから行は監視しない、)
 */ 
export class ScoreItemsCore extends WithListener<Cell[][]> {
    private readonly appendRowListener :ActionChain<void, void> = new ActionChain();

    addRefreshListener(listener :Event<ScoreItems>) {
        // 内部的に発生する Cell[][] のイベントを、ScoreItem[][] のイベントに読み替えてあげる
        const actualListener = (cells :Cell[][]) => listener(cells.map(
            cellRow => cellRow.map(
                cell => cell.scoreItem.value)));
        this.addListener(actualListener);
    }
    addAppendRowListener(listener :Event<void>) {
        this.appendRowListener.add(listener);
    }
    addScoreItemListenerAt(row :number, level :number, listener :Event<ScoreItem>) {
        this.value[row][level].scoreItem.addListener(listener);
    }
    addHighlightListenerAt(row :number, level :number, listener :Event<boolean>) {
        this.value[row][level].highlighted.addListener(listener);
    }
    appendNewRow() {
        this.value.push(convRow(newScoreRow()));
        this.appendRowListener.fire();
    }
    /**
     * 全値のコピー返します
     */
    get copy() :ScoreItem[][] {
        return this.value.map(
            row => row.map(
                item => item.scoreItem.value));
    }
    get ref() :ScoreItemsRef {
        return this.value;
    }
    getRowAt(row :number) :ScoreRow {
        return this.value[row].map(item => item.scoreItem.value);
    }
    getScoreItemAt(row :number, level :number) :ScoreItem {
        return this.value[row][level].scoreItem.value;
    }

    /**
     * 一箇所の音符を変えます。Continue の切り詰めなどは行いません。呼び出し側の責務です。
     */
    setScoreItemAt(row :number, level :number, scoreItem :ScoreItem) {
        this.value[row][level].scoreItem.value = scoreItem;
    }
    /**
     * 譜面全体の差し替えを行います。
     *
     * refreshイベントが発生する他、差し替えた譜面の行数分 AppendRow イベントが発生します。
     */
    setScoreItems(scoreItems :ScoreItem[][]) {
        this.value = scoreItems.map(
            row => row.map(
                item => {
                    return {
                        scoreItem: new WithListener(item),
                        highlighted: new WithListener(false),
                    };
                }));
        scoreItems.forEach(row => this.appendRowListener.fire());
    }
}

function convRow(row :ScoreItem[]) :Cell[] {
    return row.map(item => {
        return {
            scoreItem: new WithListener(item),
            highlighted: new WithListener(false),
        }
    });
}
