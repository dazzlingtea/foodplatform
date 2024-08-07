import React, { useState, useEffect } from 'react';
import FoodNav from '../../components/mainPage/FoodNav';
import CategoryBtn from '../../components/mainPage/CategoryBtn';
import { STORELISTS_URL } from '../../config/host-config';
import { useNavigate } from 'react-router-dom';
import {checkAuthToken} from "../../utils/authUtil";

const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [stores, setStores] = useState([]);
  const categories = ["한식", "중식", "양식", "일식", "디저트", "카페", "기타"];

  const navigate = useNavigate();

  checkAuthToken(navigate);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    // API로부터 데이터 가져오기
    fetch(STORELISTS_URL)
      .then(response => response.json())
      .then(data => setStores(data))
      .catch(error => console.error('데이터를 가져오는 중 오류 발생:', error));
  }, []);


  return (
    <div className="main-page">
      <CategoryBtn categories={categories} onCategoryClick={handleCategoryClick} />
      <FoodNav selectedCategory={selectedCategory} stores={stores} />
    </div>
  );
}

export default MainPage;
