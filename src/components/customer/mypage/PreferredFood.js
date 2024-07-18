import React from 'react';
import styles from './PreferredFood.module.scss';

const PreferredFood = ({ preferredFoods = [] }) => {
    return (
        <div className={styles.preferredFoodForm}>
            <div className={styles.title}>
                <h3 className={styles.titleText}>
                    <span>선호 음식</span>
                </h3>
            </div>
            <div className={styles.infoWrapper}>
                <ul className={`${styles.infoList} ${styles.food}`}>
                    {preferredFoods.length > 0 ? (
                        preferredFoods.map((food, index) => (
                            <li key={index}>
                                <div className={styles.imgBox}>
                                    <img src={food.foodImage} alt="선호음식이미지" className={styles.foodImage}/>
                                </div>
                                <span>{food.preferredFood}</span>
                            </li>
                        ))
                    ) : (
                        <li>선호 음식이 없습니다.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default PreferredFood;