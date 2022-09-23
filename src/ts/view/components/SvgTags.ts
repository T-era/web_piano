const NS_SVG = 'http://www.w3.org/2000/svg'

interface HasElm {
    elm :SVGElement;
}
class SvgAbstract<T extends SVGElement> {
    private _elm :T;
    get elm() :T {
        return this._elm;
    }
    constructor(tagname :string, classNames :string[], attributes :{[name :string] :string }, isHidden :boolean) {
        this._elm = document.createElementNS(NS_SVG, tagname) as T;
        this._elm.classList.add(...classNames);
        for (let key in attributes) {
            this._elm.setAttribute(key, attributes[key]);
        }
        this._elm.setAttribute('visibility', isHidden ? 'hidden' : 'visible');
    }
    addTo(parent :SvgSvg|SvgG|HasElm) :this {
        parent.elm.appendChild(this.elm);
        return this;
    }
    add<S extends SVGElement>(child :SvgAbstract<S>) :this {
        child.addTo(this);
        return this;
    }
    addAll<S extends SVGElement>(children :SvgAbstract<S>[]) :this {
        children.forEach(child=>child.addTo(this));
        return this;
    }
    
    addListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): this {
        this._elm.addEventListener(type, listener);
        return this;
    }
    show() :this {
        this._elm.setAttribute('visibility', 'visible');
        return this;
    }
    hide() :this {
        this._elm.setAttribute('visibility', 'hidden');
        return this;
    }
}
interface ViewBox {
    x1?:number;
    y1?:number;
    x2 :number;
    y2 :number;
}
export class SvgSvg extends SvgAbstract<SVGSVGElement> {
    constructor(
        {viewBox, id } :{ viewBox :ViewBox, id?:string },
        classNames :string[] = [],
        attributes :{[name :string] :string} = {},
        isHidden :boolean = false) {
        let { x1 = 0, y1 = 0, x2, y2 } = viewBox;
        super('svg', classNames, attributes, isHidden);
        this.elm.setAttribute('viewBox', `${x1} ${y1} ${x2} ${y2}`);
        if (id) {
            this.elm.id = id;
        }
    }
}
export class SvgG extends SvgAbstract<SVGGElement> {
    constructor(
        classNames :string[] = [],
        attributes :{[name :string] :string} = {},
        isHiddden :boolean = false) {
        super('g', classNames, attributes, isHiddden);
    }
}
export class SvgLine extends SvgAbstract<SVGLineElement> {
    constructor(
        {x1,y1,x2,y2} :{x1 :number, y1 :number, x2 :number, y2 :number},
        classNames :string[] = [],
        attributes :{[name :string] :string} = {},
        isHiddden :boolean = false) {
        super('line', classNames, attributes, isHiddden)
        this.elm.setAttribute('x1', String(x1));
        this.elm.setAttribute('y1', String(y1));
        this.elm.setAttribute('x2', String(x2));
        this.elm.setAttribute('y2', String(y2));
    }
}
export class SvgRect extends SvgAbstract<SVGRectElement> {
    constructor(
        {x,y,width,height} :{x :number, y :number, width :number, height :number},
        classNames :string[] = [],
        attributes :{[name :string] :string} = {},
        isHiddden :boolean = false) {
        super('rect', classNames, attributes, isHiddden);
        this.elm.setAttribute('x', String(x));
        this.elm.setAttribute('y', String(y));
        this.elm.setAttribute('width', String(width));
        this.elm.setAttribute('height', String(height));
    }
}
export class SvgPath extends SvgAbstract<SVGPathElement> {
    constructor(
        {d} :{d :string},
        classNames :string[] = [],
        attributes :{[name :string] :string} = {},
        isHiddden :boolean = false) {
        super('path', classNames, attributes, isHiddden);
        this.elm.setAttribute('d', d);
    }
}
export class SvgCircle extends SvgAbstract<SVGCircleElement> {
    constructor(
        { cx, cy, r } :{ cx :number, cy :number, r :number},
        classNames :string[] = [],
        attributes :{[name :string] :string} = {},
        isHidden :boolean = false) {
        super('circle', classNames, attributes, isHidden);
        this.elm.setAttribute('cx', String(cx));
        this.elm.setAttribute('cy', String(cy));
        this.elm.setAttribute('r', String(r));
    }
}
