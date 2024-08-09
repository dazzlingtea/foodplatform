import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CategoryBtn.module.scss';
import { DEFAULT_IMG, imgErrorHandler } from '../../utils/error';

import kFood from "../../assets/images/userMain/kFood.png";
import cFood from "../../assets/images/userMain/cFood.png";
import uFood from "../../assets/images/userMain/uFood.png";
import jFood from "../../assets/images/userMain/jFood.png";
import dessert from "../../assets/images/userMain/dessert.png";
import cafe from "../../assets/images/userMain/cafe.png";
import salad from "../../assets/images/userMain/salad.png";

// 카테고리 정보 객체
const categoriesInfo = {
  한식: { path: 'korean', image: kFood },
  중식: { path: 'chinese', image: cFood },
  양식: { path: 'western', image: uFood },
  일식: { path: 'japanese', image: jFood },
  디저트: { path: 'dessert', image: dessert },
  카페: { path: 'cafe', image: cafe },
  기타: { path: 'etc', image: salad },
};

const CategoryBtn = ({ categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    const categoryInfo = categoriesInfo[category];
    if (categoryInfo) {
      navigate(`/${categoryInfo.path}`);
    }
  };

  return (
    <div className={styles.nav}>
      <div className={styles["food-nav"]}>
        {categories.map((category) => {
          const categoryInfo = categoriesInfo[category];
          if (!categoryInfo) return null; 
          return (
            <div key={category} className={styles['category-btn']} onClick={() => handleCategoryClick(category)}>
              <div className={styles.btnImg}>
                <img src={categoryInfo.image || DEFAULT_IMG} alt={category} onError={imgErrorHandler} />
              </div>
              <div className={styles.btnText}>{category}</div>
            </div>
          ); 
        })}
      </div>
    </div>
  );
};

export default CategoryBtn;
