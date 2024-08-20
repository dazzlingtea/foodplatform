import React, { useState } from 'react';
import styles from './ReviewForm.module.scss';
import Rating from '@mui/material/Rating';

// 해시태그를 백엔드에서 기대하는 Enum으로 매핑
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

// 해시태그 변환 함수
const convertToEnumHashtags = (selectedKeywords) => {
  return selectedKeywords.map(keyword => hashtagMapping[keyword]);
};

const ReviewForm = ({ onSubmit, reservationId, customerId, storeImg }) => {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [rating, setRating] = useState(0);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeywordClick = (keyword) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    );
    console.log(`Selected Keyword: ${hashtagMapping[keyword]} (${keyword})`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 변환된 해시태그 배열 생성
    const convertedHashtags = convertToEnumHashtags(selectedKeywords);

    const reviewData = {
      reservationId: reservationId,
      customerId: customerId,
      storeImg: storeImg,
      reviewScore: rating,
      reviewImg: image,
      reviewContent: content,
      hashtags: convertedHashtags, // Enum 형태로 변환된 해시태그
    };

    try {
      const response = await fetch('/review/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        console.log('Review saved successfully!');
        setImage(null);
        setContent('');
        setSelectedKeywords([]);
        setRating(0);
      } else {
        console.error('Failed to save review');
      }
    } catch (error) {
      console.error('Error occurred while saving review:', error);
    }
  };

  return (
    <div className={styles.reviewForm}>
    <div className={styles.reviewCard}>
      <form className={styles.reviewForm} onSubmit={handleSubmit}>
        {/* 별점 입력 섹션 */}
        <div className={styles.formGroup}>
          <p className={styles.title}>가게에 별점을 매겨주세요!</p>
          <Rating
            name="store-rating"
            size="large"
            value={rating}
            onChange={(event, newRating) => {
              setRating(newRating);
              console.log(`Selected Rating: ${newRating}`);
            }}
          />
        </div>

        {/* 키워드 선택 섹션 */}
        <div className={styles.keywordSection}>
          <p className={styles.title}>이 가게에 어울리는 키워드를 선택해주세요!</p>
          <div className={styles.keywordContainer}>
            {Object.keys(hashtagMapping).map((keyword) => (
              <span
                key={keyword}
                className={`${styles.keyword} ${selectedKeywords.includes(keyword) ? styles.selectedKeyword : ''}`}
                onClick={() => handleKeywordClick(keyword)}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* 사진 업로드 섹션 */}
        <div className={styles.formGroup}>
          <label htmlFor="image" className={styles.title}>사진 업로드</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.fileInput}
          />
          {image && <img src={image} alt="미리보기" className={styles.previewImage} />}
        </div>

        {/* 리뷰 내용 입력 섹션 */}
        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.title}>리뷰 내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textarea}
            placeholder="내용을 입력하세요!"
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>리뷰 작성</button>
      </form>
    </div>
    </div>
  );
};

export default ReviewForm;
