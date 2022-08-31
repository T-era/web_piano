import { createRef, ReactNode, useState } from "react";
import Modal from "react-modal";

import { State } from "../base";
import { wrap } from "../base";

import './MenuDetail.scss';

Modal.setAppElement('#root');


interface Props {
    menu: string;
    children :ReactNode;
    modalIsOpenState?:State<boolean>;
}
export default function MenuDetail({ modalIsOpenState, menu, children } :Props) {
    const modalOpenState = modalIsOpenState || wrap(useState(false));
    const leftPosState = wrap(useState(0));
    const buttonRef = createRef<HTMLDivElement>();
    const openModal = () => {
        const buttonLeftPos = buttonRef.current?.offsetLeft || 0;
        const buttonWidth = buttonRef.current?.offsetWidth || 0;
        const leftPos = buttonLeftPos + buttonWidth / 2;
        leftPosState.set(leftPos);
        modalOpenState.set(true);
    };

    return (
        <>
            <div className='menuitem' onClick={openModal} ref={buttonRef}>{menu}</div>
            <Modal isOpen={modalOpenState.value}
                style={{ content: { left: leftPosState.value }}}
                className='menu_dialog_contents'
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                onRequestClose={() => modalOpenState.set(false)} >
                {children}
            </Modal>
        </>
    );
    }