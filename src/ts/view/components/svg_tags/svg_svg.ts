import { SvgAbstract } from "./svg_abstract";

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
