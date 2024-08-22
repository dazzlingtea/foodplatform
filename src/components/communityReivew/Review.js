import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Review.module.scss'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid, faHeart as faHeartRegular } from "@fortawesome/free-solid-svg-icons";

const hashtagMapping = {
  '✨ 특별한 메뉴가 있어요': 'SPECIAL_MENU',
  '🌿 채식 메뉴가 있어요': 'VEGETARIAN_MENU',
  '🍱 메뉴 구성이 알차요': 'GOOD_MENU_COMBINATION',
  '🪙 가성비 좋아요': 'GOOD_VALUE',
  '🥬 재료가 신선해요': 'FRESH_INGREDIENTS',
  '👍 음식이 맛있어요': 'TASTY_FOOD',
  '😆 직원이 친절해요': 'FRIENDLY_STAFF',
  '🫶 재방문 하고 싶어요': 'WANT_TO_REVISIT',
  '🫧 매장이 청결해요': 'CLEAN_STORE',
  '🍽️ 포장 상태가 좋아요': 'GOOD_PACKAGING',
  '🚀 빠르게 수령했어요': 'FAST_SERVICE',
  '🤩 음식 퀄리티가 좋아요': 'HIGH_QUALITY_FOOD',
  '🥣 편하게 먹기 좋아요': 'EASY_TO_EAT',
  '🔥 따뜻하게 먹었어요': 'HOT_FOOD',
  '🍀 의외의 발견': 'PLEASANT_SURPRISE',
};

const Review = ({ profilePic, name, reviewImage, reviewText, store, storeAddress, hashtags }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className={styles.reviewCommunity}>
      <div className={styles.review}>
        <div className={styles.reviewHeader}>
          <img src={profilePic} alt={`${name}'s profile`} className={styles.profilePic} />
          <div className={styles.reviewerInfo}>
            <h3 className={styles.reviewerName}>{name}</h3>
          </div>
        </div>
        <img src={reviewImage} alt="Review" className={styles.reviewImage} />
      
        <div className={styles.hash}>
          <div className={styles.hashtags}>
            {hashtags && hashtags.length > 0 && hashtags.map((hashtag, index) => (
              <span key={index} className={styles.hashtag}>
                {Object.keys(hashtagMapping).find(key => hashtagMapping[key] === hashtag) || hashtag}
              </span>
            ))}
          </div>
        </div>

        <p className={styles.reviewText}>{reviewText}</p>
      </div>

      <div className={styles.storeInfo}>
        <div className={styles.storeDetail}>
          <div className={styles.storeName}>{store}</div>
          <div className={styles.storeAddress}>{storeAddress}</div>
        </div>
        <FontAwesomeIcon 
          icon={isFavorited ? faHeartSolid : faHeartRegular} 
          className={`${styles.favoriteIcon} ${isFavorited ? styles.favorited : styles.notFavorited}`} 
          onClick={handleFavoriteClick} 
        />
      </div>
    </div>
  );
};

Review.propTypes = {
  profilePic: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  reviewImage: PropTypes.string.isRequired,
  reviewText: PropTypes.string.isRequired,
  store: PropTypes.string.isRequired,
  storeAddress: PropTypes.string.isRequired,
  hashtags: PropTypes.arrayOf(PropTypes.string)
};

export default Review;
