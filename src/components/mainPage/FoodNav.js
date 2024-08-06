import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useModal } from "../../pages/common/ModalProvider";
import styles from "./FoodNav.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slick-theme.css';

// 🌿 랜덤 가게 리스트 생성
const getRandomStores = (stores, count) => {
  const shuffled = [...stores].sort(() => 0.5 - Math.random()); // stores 배열을 랜덤으로 섞기
  return shuffled.slice(0, count); // 원하는 개수의 가게를 선택
};

// 🌿 카테고리 문자열에서 실제 foodType만 추출하는 함수
const extractFoodType = (category) => {
   // category가 유효한 문자열인지 확인
   if (category && typeof category === 'string') {
    // 'foodType=' 이후의 값 추출
    const match = category.match(/\(foodType=(.*?)\)/);
    return match ? match[1] : category; 
    }
  return ''; // category가 유효하지 않은 경우 빈 문자열 반환
};

const FoodNav = ({ selectedCategory, stores }) => {
  const [randomStores, setRandomStores] = useState([]);
  const { openModal } = useModal();

  useEffect(() => {
    // 랜덤한 가게 목록을 선택하여 상태를 업데이트
    setRandomStores(getRandomStores(stores, 5)); 
  }, [stores]);

  const handleClick = (store) => {
    openModal('productDetail', { productDetail: store });
  };

  const settings = (slidesToShow) => ({
    dots: true,
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
