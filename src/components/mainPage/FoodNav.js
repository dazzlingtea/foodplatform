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
import { FAVORITESTORE_URL, STORELISTS_URL } from '../../config/host-config';
import { getUserEmail, getToken, getRefreshToken } from "../../utils/authUtil";
import { DEFAULT_IMG, imgErrorHandler } from "../../utils/error";
import FavAreaSelector from "./FavAreaSelector";

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

// 나의 단골 가게 리스트를 가져오는 함수
const fetchFavoriteAndOrderStores = async (customerId, setStores) => {
  try {
    const response = await fetch(`${STORELISTS_URL}/fav`, {
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
      setStores(data);
    } else {
      const text = await response.text();
      console.error('⚠️Unexpected response format:', text);
    }
  } catch (error) {
    console.error('⚠️Error fetching:', error);
  }
};

// 나에게 추천하는 가게 리스트를 가져오는 함수
const fetchRecommendedStores = async (customerId, setRecommendedStores) => {
  try {
    const response = await fetch(`${STORELISTS_URL}/favCategory`, {
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
      setRecommendedStores(data);
    } else {
      const text = await response.text();
      console.error('⚠️Unexpected response format:', text);
    }
  } catch (error) {
    console.error('⚠️Error fetching:', error);
  }
};

// 랜덤으로 주어진 개수의 가게를 선택하는 함수
const getRandomStores = (stores, count) => {
  const shuffled = stores.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const FoodNav = ({ selectedCategory, stores }) => {
  const [favorites, setFavorites] = useState({});
  const [filteredStores, setFilteredStores] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [myFavoriteAndOrderStores, setMyFavoriteAndOrderStores] = useState([]);
  const [recommendedStores, setRecommendedStores] = useState([]);
  const { openModal } = useModal();

  // customerId값
  const customerId = getUserEmail();

  useEffect(() => {
    if (customerId) {
      fetchFavorites(customerId, setFavorites);
      fetchFavoriteAndOrderStores(customerId, setMyFavoriteAndOrderStores);
      fetchRecommendedStores(customerId, setRecommendedStores);
    }
  }, [customerId]);

  useEffect(() => {
    // store 정보
    console.log('Stores:', stores);
    // 선택된 area 정보
    console.log('Selected Area:', selectedArea);

    if (selectedArea !== null) {
      // 선택된 area와 같은 address를 가진 가게 리스트 필터링
      const newFilteredStores = stores.filter(store => {
        const address = store.address || '';
        const isMatch = address.includes(selectedArea);
        console.log(`Checking store ${store.storeName}: ${address} - Match: ${isMatch}`);
        return isMatch;
      });

      setFilteredStores(newFilteredStores);
    }
  }, [stores, selectedArea]);

  // 선택된 지역에 맞는 단골 가게 필터링
  const filteredFavoriteStores = myFavoriteAndOrderStores.filter(store => {
    const address = store.address || '';
    return selectedArea ? address.includes(selectedArea) : true;
  });

  // 필터링된 추천 가게 리스트 생성
  const filteredRecommendedStores = recommendedStores.filter(store => {
    const address = store.address || '';
    return selectedArea ? address.includes(selectedArea) : true;
  });

  // 이웃들의 추천 가게 리스트에서 selectedArea에 해당하는 가게를 랜덤으로 5개 선택
  const randomRecommendedStores = getRandomStores(filteredRecommendedStores, 5);

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
      <FavAreaSelector onAreaSelect={setSelectedArea} />

      {/* 내가 찜한 가게 리스트 */}
      <div className={styles.list}>
        <h2 className={styles.title}>나의 단골 가게</h2>
        <Slider {...settings(4)} className={styles.slider}>
          {filteredFavoriteStores.map((store, index) => (
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
              <img src={store.storeImg || DEFAULT_IMG} alt={store.storeName} onError={imgErrorHandler}/>
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
        <h2 className={styles.title}>{selectedArea ? `${selectedArea} 근처 가게` : '근처 가게'}</h2>
        <Slider {...settings(4)} className={styles.slider}>
          {filteredStores.map((store, index) => (
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
              <img src={store.storeImg || DEFAULT_IMG} alt={store.storeName} onError={imgErrorHandler}/>
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
          {randomRecommendedStores.map((store, index) => (
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
              <img src={store.storeImg || DEFAULT_IMG} alt={store.storeName} className={styles.image} onError={imgErrorHandler} />
              <span className={styles.category}>{extractFoodType(store.category)}</span>
              <p className={styles.storeName}>{store.storeName}</p>
              <span className={styles.storePrice}>{store.price}</span>
              <span className={styles.productCnt}>수량 : {store.productCnt}</span>
              {store.productCnt === 1 && <div className={styles.overlay}>SOLD OUT</div>}
            </div>
          ))}
        </Slider>
      </div>

      {/* 나의 관심 카테고리 가게 */}
      <div className={styles.list}>
        <h2 className={styles.title}>내가 좋아하는 카테고리</h2>
        <Slider {...settings(5)} className={styles.slider}>
          {filteredRecommendedStores.map((store, index) => (
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
              <img src={store.storeImg || DEFAULT_IMG} alt={store.storeName} className={styles.image} onError={imgErrorHandler} />
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
