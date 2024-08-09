import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useModal } from "../../pages/common/ModalProvider";
import styles from "./FoodNav.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slick-theme.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { FAVORITESTORE_URL } from '../../config/host-config';
import { getUserEmail, getToken, getRefreshToken } from "../../utils/authUtil"; // <-- 이 줄 추가

// 🌿 랜덤 가게 리스트 생성
const getRandomStores = (stores, count) => {
  const shuffled = [...stores].sort(() => 0.5 - Math.random()); // stores 배열을 랜덤으로 섞기
  return shuffled.slice(0, count); // 원하는 개수의 가게를 선택
};

// 🌿 카테고리 문자열에서 실제 foodType만 추출하는 함수
const extractFoodType = (category) => {
  if (category && typeof category === 'string') {
    const match = category.match(/\(foodType=(.*?)\)/);
    return match ? match[1] : category;
  }
  return '';
};

// 하트 상태를 토글하고 서버에 저장하는 함수
const toggleFavorite = async (storeId, customerId) => {
  try {
    const response = await fetch(`${FAVORITESTORE_URL}/${storeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken(),
        'refreshToken': getRefreshToken()
      },
      body: JSON.stringify({ customerId }),
    });

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
    } else {
      const text = await response.text();
      console.error('⚠️Unexpected response format:', text);
    }
  } catch (error) {
    console.error('⚠️Error toggling:', error);
  }
};

// 사용자의 모든 찜 상태 조회
const fetchFavorites = async (customerId, setFavorites) => {
  try {
    const response = await fetch(`${FAVORITESTORE_URL}/${customerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken(),
        'refreshToken': getRefreshToken()
      },
    });

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      const favorites = data.reduce((acc, store) => {
        acc[store.storeId] = true;
        return acc;
      }, {});
      setFavorites(favorites);
    } else {
      const text = await response.text();
      console.error('⚠️Unexpected response format:', text);
    }
  } catch (error) {
    console.error('⚠️Error fetching:', error);
  }
};

const FoodNav = ({ selectedCategory, stores }) => {
  const [randomStores, setRandomStores] = useState([]);
  const [favorites, setFavorites] = useState({});
  const { openModal } = useModal();

  // customerId 더미값
  const customerId = getUserEmail();

  useEffect(() => {
    setRandomStores(getRandomStores(stores, 5));
  }, [stores]);

  useEffect(() => {
    if (customerId) {
      fetchFavorites(customerId, setFavorites);
    }
  }, [customerId]);

  const handleClick = (store) => {
    openModal('productDetail', { productDetail: store });
  };

  const handleFavoriteClick = async (storeId) => {
    try {
      await toggleFavorite(storeId, customerId);

      setFavorites(prevFavorites => ({
        ...prevFavorites,
        [storeId]: !prevFavorites[storeId]
      }));
    } catch (error) {
      console.error('⚠️Error toggling:', error);
    }
  };

  const settings = (slidesToShow) => ({
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    centerMode: false,
    centerPadding: '0',
    arrows: true,
    responsive: [
      {
        breakpoint: 400,
        settings: {
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '10%',
        },
      },
    ],
  });

  return (
    <>
      {/* 내가 찜한 가게 리스트 */}
      <div className={styles.list}>
        <h2 className={styles.title}>나의 단골 가게</h2>
        <Slider {...settings(4)} className={styles.slider}>
          {stores.map((store, index) => (
            <div
              key={index}
              onClick={() => handleClick(store)}
              className={`${styles.storeItem} ${store.productCnt === 1 ? styles['low-stock'] : ''}`}
            >
              <div 
                className={`${styles.heartIcon} ${favorites[store.storeId] ? styles.favorited : styles.notFavorited}`} 
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavoriteClick(store.storeId);
                }}
              >
                <FontAwesomeIcon 
                  icon={favorites[store.storeId] ? faHeartSolid : faHeartRegular} 
                />
              </div>
              <img src={store.storeImg} alt={store.storeName} />
              {store.productCnt === 1 && <div className={styles.overlay}>SOLD OUT</div>}
              <p className={styles.storeName}>{store.storeName}</p>
              <span className={styles.storePrice}>{store.price}</span>
              <span className={styles.productCnt}>수량 : {store.productCnt}</span>
            </div>
          ))}
        </Slider>
      </div>

      {/* 주변 가게 리스트 */}
      <div className={styles.list}>
        <h2 className={styles.title}>000동 근처 가게</h2>
        <Slider {...settings(4)} className={styles.slider}>
          {stores.map((store, index) => (
            <div
              key={index}
              onClick={() => handleClick(store)}
              className={`${styles.storeItem} ${store.productCnt === 1 ? styles['low-stock'] : ''}`}
            >
              <div 
                className={`${styles.heartIcon} ${favorites[store.storeId] ? styles.favorited : styles.notFavorited}`} 
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavoriteClick(store.storeId);
                }}
              >
                <FontAwesomeIcon 
                  icon={favorites[store.storeId] ? faHeartSolid : faHeartRegular} 
                />
              </div>
              <img src={store.storeImg} alt={store.storeName} />
              {store.productCnt === 1 && <div className={styles.overlay}>SOLD OUT</div>}
              <p className={styles.storeName}>{store.storeName}</p>
              <span className={styles.storePrice}>{store.price}</span>
              <span className={styles.productCnt}>수량 : {store.productCnt}</span>
            </div>
          ))}
        </Slider>
      </div>

      {/* 추천 가게 리스트(랜덤) */}
      <div className={styles.list}>
        <h2 className={styles.title}>이웃들의 추천 가게</h2>
        <Slider {...settings(5)} className={styles.slider}>
          {randomStores.map((store, index) => (
            <div
              key={index}
              onClick={() => handleClick(store)}
              className={`${styles.storeItem} ${store.productCnt === 1 ? styles['low-stock'] : ''}`}
            >
              <div 
                className={`${styles.heartIcon} ${favorites[store.storeId] ? styles.favorited : styles.notFavorited}`} 
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavoriteClick(store.storeId);
                }}
              >
                <FontAwesomeIcon 
                  icon={favorites[store.storeId] ? faHeartSolid : faHeartRegular} 
                />
              </div>
              <img src={store.storeImg} alt={store.storeName} className={styles.image} />
              <span className={styles.category}>{extractFoodType(store.category)}</span>
              <p className={styles.storeName}>{store.storeName}</p>
              <span className={styles.storePrice}>{store.price}</span>
              <span className={styles.productCnt}>수량 : {store.productCnt}</span>
              {store.productCnt === 1 && <div className={styles.overlay}>SOLD OUT</div>}
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default FoodNav;
