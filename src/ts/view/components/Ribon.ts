import { createDom } from "./html_tags";

interface RibonMenuItem {
    title :HTMLElement;
    contents :HTMLElement;
    refreshContents :() => void;
}
interface RibonMenuParams {
    parentDom: HTMLElement;
    menuItems :RibonMenuItem[];
    ribonClass?:string[];
}
export default function RibonMenu(params :RibonMenuParams) {
    const { parentDom, menuItems, ribonClass = [] } = params;
    const ribonDiv = createDom('div', {
        classNames: ['ribon', ...ribonClass],
        parent: parentDom,
    });
    parentDom.appendChild(ribonDiv);

    let ribonHeaderDiv = createDom('div', {
        classNames: ['ribon_header'],
        parent: ribonDiv,
    });

    createDom('hr', {
        parent: ribonDiv,
    });

    let ribonContentDiv = createDom('div', {
        classNames: ['ribon_content'],
        parent: ribonDiv,
    });

    for (let item of params.menuItems) {
        showItemsAsMenuPair(item, ribonHeaderDiv, ribonContentDiv, params.menuItems);
    }
    selectMenuItem(params.menuItems[0], params.menuItems);
}
function showItemsAsMenuPair(item :RibonMenuItem, ribonHeaderDiv :HTMLDivElement, ribonContentDiv :HTMLDivElement, menuItems :RibonMenuItem[]) {
    item.title.classList.add('ribon_header_item');
    ribonHeaderDiv.appendChild(item.title);
    ribonContentDiv.appendChild(item.contents);
    item.title.removeAttribute('hidden');
    item.title.addEventListener('click',  () => {
        selectMenuItem(item, menuItems);
        item.refreshContents();
    });
}
function selectMenuItem(selected :RibonMenuItem, menuItems :RibonMenuItem[]) {
    for (let anotherItem of menuItems) {
        anotherItem.contents.setAttribute('hidden', 'hidden');
        anotherItem.title.classList.remove('ribon_selected');
    }
    selected.contents.removeAttribute('hidden');
    selected.title.classList.add('ribon_selected');

}
