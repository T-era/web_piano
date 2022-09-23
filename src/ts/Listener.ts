export class ActionChain<T, S> {
    private actions :((t :T)=>S)[] = [];

    add(action :(t :T)=>S) {
        this.actions.push(action);
    }
    fire(t :T) {
        this.actions.forEach(f => f(t));
    }
}
export class WithListener<T> {
    private _value :T;
    private listener :ActionChain<T, void> = new ActionChain();
    constructor(value :T) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
    set value(value :T) {
        this._value = value;
        this.listener.fire(value);
    }
    addListener(f :(n:T)=>void) {
        this.listener.add(f);
    }
    // 強制的にイベント発火させます。
    // _value を破壊的な変更をした場合などは、自動的にイベント発火しないため、こっちを使います。
    fireEvent() {
        this.listener.fire(this._value);
    }
}
