import React from 'react';
import storeRegisterImg from '../../assets/approval-img/store-register-v3.jpg';
import styles from './StoreRegister.module.scss'
import StoreRegisterForm from "./StoreRegisterForm";

const StoreRegister = ({onSetStep}) => {
  return (
    <div className={styles['store-register-box']}>
      <div className={styles['img-container']}>
        <h2>스토어 등록</h2>
        <h3>푸디트리와 지구를 위한 한 걸음, 함께 시작해요!</h3>
        <img className={styles['img-left']} src={storeRegisterImg} alt='스토어 등록 이미지'/>
      </div>
      <StoreRegisterForm />
    </div>
  );
};

export default StoreRegister;