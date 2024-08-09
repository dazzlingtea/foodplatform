import React, { useState, useEffect } from 'react';
import FoodNav from '../../components/mainPage/FoodNav';
import CategoryBtn from '../../components/mainPage/CategoryBtn';
import { STORELISTS_URL } from '../../config/host-config';
import {checkAuthToken, getRefreshToken, getToken} from "../../utils/authUtil";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [stores, setStores] = useState([]);
  const categories = ["한식", "중식", "양식", "일식", "디저트", "카페", "기타"];
  const navigate = useNavigate();// 로그인 안되어있을 시 리턴

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {

      checkAuthToken(navigate);

    // API로부터 데이터 가져오기
    fetch(STORELISTS_URL, {
        // 회원에게만 메인페이지 제공
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getToken(),
            'refreshToken' : getRefreshToken()
        }
    })
        .then(response => response.json())
        .then(data => setStores(data))
        .catch(error => console.error('데이터를 가져오는 중 오류 발생:', error));
  }, [navigate]);

  return (
      <div className="main-page">
        <CategoryBtn categories={categories} onCategoryClick={handleCategoryClick} />
        <FoodNav selectedCategory={selectedCategory} stores={stores} />
      </div>
  );
}

export default MainPage;
