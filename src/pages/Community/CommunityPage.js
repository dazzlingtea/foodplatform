// CommunityPage.js
import React from 'react';
import Review from '../../components/communityReivew/Review';
import styles from './CommunityPage.module.scss';

const reviews = [
  {
    profilePic: 'https://via.placeholder.com/50', 
    name: 'customerId',
    reviewImage: 'https://via.placeholder.com/300',
    reviewText: '처음 마셔보는 차를 설명과 함께 마셔서 좋은 경험이었어요 홍시랑 먹는 산딸기막국수도 새롭고 맛있었어요 또 오고싶은 곳입니다Highly recommend it.',
    store: 'Sunny Cafe',
    storeAddress: '123 Green Street, Newtown',
    favorites: true,
  },
  {
    profilePic: 'https://via.placeholder.com/50',
    name: 'Jane customerId',
    reviewImage: 'https://via.placeholder.com/300',
    reviewText: 'Not bad, but could be improved.',
    store: 'Sunny Cafe',
    storeAddress: '123 Green Street, Newtown',
    favorites: true,
  },
  // 추가적인 더미 리뷰 데이터
];

const CommunityPage = () => {
  return (
    <div className={styles.communityPage}>
      {reviews.map((review, index) => (
        <Review
          key={index}
          profilePic={review.profilePic}
          name={review.name}
          reviewImage={review.reviewImage}
          reviewText={review.reviewText}
          store={review.store}
          storeAddress={review.storeAddress}
        />
      ))}
    </div>
  );
};

export default CommunityPage;
