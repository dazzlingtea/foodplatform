import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoryBtn from '../../components/mainPage/CategoryBtn';
import CategoryList from '../../components/mainPage/CategoryList';
import BestStoreList from '../../components/mainPage/BestStoreList';
import styles from './CategoriesPage.module.scss';
import { STORELISTS_URL } from '../../config/host-config';

import kFood from "../../assets/images/userMain/kFood.png";
import cFood from "../../assets/images/userMain/cFood.png";
import uFood from "../../assets/images/userMain/uFood.png";
import jFood from "../../assets/images/userMain/jFood.png";
import dessert from "../../assets/images/userMain/dessert.png";
import cafe from "../../assets/images/userMain/cafe.png";
import salad from "../../assets/images/userMain/salad.png";

// 카테고리 정보 >> 헤더 오른쪽 카테고리 이미지 렌더링을 위해
const categoriesInfo = {
  korean: { name: '한식', image: kFood },
  chinese: { name: '중식', image: cFood },
  western: { name: '양식', image: uFood },
  japanese: { name: '일식', image: jFood },
  dessert: { name: '디저트', image: dessert },
  cafe: { name: '카페', image: cafe },
  etc: { name: '기타', image: salad },
};

const categories = Object.keys(categoriesInfo).map(key => categoriesInfo[key].name);

// 🌿 카테고리 문자열에서 실제 foodType만 추출하는 함수
const extractFoodType = (category) => {
  const match = category.match(/\(foodType=(.*?)\)/);
  return match ? match[1] : category; 
};

const CategoriesPage = () => {
  const { categoryName } = useParams();
  const [stores, setStores] = useState([]);

  // 카테고리 정보
  const category = categoriesInfo[categoryName];

  useEffect(() => {
    fetch(STORELISTS_URL) 
      .then(response => response.json())
      .then(data => {
        const filteredStores = data.filter(store => extractFoodType(store.category) === category.name);
        setStores(filteredStores);
      })
      .catch(error => console.error('데이터를 가져오는 중 오류 발생:', error));
  }, [categoryName, category.name]);

  return (
    <>
      {/* 카테고리 분류(헤더) */}
      <div className={styles.header}>
        <h1>{category.name}</h1>
        <div className={styles.btnImg}>
          <img src={category.image} alt={category.name} />
        </div>
      </div>
      
      {/* 카테고리 버튼 */}
      <CategoryBtn categories={categories} onCategoryClick={() => {}} />

      {/* 내가 찜한 가게 */}
      <BestStoreList stores={stores} />

      {/* 전체 가게 리스트 */}
      <CategoryList stores={stores} />
    </>
  ); 
};

export default CategoriesPage;
