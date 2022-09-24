import { SvgAbstract } from "./svg_abstract";

const NS_SVG = 'http://www.w3.org/2000/svg'

export class SvgG extends SvgAbstract<SVGGElement> {
    constructor(
        classNames :string[] = [],
        attributes :{[name :string] :string} = {},
        isHiddden :boolean = false) {
        super('g', classNames, attributes, isHiddden);
    }
}
