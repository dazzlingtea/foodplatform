import React, {useEffect, useRef, useState} from 'react';
import styles from './ProductRegisterForm.module.scss';
import {FaCamera} from "react-icons/fa";

const UploadInput = ({ onAdd }) => {
  // 파일 input DOM
  const fileInputRef = useRef(null);

  // 파일 상태관리
  const [selectedFile, setSelectedFile] = useState(null);
  // 미리보기 url 상태관리
  const [previewUrl, setPreviewUrl] = useState(null);

  // 파일 업로드 시 selectedFile 상태 업데이트
  const fileHandler = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      setSelectedFile(file);
      onAdd(file);
    } else {
      setSelectedFile(null);
      onAdd('');
    }
  };

  useEffect(() => {
    if (selectedFile) { // 파일 업로드 되면 미리보기 URL 생성
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(previewUrl);

      // 미리보기 URL cleanup 함수
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setPreviewUrl(null)
    }
  }, [selectedFile]);

  return (
    <div className={styles['image-upload']}>
      <input
        ref={fileInputRef}
        type="file"
        id="productImage"
        name="productImage"
        accept="image/*"
        onChange={fileHandler}
        required
      />
      {!selectedFile &&
        <label htmlFor="productImage">
          {"스페셜팩 구성이 보이는 사진을\n\n한 장만 업로드 해주세요"}
        </label>
      }
      {
        selectedFile &&
        <div className={styles['image-preview']}>
          <img src={''+previewUrl} alt='product image'/>
          <label htmlFor="productImage">
          </label>
        </div>
      }
    </div>
  );
};

export default UploadInput;

