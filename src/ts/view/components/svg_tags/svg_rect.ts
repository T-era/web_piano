import { SvgAbstract } from "./svg_abstract";

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
