import { SvgAbstract } from "./svg_abstract";

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
