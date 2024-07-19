import React, {createContext, useContext, useState} from 'react';
import Modal from "./Modal";

const ModalContext = createContext();

const ModalProvider = ({children}) => {

    const [modalState, setModalState] =
        useState({isOpen: false, type: '', props: {}});

    const openModal = (type, props = {}) => {
        setModalState({isOpen: true, type, props});
    };

    const closeModal = () => {
        setModalState({isOpen: false, type: '', props: {}});
    };

    return (
        <>
            <ModalContext.Provider value = {{modalState, openModal, closeModal}}>
                {children}
                {modalState.isOpen && <Modal/>}
            </ModalContext.Provider>
        </>
    );
};

// ModalContext를 쉽게 사용 가능 {modalState, openModal, closeModal}
export const useModal = () => useContext(ModalContext);

// 컴포넌트 내보내기
export default ModalProvider;