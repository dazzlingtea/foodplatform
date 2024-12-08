import React from 'react';
import styles from "./StoreRegister.module.scss";
import productRegisterImg from '../../assets/approval-img/product-register-v1.jpg'
import ProductRegisterForm from "./ProductRegisterForm";

const ProductRegister = ({onSetStep}) => {
  return (
    <div className={styles['store-register-box']}>
      <div className={styles['img-container']}>
        <h2>스페셜팩 등록</h2>
        <h3>푸디트리를 통해 새로운 로컬 고객을 만나보세요!</h3>
        <img className={styles['img-left']} src={productRegisterImg} alt='스페셜팩 등록 이미지' />
      </div>
      <ProductRegisterForm onSetStep={onSetStep}/>
    </div>
  );
};

export default ProductRegister;