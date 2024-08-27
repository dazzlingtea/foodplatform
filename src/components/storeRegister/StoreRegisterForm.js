import React from 'react';
import {Form, redirect} from 'react-router-dom';
import styles from './StoreRegisterForm.module.scss'
import SelectBox from "./SelectBox";
import {STORE_URL} from "../../config/host-config";
import useFormValidation from "./useFormValidation";
import ErrorSpan from "./ErrorSpan";
import {authFetch} from "../../utils/authUtil";
import DaumAddressBtn from "./DaumAddressBtn";

// select option 배열
const OPTIONS = [
  {name: '== 업종을 선택해주세요 ==', value: 'default'},
  {name: '한식', value: 'KOREAN'},
  {name: '양식', value: 'WESTERN'},
  {name: '중식', value: 'CHINESE'},
  {name: '일식', value: 'JAPANESE'},
  {name: '카페', value: 'CAFE'},
  {name: '디저트', value: 'DESSERT'},
  {name: '기타', value: 'ELSE'},
];
// 사업자등록번호 유효성 검증용 인증키
const keyArr = [1, 3, 7, 1, 3, 7, 1, 3, 5];

const initialValues = {
      bizLicenseNum: '',
      bizName: '',
      bizAddress: '',
      bizPhoneNum: '',
      bizCategory: 'default',
      detailedAddress: '',
}
  // 사업자등록번호가 유효한지 검증
  const checkLicense = (value) => {
    const numberArr = value.replaceAll('-', '').split('').map(d => parseInt(d, 10));

    if(numberArr.length === 10) {
      let sum = 0;
      keyArr.forEach((key, i)=>{
        sum += key * numberArr[i];
      });
      sum += Math.floor((keyArr[8] * numberArr[8]) / 10);
      return numberArr[9] === ((10 - (sum % 10)) % 10);
    }
    return false;
  }

  const validate = (name, value) => {
    switch (name) {
      case 'bizLicenseNum':
        return /^\d{10}$/.test(value) && checkLicense(value)
            ? null : '유효한 번호를 입력해주세요.';
      case 'bizName':
      case 'bizAddress':
      case 'detailedAddress':
        return value.trim() !== '' ? null : '필수 입력 값입니다.';
      case 'bizPhoneNum':
        return /^(02|0[3-9]\d{1}|01[0-9])\d{7,8}$/.test(value.replaceAll('-',''))
            ? null : '전화번호를 입력해주세요.';
      case 'bizCategory':
        return OPTIONS.some(option => option.value === value && option.value !== 'default')
            ? null : '업종을 선택해 주세요.';
      default:
        return null;
    }
  };

const StoreRegisterForm = () => {

  const { values, errors, isFormValid, changeHandler, setValues }
      = useFormValidation(initialValues, validate);
  const setAddress = (address) => setValues((prev) => ({ ...prev, bizAddress: address }));
  const setDetailedAddress = (detailedAddress) => setValues((prev) => ({ ...prev, detailedAddress }));

  return (
    <Form
      method='post'
      className={styles.registration}
    >
      <label htmlFor='bizLicenseNum'>사업자등록번호
        {errors.bizLicenseNum && <ErrorSpan message={errors.bizLicenseNum}/>}
      </label>
      <input
        id='bizLicenseNum'
        name='bizLicenseNum'
        value={values.bizLicenseNum}
        onChange={changeHandler}
        type="text"
        maxLength={10}
        placeholder="'-'를 제외한 10자리 숫자만 입력하세요."
      />

      <label htmlFor='bizName'>상호명
        {errors.bizName && <ErrorSpan message={errors.bizName}/>}
      </label>
      <input
        id='bizName'
        name='bizName'
        value={values.bizName}
        onChange={changeHandler}
        type="text"
        maxLength={30}
        placeholder="상호명을 입력하세요."
        required
      />
      <label htmlFor='bizAddress'>주소
        {errors.bizAddress && <ErrorSpan message={errors.bizAddress}/>}
      </label>
      <div className={styles['address-row']}>
        <input
          id='bizAddress'
          name='bizAddress'
          value={values.bizAddress}
          onChange={changeHandler}
          type="text"
          placeholder="도로명 주소를 입력하세요."
          required
        />
        <DaumAddressBtn addressAction={{setAddress}} />
      </div>
      <input
        id='detailedAddress'
        name='detailedAddress'
        value={values.detailedAddress}
        onChange={changeHandler}
        type='text'
        placeholder='상세주소를 입력하세요.'
        required
      />
      <label htmlFor='bizPhoneNum'>연락처
        {errors.bizPhoneNum && <ErrorSpan message={errors.bizPhoneNum}/>}
      </label>
      <input
        id='bizPhoneNum'
        name='bizPhoneNum'
        value={values.bizPhoneNum}
        onChange={changeHandler}
        type="text"
        placeholder="전화 번호 또는 휴대전화 번호를 입력하세요."
        required
      />
      <label htmlFor='bizCategory'>업종
        {errors.bizCategory && <ErrorSpan message={errors.bizCategory}/>}
      </label>
      <SelectBox
        name='bizCategory'
        options={OPTIONS}
        value={values.bizCategory}
        onChange={changeHandler}
      />


      <button
        type="submit"
        className={`${styles['btn-approval']} ${!isFormValid && styles.disabled}`}
        disabled={!isFormValid}
      >
        가게 등록 요청하기
      </button>
    </Form>
  );
};

export default StoreRegisterForm;

export const storeRegisterAction = async ({request}) => {

  const formData = await request.formData();
  console.log('주소검색 선택값: ', formData.get('bizAddress'));
  console.log('주소검색 특별시 변환', formData.get('bizAddress').replace('서울', '서울특별시'))

  const address = `${formData.get('bizAddress').replace('서울', '서울특별시')} ${formData.get('detailedAddress')}`
  const payload = {
    bizLicenseNum: formData.get('bizLicenseNum'),
    bizName: formData.get('bizName'),
    bizAddress: address,
    bizPhoneNum: formData.get('bizPhoneNum'),
    bizCategory: formData.get('bizCategory'),
  }

  const response = await authFetch(`${STORE_URL}/approval`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if(!response.ok) {
    const errorMessage = await response.text();
    alert('storeRegisterForm 액션 결과 : '+ errorMessage);
    return null;
  }
  return redirect('/store/approval/p');
}