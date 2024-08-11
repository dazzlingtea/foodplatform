import React from 'react';
import styles from "./ApprovalTables.module.scss";
import {ADMIN_URL} from "../../../config/host-config";
import {redirect} from "react-router-dom";

const ApprovalButton = ({rows, data, onFetch}) => {
  // 버튼 클릭 시 승인 또는 거절 요청을 서버로 보내는 기능
  const clickHandler = (e) => {
    e.preventDefault();
    if(Object.keys(rows).length === 0) {
      alert(`행을 선택해주세요.`);
      return;
    }
    const actionType = e.target.name;
    // rows 를 data id(PK) 배열로 변경
    const approvalIdList = Object.keys(rows).map(i => data[+i]) // rows key로 data 배열 생성
      .filter(d => d.price && d.productCnt) // 모든 값이 있는지 필터링
      .map(d => d.id); // id(storeApproval PK) 배열 생성

    const isConfirm = window.confirm(
      ` ✅ 요청: ${actionType === 'APPROVED' ? '스토어 등록 승인' : '스토어 등록 거절'} \n ✅ 선택한 행의 갯수: ${approvalIdList.length}`);

    if(!isConfirm) { return; }

    const fetchApproveStatus = async () => {

      const payload = {
        actionType,
        approvalIdList,
      }
      // const token = localStorage.getItem('token');
      // const refreshToken = localStorage.getItem('refreshToken');

      const res = await fetch(ADMIN_URL+'/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ' + token,
          // 'refreshToken' : refreshToken,
        },
        body: JSON.stringify(payload),
      })

      // 200 외 상태코드 처리 필요
      alert(` ✅ 요청: ${actionType === 'APPROVED' ? '스토어 등록 승인' : '스토어 등록 거절'} \n ✅ 처리 여부: ${res.ok? '성공': await res.text()}`)

      return null;
    }
    fetchApproveStatus();
    onFetch(); // 데이터 새로고침
  }

  return (
    <div className={styles['status-btn-container']}>
      <button name={'APPROVED'} onClick={clickHandler}>승인</button>
      <button name={'REJECTED'} onClick={clickHandler}>거절</button>
    </div>
  );
};

export default ApprovalButton;