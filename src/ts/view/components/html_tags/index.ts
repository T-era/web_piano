interface Props {
    id?:string;
    classNames?:string[];
    attributes?:{[name :string] :string};
    isHidden?:boolean;
    parent?:HTMLElement;
}

export function createDom<K extends keyof HTMLElementTagNameMap>(tagName :K, props?:Props)
        : HTMLElementTagNameMap[K] {
    const { id, parent, classNames = [], attributes = {}, isHidden = false } = props || {};
    const ret = document.createElement(tagName);
    if (id) {
        ret.id = id;
    }
    ret.classList.add(...classNames);
    for (let key in attributes) {
        ret.setAttribute(key, attributes[key]);
    }
    if (isHidden) {
        ret.setAttribute('hidden', 'hidden');
    }
    if (parent) {
        parent.appendChild(ret);
    }
    return ret;
}