import { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';

/**
 * 폼 입력값을 검증하는 커스텀 훅
 * @param initialValues - 초기값을 담은 객체 (상태변수)
 * @param validate - 입력값 검증 결과를 리턴하는 함수
 * @returns {{setValues: (value: unknown) => void, values: unknown, isFormValid: boolean, changeHandler: changeHandler, errors: {}}}
 */
const useFormValidation = (initialValues, validate) => {
    // 폼 입력값 상태관리
    // {[name]: value, ...}
    const [values, setValues] = useState(initialValues);
    // 폼 입력값 검증 상태관리
    // {[name]: validate(name, value), ...}
    // 유효하면 null, 아니면 validate로 전달받은 에러메세지
    const [errors, setErrors] = useState({});
    // 폼 모든 입력값이 유효한 지 상태관리
    // 유효하면 true, 아니면 false
    const [isFormValid, setIsFormValid] = useState(false);

    const debouncedValidate = useCallback(
        debounce((name, value) => {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: validate(name, value)
            }));
        }, 500),
        [validate]
    );

    // errors 모두 검증 통과하면 isFormValid true
    useEffect(() => {
        const allValid = Object.values(errors).every(error => error === null);
        setIsFormValid(allValid
          && Object.values(values)
            .every(value => value !== '' && value !== 'default'));
    }, [errors, values]);

    // input change 이벤트 핸들러
    const changeHandler = (e) => {
      e.preventDefault();
      const { name, value } = e.target;

      setValues(prevValues => {
        return {
          ...prevValues,
          [name]: value
        };
      })
      // 디바운스된 검증 함수 호출
      debouncedValidate(name, value);
    };

    return {
        values,
        setValues,
        errors,
        isFormValid,
        changeHandler,
    };
};

export default useFormValidation;
