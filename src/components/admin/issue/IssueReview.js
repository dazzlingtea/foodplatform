import React from 'react';
import styles from './IssueReview.module.scss';

const IssueReview = ({issueDetail, reservationDetail, issuePhotos}) => {

    return (
        <div className={styles.issueReviewContainer}>
            <div className={styles.title}>문의 내역</div>
            <div className={styles.issueBox}>
                <h2>issue ID: {issueDetail.issueId}</h2>
                <div>고객 id: {issueDetail.customerId}</div>
                <div>문의 유형: {issueDetail.issueCategory}</div>
                <div>문의 등록일: {issueDetail.makeIssueAt}</div>
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

            <div className={styles.lines}></div>

            <div className={styles.title}>예약 내역</div>
            <div className={styles.reservationBox}>
                <div>예약 id: {reservationDetail.reservationId}</div>
                <div>상품 id: {reservationDetail.productId}</div>
                <div>예약 상태: {reservationDetail.status}</div>
                <div>상호명: {reservationDetail.storeName}</div>

            </div>

            {
                issuePhotos.length !== 0 ?
                    (<div>
                            <div className={styles.lines}></div>
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