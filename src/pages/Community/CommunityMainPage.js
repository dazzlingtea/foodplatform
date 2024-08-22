import xReact, {useEffect, useState} from 'react';
import styles from './CommunityMainPage.module.scss';
import {extractArea, getRefreshToken, getToken} from "../../utils/authUtil";
import { useNavigate } from "react-router-dom";
import useHistory from 'react-router-dom';


import _ from 'lodash';

const defaultReviews = [
    {
        profilePic: 'https://via.placeholder.com/50',
        name: 'customerId',
        reviewImage: 'https://via.placeholder.com/300',
        reviewText: '처음 마셔보는 차를 설명과 함께 마셔서 좋은 경험이었어요 홍시랑 먹는 산딸기막국수도 새롭고 맛있었어요 또 오고싶은 곳입니다Highly recommend it.',
        store: 'Sunny Cafe',
        storeAddress: '123 Green Street, Newtown',
        storeImage: '/mnt/data/C37C4DC6-F223-46FB-B43D-B7B25EE26AF7.png',  // Assuming this is the store image you uploaded
        favorites: true,
    },
    {
        profilePic: 'https://via.placeholder.com/50',
        name: 'Jane customerId',
        reviewImage: 'https://via.placeholder.com/300',
        reviewText: 'Not bad, but could be improved.',
        store: 'Cafe Delight',
        storeAddress: '456 Blue Avenue, Uptown',
        storeImage: '/your/path/to/anotherStoreImage.png',  // Replace with correct path
        favorites: false,
    },
    {
        profilePic: 'https://via.placeholder.com/50',
        name: 'customerId',
        reviewImage: 'https://via.placeholder.com/300',
        reviewText: '처음 마셔보는 차를 설명과 함께 마셔서 좋은 경험이었어요 홍시랑 먹는 산딸기막국수도 새롭고 맛있었어요 또 오고싶은 곳입니다Highly recommend it.',
        store: 'Sunny Cafe',
        storeAddress: '123 Green Street, Newtown',
        storeImage: '/mnt/data/C37C4DC6-F223-46FB-B43D-B7B25EE26AF7.png',  // Assuming this is the store image you uploaded
        favorites: true,
    },
    {
        profilePic: 'https://via.placeholder.com/50',
        name: 'Jane customerId',
        reviewImage: 'https://via.placeholder.com/300',
        reviewText: 'Not bad, but could be improved.',
        store: 'Cafe Delight',
        storeAddress: '456 Blue Avenue, Uptown',
        storeImage: '/your/path/to/anotherStoreImage.png',  // Replace with correct path
        favorites: false,
    },
    // 추가적인 더미 리뷰 데이터
];

const CommunityMainPage = ({ treesPlanted, topGroups, stores, users, reviews = [], latestReviews, review }) => {
    const navigate = useNavigate();
    const [enableReview, setEnableReview] = useState([]);
    const [reviewsData, setReviewsData] = useState([]);
    const [pendingReviews, setPendingReviews] = useState([]); // 리뷰 내용이 없는 구매완료건

    // API로부터 리뷰 데이터 fetch
    useEffect(() => {
        // 비회원도 열람가능하나, 리뷰 등록하러 가기는 로그인 하여 서비스 이용하기 버튼으로 바뀜
        const fetchReviews = async () => {
            try {
                const response = await fetch('/review/findEnableWritingReview', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + getToken(),
                        'refreshToken' : getRefreshToken()
                    }
                }); // 실제 API 엔드포인트로 변경
                const data = await response.json();

                console.log("get my reviews data fetch !!!! :", data);

                setReviewsData(data);
                checkEnableReview(data);

            } catch (error) {
                console.error('Failed to fetch reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    // 리뷰가 작성되어야 하는지 확인하는 함수
    const checkEnableReview = (reviews) => {
        const pendingReviews = reviews.filter(review =>
            !review.reviewScore ||
            !review.reviewImage ||
            !review.reviewContent ||
            (!review.hashtags && review.hashtags.length < 3)
        );
        setEnableReview(pendingReviews);
    };

    useEffect(() => {
        checkEnableReview(reviewsData);

    }, [reviewsData]);

    // 리뷰 페이지 버튼 클릭 핸들러
    const handleReviewPageButtonClick = () => {
        navigate('/reviewCommunity');
    };

    // 리뷰 작성 폼 버튼 클릭 핸들러
    const handleWriteReviewButtonClick = (reservationId) => {
        navigate(`/reviewForm?r=${reservationId}`);
    };

    let userArea = extractArea();

    return (
        <div className={styles.container}>
            {/* Header Section */}
            <section className={styles.highSection}>
                <h1>우리의 리뷰가 </h1>
                <div className={styles.highlights}></div>
                <strong>나무가 되어</strong>
                <h2>지구를 살려요!</h2>

            </section>

            {/* Tree Planting Section */}
            <section className={styles.treePlanting}>
                <h2>🌳 {userArea}에서 심어진 나무</h2>
                <div className={styles.seoulMap}></div>
                <div className={styles.treeInfo}>
                    <div className={styles.treeStats}>
                        <div className={styles.statItem}>

                            {/*동네 내부에 해당 하는 리뷰 하나 = 나무 한그루 */}
                            <span className={styles.statNumber}>{reviews.length}</span>
                            <span className={styles.statLabel}>그루</span>
                        </div>

                        {/*동네 내부에 리뷰가 작성된 상점 */}
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>{stores} 2</span>
                            <span className={styles.statLabel}>STORES</span>
                        </div>

                        {/*동네 내부의 상점에서 작성한 리뷰의 총 사용자 수 (중복 포함 안됨)*/}
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>{users} 3</span>
                            <span className={styles.statLabel}>USERS</span>
                        </div>

                        {/*동네에서 작성된 총 리뷰 수 */}
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>{reviews.length}</span>
                            <span className={styles.statLabel}>REVIEWS</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Reviews Section */}
            <section className={styles.latestReviews}>
                <h3>요즘 뜨는 {userArea} 최신 리뷰</h3>
                <div className={styles.reviewGrid}>
                    {reviews && reviews.map((review, index) => (
                        <div key={index} className={styles.reviewItem}>
                            <img src={review.storeImage} alt={review.store} className={styles.storeImage}/>
                            <div className={styles.overlay}>
                                <p className={styles.storeName}>#{review.store}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className={styles.viewMoreButton} onClick={handleReviewPageButtonClick}>{userArea} 최신리뷰 보러가기!
                </button>
            </section>

            {/* Review Writing Section */}
            <section className={styles.writeReview}>
                <h4>작성해야 할 리뷰 </h4>
                <div className={styles.pendingReviewsList}>
                    {reviewsData && reviewsData.map((review, index) => (
                        <div key={index} className={styles.pendingReviewItem}>
                            <img src={review.storeImage} alt={review.storeName} className={styles.pendingStoreImage}/>
                            <div className={styles.pendingReviewDetails}>
                                <h4>{review.storeName}</h4>
                                <p> 픽업완료 시간 : ({review.pickedUpAt})</p>
                                <p>{review.price} 원</p>
                                <p>위치 : {review.address}</p>

                                {/* 리뷰 작성 여부에 따라 다른 텍스트와 동작을 부여 */}
                                {review.reviewId ? (
                                    <button
                                        className={styles.writeReviewButton}
                                        disabled
                                    >
                                        리뷰 작성 완료
                                    </button>
                                ) : (
                                    <button
                                        className={styles.writeReviewButton}
                                        onClick={() => handleWriteReviewButtonClick(review.reservationId)}
                                    >
                                        리뷰 작성하러 가기
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CommunityMainPage;