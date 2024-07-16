
import React, {useState} from 'react';
import CategoryBtn from './CategoryBtn';
import styles from './FoodNav.module.scss';
import bannerImg from '../../assets/images/userMain/header.jpg';

const FoodNav = ({ categories, stores }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCategoryClick = (category) => {
    console.log(`Selected category: ${category}`);
  };


const handleNextClick = () => {
  if(currentIndex<stores.length-4){
    setCurrentIndex(currentIndex+4);
  }
};
const handlePrevClick = () => {
  if(currentIndex>0){
    setCurrentIndex(currentIndex-4);
  }
};

  return (
    <>
      <header className={styles['App-header']}>
        <div className={styles.banner}>
          <img
            src={bannerImg}
            alt="banner Image 나중에 바꿀 예정"
          />
        </div>
        <div className={styles.title}>
          <h1>환경을 생각하는 착한 소비</h1>
          <p>원하는 음식을 선택하세요!</p>
        </div>
      </header>

      <div className={styles.nav}>
        <div className={styles['food-nav']}>
          {categories.map(category => (
            <CategoryBtn key={category} label={category} onClick={() => handleCategoryClick(category)} />
          ))}
        </div>
      </div>


    {/* ✅ 내가 찜한 가게 리스트 */}
    <div className={styles.list1}>
    <h2 className={styles.title1}>❤️ 내가 찜한 가게</h2>
      <div className={styles['favorite-store-list']}>
        <button className={`${styles['nav-button']} ${styles.left}`} onClick={handlePrevClick}>&lt;</button>
        <div className={styles['storeList']}>
          {stores.map((store, index) => (
            <div key={index} className={styles['store-item']}>
              <img src={store.image} alt={store.name} />
              <p className={styles['store-name']}>{store.name}</p>
              <p className={styles['store-price']}>{store.price}</p>
            </div>
          ))}
        </div>

        <button className={`${styles['nav-button']} ${styles.right}`} onClick={handleNextClick}>&gt;</button>
      </div>
    </div>

    </>
  );
}

export default FoodNav;
