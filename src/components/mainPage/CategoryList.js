import React from 'react';
import styles from './CategoryList.module.scss';

const CategoryList = ({ stores }) => {
  return (
  <>
    <div className={styles.list}>
      <h1 className={styles.storeList}>우리 동네 가게 리스트</h1>
      <div className={styles.categoryContainer}>
        {stores.map((store, index) => (
          <div key={index} className={styles.categoryItem}>
            <img src={store.storeImg} alt={store.storeName} className={styles.categoryImage} />
            <p className={styles.categoryName}>{store.storeName}</p>
            <span className={styles.storePrice}>{store.price}원</span>
            <span className={styles.productCnt}>남은 갯수 : {store.productCnt}</span>
          </div>
        ))}
      </div> 
    </div>
    </>
  );
}

export default CategoryList;
