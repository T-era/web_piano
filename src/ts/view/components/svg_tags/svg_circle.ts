import { SvgAbstract } from "./svg_abstract";

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
