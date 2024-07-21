import React from 'react';
import StoreRegisterForm from "../../components/StoreRegister/StoreRegisterForm";
import ProductRegisterForm from "../../components/StoreRegister/ProductRegisterForm";

const StoreRegisterPage = () => {
  console.log('가게-등록-페이지 실행!');
  return (
    <>
      <StoreRegisterForm />
      {/*<ProductRegisterForm/>*/}
    </>
  );
};

export default StoreRegisterPage;
