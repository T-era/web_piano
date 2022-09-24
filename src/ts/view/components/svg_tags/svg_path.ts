import { SvgAbstract } from "./svg_abstract";

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
