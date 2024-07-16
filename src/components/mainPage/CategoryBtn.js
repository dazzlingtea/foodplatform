import React from 'react';
import styles from './CategoryBtn.module.scss';

const CategoryBtn = ({ label, onClick }) => {
  return (
    <button className={styles['category-btn']} onClick={onClick}>
      {label}
    </button>
  );
}

export default CategoryBtn;
