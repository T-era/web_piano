import { SvgG } from "./svg_g";
import { SvgSvg } from "./svg_svg";

const NS_SVG = 'http://www.w3.org/2000/svg'

interface HasElm {
    elm :SVGElement;
}
export class SvgAbstract<T extends SVGElement> {
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
