import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './FoodNav.module.scss';
import { DEFAULT_IMG, imgErrorHandler } from '../../utils/error';

import { useModal } from '../../pages/common/ModalProvider';

const BestStoreList = ({ stores = [] }) => {
  const { openModal } = useModal();

  const settings = {
    slidesToShow: 5,
    slidesToScroll: 5,
    infinite: true,
    arrows: true,
    dots: true,
    centerMode: true,
    centerPadding: '0',
    responsive: [
      {
        breakpoint: 400,
        settings: {
          dots: false,
          slidesToShow: 2, 
          centerPadding: '10%',
          // centerMode: false,
        },
      },
    ],
  };

  const handleClick = (store) => {
    openModal('productDetail', { productDetail: store });
  };

  return (
    <div className={styles.list}>
      <h2 className={styles.title}>추천 가게</h2>
      <Slider {...settings} className={styles.slider}>
        {stores.length === 0 ? (
          <div>No stores available</div>
        ) : (
          stores.map((store, index) => (
            <div
              key={index}
              className={`${styles.storeItem} ${store.productCnt === 1 ? styles['low-stock'] : ''}`}
              onClick={() => handleClick(store)}
            >
              <img src={store.storeImg || DEFAULT_IMG} alt={store.storeName} onError={imgErrorHandler} />
              {store.productCnt === 1 && <div className={styles.overlay}>SOLD OUT</div>}
              <p className={styles.storeName}>{store.storeName}</p>
              <span className={styles.storePrice}>{store.price}</span>
              <span className={styles.productCnt}>수량: {store.productCnt}</span>
            </div>
          ))
        )}
      </Slider>
    </div>
  );
};

export default BestStoreList;
