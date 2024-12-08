import React, {useState} from 'react';
import DaumPostcode from 'react-daum-postcode';
import styles from './DaumAddressBtn.module.scss';

const DaumAddressBtn = ({ addressAction }) => {
  const { setAddress } = addressAction;
  const [isOpen, setIsOpen] = useState(false);

  const themeObj = {
    bgColor: '#FFFFFF', //바탕 배경색
    pageBgColor: '#FFFFFF', //페이지 배경색
    postcodeTextColor: '#C05850', //우편번호 글자색
    emphTextColor: '#222222', //강조 글자색
  };

  const postCodeStyle = {
    width: '400px',
    height: '480px',
  };

  const completeHandler = (data) => {
    const { address } = data;
    setAddress(address);
  };

  const closeHandler = (state) => {
    if (state === 'FORCE_CLOSE') {
      setIsOpen(false);
    } else if (state === 'COMPLETE_CLOSE') {
      setIsOpen(false);
    }
  };

  const toggleHandler = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className={styles['daum-container']}>
      <button
        className={styles['daum-btn']}
        type="button"
        onClick={toggleHandler}
      >
        주소 찾기
      </button>
      {isOpen && (
        <div className={styles['daum-window']}>
          <DaumPostcode
            theme={themeObj}
            style={postCodeStyle}
            onComplete={completeHandler}
            onClose={closeHandler}
            hideMapBtn={false}
          />
        </div>
      )}
    </div>
  );
};

export default DaumAddressBtn;