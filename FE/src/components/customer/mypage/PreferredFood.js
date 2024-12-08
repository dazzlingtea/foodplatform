import React from 'react';
import {Link} from 'react-router-dom';
import styles from './PreferredFood.module.scss';
import {imgErrorHandler} from "../../../utils/error";
import {categoryImgList} from "../../../utils/img-handler";

const foodCategory = {
    "한식": 'korean',
    "중식": 'chinese',
    "일식": 'japanese',
    "양식": 'western',
    "디저트": 'dessert',
    "카페": 'cafe',
    "기타": 'etc'
};

const PreferredFood = ({preferredFoods = []}) => {
    console.log('preferredFoods: ', preferredFoods);
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
                                <Link to={`/${foodCategory[food.preferredFood]}`} className={styles.foodLink} onClick={() => window.scrollTo(0, 0)}>
                                    <div className={styles.imgBox}>
                                        <img src={categoryImgList[food.preferredFood]} onError={imgErrorHandler}
                                             alt="선호음식이미지" className={styles.foodImage}/>
                                    </div>
                                    <span>{food.preferredFood}</span>
                                </Link>
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