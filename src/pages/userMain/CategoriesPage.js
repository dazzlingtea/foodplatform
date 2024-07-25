import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoryBtn from '../../components/mainPage/CategoryBtn';
import CategoryList from '../../components/mainPage/CategoryList';
import BestStoreList from '../../components/mainPage/BestStoreList';
import styles from './CategoriesPage.module.scss';

import img1 from '../../assets/images/userMain/image1.jpg';
import img2 from '../../assets/images/userMain/image2.jpg';
import img3 from '../../assets/images/userMain/image3.jpg';

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

const CategoriesPage = () => {
  const { categoryName } = useParams();
  const [stores, setStores] = useState([]);

    // 카테고리 정보
    const category = categoriesInfo[categoryName];

// // 더미 데이터
// // 마지막 칸이 4개 이하일 때, width 조절하도록
// const stores = [
//   { name: '공차', category: '카페', image: img1, price: 3900, discount: '55%' },
//   { name: '김밥천국', category: '한식', image: img2, price: 3900 },
//   { name: '메가커피', category: '카페', image: img3, price: 3900 },
//   { name: 'Store 4', category: '양식', image: img1, price: 3900 },
//   { name: 'Store 5', category: '중식', image: img2, price: 3900 },
//   { name: 'Store 6', category: '일식', image: img3, price: 3900 },
//   { name: 'Store 7', category: '일식', image: img3, price: 3900 },
// ];

useEffect(() => {
  fetch('http://localhost:8083/storeLists')
    .then(response => response.json())
    .then(data => {
      const filteredStores = data.filter(store => store.category === category.name);
      setStores(filteredStores);

      // 가정: 찜한 가게 목록을 전체 목록에서 필터링하여 표시
      // const favoriteStores = data.filter(store => store.isFavorite); // `isFavorite` 필드를 가정
      // setBestStores(favoriteStores);
    })
    .catch(error => console.error('데이터를 가져오는 중 오류 발생:', error));
}, [categoryName, category.name]);

// const CategoriesPage = () => {
//   const { categoryName } = useParams();
//   const [stores, setStores] = useState([]);

//   const category = categoriesInfo[categoryName];

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
      <CategoryBtn categories={categories} onCategoryClick={()=>{}}/>

      {/* 내가 찜한 가게 */}
      <BestStoreList stores={stores}/>

      {/* 전체 가게 리스트 */}
      <CategoryList stores={stores} />
    </>
  );
};

export default CategoriesPage;
