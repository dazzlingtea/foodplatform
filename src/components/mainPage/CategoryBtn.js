import React from 'react';
import styles from './CategoryBtn.module.scss';

import kFood from "../../assets/images/userMain/kFood.png";
import cFood from "../../assets/images/userMain/cFood.png"
import uFood from "../../assets/images/userMain/uFood.png"
import jFood from "../../assets/images/userMain/jFood.png"
import dessert from "../../assets/images/userMain/dessert.png"
import salad from "../../assets/images/userMain/salad.png"

const CategoryBtn = ({ label, onClick }) => {
  return (
    <>
    <div className={styles['category-btn']} onClick={onClick}>
      <div className={styles.btnImg}>
        <img src={kFood} alt='한식' />
      </div>
      <div className={styles.btnText}>한식</div>
    </div>

    <div className={styles['category-btn']} onClick={onClick}>
      <div className={styles.btnImg}>
        <img src={cFood} alt='중식' />
      </div>
      <div className={styles.btnText}>중식</div>
    </div>

    <div className={styles['category-btn']} onClick={onClick}>
      <div className={styles.btnImg}>
        <img src={uFood} alt='양식' />
      </div>
      <div className={styles.btnText}>양식</div>
    </div>

    <div className={styles['category-btn']} onClick={onClick}>
      <div className={styles.btnImg}>
        <img src={jFood} alt='일식' />
      </div>
      <div className={styles.btnText}>일식</div>
    </div>

    <div className={styles['category-btn']} onClick={onClick}>
      <div className={styles.btnImg}>
        <img src={dessert} alt='디저트' />
      </div>
      <div className={styles.btnText}>디저트</div>
    </div>

    <div className={styles['category-btn']} onClick={onClick}>
      <div className={styles.btnImg}>
        <img src={salad} alt='기타' />
      </div>
      <div className={styles.btnText}>기타</div>
    </div>


    </>
  );
}

export default CategoryBtn;
