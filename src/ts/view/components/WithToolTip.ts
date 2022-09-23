// ラベル側に .tooltip_label クラスを指定します。
// ツールチップになる側に .tooltip_content クラスを指定します。
// またラベル側のDOM要素のプロパティ -tooltip_content を
// 設定して、ツールチップになる側のDOMのIDを指定します。
export const eventToolTipClose = 'close_tooltip_all';

export function initToolTip() {
    const toolTipLabelList = document.getElementsByClassName('tooltip_label');
    const modalBg = document.createElement('div');
    modalBg.classList.add('tooltip_background');
    modalBg.setAttribute('hidden', 'hidden');
    modalBg.addEventListener('click',  closeToolTip);
    document.addEventListener('close_tooltip_all', closeToolTip)
    document.getElementById('__background')?.appendChild(modalBg);
    Array.from(toolTipLabelList).map((ttl) => {
        const toolTipLabel = ttl as HTMLElement;
        const contentId = toolTipLabel.getAttribute('-tooltip_content');
        const toolTipContent = document.getElementById(contentId!);

        if (toolTipContent) {
            // ツールチップ内をクリックしたときに閉じてしまうのを防ぐ
            toolTipContent.addEventListener('click', (e) => e.stopPropagation());
            toolTipContent.setAttribute('hidden', 'hidden');
            toolTipLabel.addEventListener('click',  () => {
                toolTipContent.removeAttribute('hidden');
                modalBg.removeAttribute('hidden');
                // ラベルをもとに、ツールチップの位置を決定します。
                const buttonLeftPos = toolTipLabel.offsetLeft || 0;
                const buttonWidth = toolTipLabel.offsetWidth || 0;
                const leftPos = buttonLeftPos + buttonWidth / 2;
                const buttonTopPos = toolTipLabel.offsetTop || 0;
                const buttonHeight = toolTipLabel.offsetHeight || 0;
                const topPos= buttonTopPos + buttonHeight;
                toolTipContent.style.left = `${leftPos}px`;
                toolTipContent.style.top = `${topPos}px`;
            });

            modalBg.appendChild(toolTipContent);
        }
    });
    function closeToolTip() {
        modalBg.setAttribute('hidden', 'hidden');
        modalBg.childNodes.forEach(child => (child as HTMLElement).setAttribute('hidden', 'hidden'))
    }
}