import { ConsumerProps, createRef, JSXElementConstructor, ReactNode, RefObject, useState } from "react";
import Modal from "react-modal";

import { State } from "../base";
import { wrap } from "../base";

import './WithToolTip.scss';

Modal.setAppElement('#root');

interface Props {
    toolTipLabel :ReactNode;
    children :ReactNode;
    modalIsOpenState?:State<boolean>;
}
export default function WithToolTip({ modalIsOpenState, toolTipLabel, children } :Props) {
    const modalOpenState = modalIsOpenState || wrap(useState(false));
    const leftPosState = wrap(useState(0));
    const topPosState = wrap(useState(0));
    const buttonRef = createRef<HTMLDivElement>();
    const openModal = () => {
        const buttonLeftPos = buttonRef.current?.offsetLeft || 0;
        const buttonWidth = buttonRef.current?.offsetWidth || 0;
        const leftPos = buttonLeftPos + buttonWidth / 2;
        const buttonTopPos = buttonRef.current?.offsetTop || 0;
        const buttonHeight = buttonRef.current?.offsetHeight || 0;
        const topPos= buttonTopPos + buttonHeight;
        leftPosState.set(leftPos);
        topPosState.set(topPos);
        modalOpenState.set(true);
    };

    return (
        <>
            <div className='tooltip_label' onClick={openModal} ref={buttonRef}>{toolTipLabel}</div>
            <Modal isOpen={modalOpenState.value}
                style={
                    {
                        content: { left: leftPosState.value, top: topPosState.value },
                        overlay: { background: 'rgba(128,128,128,.5)' },
                    }
                }
                className='tooltip_content'
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                onRequestClose={() => modalOpenState.set(false)} >
                {children}
            </Modal>
        </>
    );
    }