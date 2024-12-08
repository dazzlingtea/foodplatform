import React, {useState} from 'react';
import styles from './ProductRegisterForm.module.scss'

const PriceRadioBox = ({options, onPrice}) => {

  // 상품 가격 상태관리
  const [pickedPriceIndex, setPickedPriceIndex] = useState(null);

  // 가격 클릭 시 이벤트 핸들러
  const clickHandler = (index, value) => {
    setPickedPriceIndex(index); // 선택한 가격 상태 업데이트
    onPrice(value); // ProductRegisterForm 으로 전달
  }

  return (
      <div className={styles.chips}>
        {options.map((opt, index) => (
            <div key={opt.value} className={styles.chipBox}>
              <input
                  type="radio"
                  id={`price-${opt.value}`}
                  name="price"
                  value={opt.value}
                  checked={pickedPriceIndex === index}
                  onChange={() => clickHandler(index, opt.value)}
                  className={styles.radioInput}
              />
              <label
                  htmlFor={`price-${opt.value}`}
                  className={`${styles.chip} ${pickedPriceIndex === index ? styles.picked : ''}`}
              >
                {opt.name}
              </label>
            </div>
        ))}
      </div>

  );
};

export default PriceRadioBox;