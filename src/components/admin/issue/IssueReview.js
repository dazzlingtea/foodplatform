import React from 'react';
import styles from './IssueReview.module.scss';

// 포맷 함수 추가
const formatDate = (dateTimeStr) => {
    const inputDateTime = new Date(dateTimeStr);
    const today = new Date();

    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const endOfToday = new Date(today.setHours(23, 59, 59, 999));

    const formatNumber = (number) => number.toString().padStart(2, '0');

    const year = inputDateTime.getFullYear();
    const month = formatNumber(inputDateTime.getMonth() + 1);
    const day = formatNumber(inputDateTime.getDate());
    const hours = formatNumber(inputDateTime.getHours());
    const minutes = formatNumber(inputDateTime.getMinutes());

    return `${year}년 ${month}월 ${day}일   ${hours}시 ${minutes}분`;

};

const IssueReview = ({issueDetail, reservationDetail, issuePhotos}) => {

    return (
        <div className={styles.issueReviewContainer}>
            <div className={styles.title}>문의 내역</div>
            <div className={styles.issueBox}>
                <h2>issue ID: {issueDetail.issueId}</h2>
                <div>고객 ID: {issueDetail.customerId}</div>
                <div>문의 유형: {issueDetail.issueCategory}</div>
                <div>문의 등록일: {formatDate(issueDetail.makeIssueAt)}</div>
                <div>상태: {issueDetail.status}</div>
                {
                    issueDetail.issueText.length === 0 ?
                        <div>채팅 내역 없음</div> :
                        <div className={styles.issueChattingBox}>
                        <div>
                            채팅 내역:
                        </div>
                        <div className={styles.chattingText}>
                            {issueDetail.issueText}
                        </div>
                    </div>
                }
            </div>

            <div className={styles.title}>예약 내역</div>
            <div className={styles.reservationBox}>
                <div>예약 ID: {reservationDetail.reservationId}</div>
                <div>상품 ID: {reservationDetail.productId}</div>
                <div>예약 상태: {reservationDetail.status}</div>
                <div>상호명: {reservationDetail.storeName}</div>

            </div>

            {
                issuePhotos.length !== 0 ?
                    (<div>
                            <div className={styles.title}>이슈 사진</div>
                            <div className={styles.photoGallery}>
                                    {issuePhotos.map((photo) => (
                                        <div key={photo.issuePhotoId} className={styles.photoItem}>
                                                <img
                                                    src={photo.issuePhoto}
                                                    alt={`Issue photo`}
                                                    className={styles.photoImage}
                                                />
                                        </div>
                                    ))}
                            </div>
                    </div>) : null
            }

        </div>
    );
};

export default IssueReview;