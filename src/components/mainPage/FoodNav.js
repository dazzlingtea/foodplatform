import React, { useRef, useEffect } from "react";
import CategoryBtn from "./CategoryBtn";
import styles from "./FoodNav.module.scss";
import { register } from "swiper/element/bundle";

register();

const FoodNav = ({ selectedCategory, stores }) => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    swiperElRef.current.addEventListener("swiperprogress", (e) => {
      const [swiper, progress] = e.detail;
      console.log(progress);
    });

    swiperElRef.current.addEventListener("swiperslidechange", (e) => {
      console.log("slide changed");
    });
  }, []);

  return (
    <>
      {/* 내가 찜한 가게 리스트 */}
      <div className={styles.list1}>
        <h2 className={styles.title1}>내가 찜한 가게</h2>
        <swiper-container
          ref={swiperElRef}
          slides-per-view="4"
          navigation="true"
          pagination="true"
          loop="true"
        >
          {stores.map((store, index) => (
            <swiper-slide key={index}>
              <div className={styles.storeItem}>
                <img src={store.image} alt={store.storeName} />
                <p className={styles.storeName}>{store.storeName}</p>
                <span className={styles.storePrice}>{store.price}</span>
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>

      {/* 주변 가게 리스트 */}
      <div className={styles.list1}>
        <h2 className={styles.title1}>주변 가게</h2>
        <swiper-container
          ref={swiperElRef}
          slides-per-view="5"
          navigation="true"
          pagination="true"
          loop="true"
        >
          {stores.map((store, index) => (
            <swiper-slide key={index}>
              <div className={styles.storeItem}>
                <img src={store.image} alt={store.storeName} />
                <p className={styles.storeName}>{store.storeName}</p>
                <span className={styles.storePrice}>{store.price}</span>
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>

      {/* 추천 가게 리스트 */}
      <div className={styles.list1}>
        <h2 className={styles.title1}>추천 가게</h2>
        <swiper-container
          ref={swiperElRef}
          slides-per-view="5"
          navigation="true"
          pagination="true"
          loop="true"
        >
          {stores.map((store, index) => (
            <swiper-slide key={index}>
              <div className={styles.storeItem}>
                <img src={store.image} alt={store.storeName} />
                <p className={styles.storeName}>{store.storeName}</p>
                <span className={styles.storePrice}>{store.price}</span>
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </>
  );
};

export default FoodNav;
