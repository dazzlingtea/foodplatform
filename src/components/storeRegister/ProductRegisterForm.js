import React, {useEffect, useState} from 'react';
import {Form, redirect, useNavigate} from "react-router-dom";
import UploadInput from "./UploadInput";
import formStyle from './StoreRegisterForm.module.scss';
import PriceRadioBox from "./PriceRadioBox";
import {STORE_URL} from "../../config/host-config";
import useFormValidation from "./useFormValidation";
import ErrorSpan from "./ErrorSpan";
import {authFetch} from "../../utils/authUtil";

// 상품 가격 옵션 배열
const PRICE_OPTIONS = [
  { name: '3,900원', value: 3900 },
  { name: '5,900원', value: 5900 },
  { name: '7,900원', value: 7900 },
];
// 상품 등록 초기값 객체
const initialValues = {
  productImage: '',
  productCnt: '',
  price: '',
};
// 상품 등록 검증
const validate = (name, value) => {
  switch (name) {
    case 'productImage':
      return value ? null : '이미지를 업로드 해주세요.';
    case 'productCnt':
      return value && value > 0 && value <= 50
          ? null : '수량은 1 이상 50 이하 입니다.';
    case 'price':
      return PRICE_OPTIONS.some(option => option.value === +value)
          ? null : '가격을 선택해 주세요.';
    default:
      return null;
  }
};

const ProductRegisterForm = ({onSetStep}) => {

  const { values, errors, isFormValid, changeHandler, setValues }
      = useFormValidation(initialValues, validate);
  const navigate = useNavigate();

  // 업로드된 파일 props drilling
  const onAdd = (file) => {
    setValues(prevValues => ({
      ...prevValues,
      productImage: file
    }));
  };
  // 선택한 가격 props drilling
  const onPrice = (value) => {
    setValues(prevValues => ({
      ...prevValues,
      price: value
    }));
  };
  // 입력값 서버로 전달
  const submitHandler = async (e) => {
    e.preventDefault();

    // JSON데이터를 formData에 넣기 위한 작업
    const jsonBlob = new Blob(
      [ JSON.stringify({productCnt: values.productCnt, price: values.price}) ],
      { type: 'application/json' }
    );

    const payload = new FormData();
    payload.append('productInfo', jsonBlob);
    payload.append('productImage', values.productImage);

    console.log('payload 이미지 확인: ', payload.get('productImage'))

    try {
      const response = await authFetch(`${STORE_URL}/approval/p`, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data', FormData 생략 가능
          // 'Authorization': 'Bearer' + token,
        },
        body: payload
      });
      // 200 외 상태코드 처리
      if (response.ok) {
        onSetStep(3);
        alert(`스페셜팩 등록 성공하셨습니다!`);
      }
    } catch (e) {
        console.log(e)
    }
  }

  useEffect(() => {
  }, [values]);

  return (

      <Form
        method={'post'}
        className={formStyle.registration}
        onSubmit={submitHandler}
      >
        <UploadInput onAdd={onAdd}/>
          {errors.productImage && <ErrorSpan message={errors.productImage} />}
        <label htmlFor="productCnt">스페셜팩 수량
          {errors.productCnt && <ErrorSpan message={errors.productCnt} />}
        </label>
        <input
            type="number"
            id="productCnt"
            name="productCnt"
            value={values.productCnt}
            onChange={changeHandler}
            placeholder="매일 설정될 기본 수량입니다."
            min={0}
            max={50}
            required
        />

        <label htmlFor="price">스페셜팩 가격
          {errors.price && <ErrorSpan message={errors.price} />}
        </label>
        <PriceRadioBox
            name={'price'}
            options={PRICE_OPTIONS}
            value={values.price}
            onChange={changeHandler}
            onPrice={onPrice}
        />

        <button
            type="submit"
            className={`${formStyle['btn-approval']} ${!isFormValid && formStyle.disabled}`}
            disabled={!isFormValid}
        >스페셜팩 등록하기</button>
      </Form>
  );
};

export default ProductRegisterForm;
