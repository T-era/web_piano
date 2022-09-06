import { CSSProperties,  ReactNode, useState } from "react";
import { wrap } from "../../base";

import './Ribon.scss';

// リボンメニューの内部データ
interface RibonItemModel {
    menuLabel :string,
    menuContent :ReactNode,
}

interface Props {
    menuItems :RibonItemModel[];
    overAllStyle?:CSSProperties
}

export default function RibonMenu(props: Props) {
    const selectedIndexState = wrap(useState(0));
    return (
        <div className='ribon' style={props.overAllStyle} >
            <div className='ribon_header' >
                {props.menuItems.map((menuItem, i)=>
                    <RibonHeaderItem key={i}
                        isSelected={selectedIndexState.value === i}
                        onSelected={() => selectedIndexState.set(i)}
                        label={menuItem.menuLabel} />)}
            </div>
            <hr/>
            <div className='ribon_content'>
                {props.menuItems.map((menuItem, i)=>
                    <RibonContentItem key={i}
                        isHidden={selectedIndexState.value !== i}
                        content={menuItem.menuContent} />)}
            </div>
        </div>
    );
}

interface RhiProps {
    onSelected :()=>void;
    label :string;
    isSelected :boolean;
}
function RibonHeaderItem({label, isSelected, onSelected} :RhiProps) {
    const cnSelected = isSelected ? 'ribon_selected' : 'ribon_unselected';
    return (
        <div className={`ribom_header_item ${cnSelected}`}
            onClick={onSelected}>
            {label}
        </div>
    );
}

interface RciProps {
    isHidden :boolean;
    content :ReactNode;
}
function RibonContentItem({isHidden, content} :RciProps) {
    const className = `ribon_content_item_wrapper ${isHidden ? 'hidden' : 'visible'}`
    return (
        <div className={className} >
            {content}
        </div>
    )
}
