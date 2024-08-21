import React, {lazy, Suspense, useEffect, useState} from 'react';
import styles from './Modal.module.scss';
import {useModal} from "./ModalProvider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faTimes} from "@fortawesome/free-solid-svg-icons";
import ReactDOM from "react-dom";

// 동적 import => 필요한 시점에만 로드 가능 (성능 개선)
const EmailVerificationModal = lazy(() => import("./EmailVerificationModal"));
const PasswordResetModal = lazy(() => import("./PasswordResetModal"));
const ProductDetailModal = lazy(() => import('../product/ProductDetailModal'));
const CustomerReservationDetailModal = lazy(() => import("../customer/CustomerReservationDetailModal"));
const CancelReservationDetailModal = lazy(() => import("../customer/CancelReservationDetailModal"));
const StoreReservationDetailModal = lazy(() => import("../store/StoreReservationDetailModal"));
const AddProductAmountModal = lazy(() => import("../store/AddProductAmountModal"));
const ScheduleDetailModal = lazy(() => import("../store/ScheduleDetailModal"));
const CustomerReservationFilterModal = lazy(() => import("../customer/CustomerReservationFilterModal"));
const StoreReservationFilterModal = lazy(() => import("../store/StoreReservationFilterModal"));
const AddFavFoodModal = lazy(() => import("../customer/modal/AddFavFoodModal"));
const MyFavAreaEditModal = lazy(() => import("../customer/FavAreaEditModal"));
const CustomerIssueChattingModal = lazy(() => import("../../components/customer/issue/CustomerIssueChattingModal"));
const AdminIssueChattingModal = lazy(() => import("../../components/admin/issue/AdminIssueChattingModal"));
const AdminIssueReviewModal = lazy(() => import("../../components/admin/issue/AdminIssueReviewModal"));

const Modal = () => {
    const {modalState, closeModal} = useModal();
    const {isOpen, type, props} = modalState;
    const [customStyle, setCustomStyle] = useState({width: '100%'});
    const [customInnerContentStyle, setCustomInnerContentStyle] = useState({}); // 추가
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 400); // 추가

    useEffect(() => {
        const handleResize = () => {
            if (type === 'productDetail') {
                if (window.innerWidth <= 400) {
                    setCustomStyle({width: '100%'});
                } else {
                    setCustomStyle({width: '80%', height: '80%', margin: '140px auto'});
                }
            } else if (type === 'favAreaEdit') {
                if (window.innerWidth <= 400) {
                    setCustomStyle({width: '100%'});
                } else {
                    setCustomStyle({width: '750px'});
                }
            } else if (type === 'customerIssueChatting' || type === 'adminIssueChatting') {
                if(window.innerWidth <= 400) {
                    setCustomStyle({bottom: '0px', left: '0px', height: '70%', padding: '0'})
                }else{
                    setCustomStyle({bottom: '172px', left: '308px', height: '70%'})
                }
                setCustomInnerContentStyle({height: '764px', marginBottom: '50px', padding: '0'})
            } else {
                setCustomStyle({});
            }
            setIsMobile(window.innerWidth <= 400); // 추가
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [type]);

    //백드롭 스크롤 방지
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    let ModalComponent;

    switch (type) {
        case 'emailVerification': // 이메일 인증
            ModalComponent = EmailVerificationModal;
            break;
        case 'passwordReset': // 비밀번호 재설정
            ModalComponent = PasswordResetModal;
            break;
        case 'productDetail': // 상품 메인페이지 상품 상세조회
            ModalComponent = ProductDetailModal;
            break;
        case 'customerReservationDetail': // 소비자페에지 예약 상세조회
            ModalComponent = CustomerReservationDetailModal;
            break;
        case 'cancelReservationDetail': // 소비자페이지 예약 취소
            ModalComponent = CancelReservationDetailModal;
            break;
        case 'storeReservationDetail': // 가게페이지 예약 상세조회
            ModalComponent = StoreReservationDetailModal;
            break;
        case 'addProductAmount': // 가게페이지 상품 수량 추가
            ModalComponent = AddProductAmountModal;
            break;
        case 'scheduleDetail': // 가게페이지 스케줄 상세조회 및 수정
            ModalComponent = ScheduleDetailModal;
            break;
        case 'favAreaEdit': // 소비자페이지 선호지역 수정
            ModalComponent = MyFavAreaEditModal;
            break;
        case 'customerReservationFilter': // 소비자페이지 예약내역 필터
            ModalComponent = CustomerReservationFilterModal;
            break;
        case 'storeReservationFilter': // 가게페이지 예약내역 필터
            ModalComponent = StoreReservationFilterModal;
            break;
        case 'addFavFood':
            ModalComponent = AddFavFoodModal;
            break;
        case 'customerIssueChatting':
            ModalComponent = CustomerIssueChattingModal;
            break;
        case 'adminIssueChatting':
            ModalComponent = AdminIssueChattingModal;
            break;
        case 'adminIssueReview':
            ModalComponent = AdminIssueReviewModal;
            break;
        default:
            ModalComponent = null;
    }

    const handleClose = (e) => {

        if (type === 'customerIssueChatting' || type === 'adminIssueChatting') {
            alert("채팅방에서 나가시려면 '나가기' 버튼을 눌러주세요.");
            return;
        }
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return ReactDOM.createPortal(
        <div className={styles.modal} onClick={handleClose}>
            <div className={styles.modalContent}
                 style={type === 'productDetail' || 'favAreaEdit' || 'customerIssueChatting' || 'adminIssueChatting' ? customStyle : {}}
                 onClick={(e) => e.stopPropagation()}>
                <div className={styles.close}>
                    {((type === 'customerIssueChatting') || (type === 'adminIssueChatting')) ?
                        <span className={styles.customerSupportTitle}>customer support</span> :
                        <span><FontAwesomeIcon className={styles.closeBtn} onClick={closeModal} icon={faTimes}/></span>}
                </div>
                <div className={styles.modalInnerContent}
                     style={(type === 'customerIssueChatting' || 'adminIssueChatting') ? customInnerContentStyle : {}}>
                    {ModalComponent && (
                        <Suspense fallback={<div>Loading...</div>}>
                            <ModalComponent {...props}/>
                        </Suspense>
                    )}
                </div>
                <div className={styles.modalFooter}>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default Modal;