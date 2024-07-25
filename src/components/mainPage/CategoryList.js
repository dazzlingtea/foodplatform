import React from 'react';
import styles from './CategoryList.module.scss';

const CategoryList = ({ stores }) => {
  return (
  <>
    <h1 className={styles.storeList}>가게 리스트</h1>
    <div className={styles.categoryContainer}>
      {stores.map((store, index) => (
        <div key={index} className={styles.categoryItem}>
          <img src={store.image} alt={store.storeName} className={styles.categoryImage} />
          <p className={styles.categoryName}>{store.storeName}</p>
          <span className={styles.storePrice}>{store.price}원</span>
          {/* {store.discount && <span className={styles.discount}>{store.discount}</span>} */}
        </div>
      ))}
    </div>
    </>
  );
}

export default CategoryList;
