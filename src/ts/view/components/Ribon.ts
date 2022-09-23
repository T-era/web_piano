interface RibonMenuItem {
    title :HTMLElement;
    contents :HTMLElement;
    refreshContents :() => void;
}
interface RibonMenuParams {
    parentDom: HTMLElement;
    menuItems :RibonMenuItem[];
    ribonClass?:string;
}
export default function RibonMenu(params :RibonMenuParams) {
    let ribonDiv = document.createElement('div');
    ribonDiv.classList.add('ribon')
    if (params.ribonClass) ribonDiv.classList.add(params.ribonClass);
    params.parentDom.appendChild(ribonDiv);

    let ribonHeaderDiv = document.createElement('div');
    ribonHeaderDiv.classList.add('ribon_header');
    ribonDiv.appendChild(ribonHeaderDiv);

    let ribonHr = document.createElement('hr');
    ribonDiv.appendChild(ribonHr);

    let ribonContentDiv = document.createElement('div');
    ribonContentDiv.classList.add('ribon_content');
    ribonDiv.appendChild(ribonContentDiv);

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
