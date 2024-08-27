import React from "react";
import defaultImage from "../../../assets/approval-img/default_image.png"
import styles from './ApprovalColumns.module.scss';

const centerFlex = {style: {justifyContent: 'center', paddingLeft: '0'}}

export const ApprovalColumns =
  [
    {
      id: 'select',
      header: ({ table }) => (
        <input
          id="header-checkbox"
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()} // 전체 row가 선택되었는지 확인
          onChange={table.getToggleAllPageRowsSelectedHandler()} // 전체 row를 선택/해제하는 handler
        />
      ),
      cell: ({ row }) => (
        <input
          id={`cell-checkbox-${row.id}`}
          type="checkbox"
          checked={row.getIsSelected()} // row가 선택되었는지 확인
          disabled={!row.getCanSelect()} // row가 선택 가능한지 확인
          onChange={row.getToggleSelectedHandler()} // row를 선택/해제하는 handler
        />
      ),
      size: 50,
      meta: {
        cellProps: centerFlex,
      },
    },
    {
      accessorKey: 'name',
      header: '상호명',
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: 'storeId',
      header: '스토어 계정',
      size: 200,
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: 'status',
      header: '상태',
      size: 80,
      cell: (props) => <p>{props.getValue()}</p>,
      meta: {
        cellProps: centerFlex,
      },
    },
    {
      accessorKey: 'createdAt',
      header: '생성일시',
      size: 150,
      cell: (props) => <p>{formatDate(props.getValue())}</p>,
      meta: {
        cellProps: centerFlex,
      },
    },
    {
      accessorKey: 'license',
      header: '사업자등록번호',
      size: 130,
      cell: (props) => <p>{formatBizNo(props.getValue())}</p>,
    },
    {
      accessorKey: 'licenseVerification',
      header: '검증',
      size: 80,
      cell: (props) => <p>{props.getValue()}</p>,
      meta: {
        cellProps: centerFlex,
      },
    },
    {
      accessorKey: 'category',
      header: '업종',
      size: 80,
      cell: (props) => <p>{props.getValue()}</p>,
      meta: {
        cellProps: centerFlex,
      },
    },
    {
      accessorKey: 'contact',
      header: '연락처',
      cell: (props) => <p>{formatPhoneNo(props.getValue())}</p>,
    },
    {
      accessorKey: 'address',
      header: '주소',
      size: 230,
      cell: (props) => <p className={styles.addressColumn}>{props.getValue()}</p>,
    },
    {
      accessorKey: 'productCnt',
      header: '수량',
      size: '50',
      cell: (props) => <p>{props.getValue()}</p>,
      meta: {
        cellProps: centerFlex,
      },
    },
    {
      accessorKey: 'price',
      header: '가격',
      size: '80',
      cell: (props) => <p>{props.getValue()}</p>,
      meta: {
        cellProps: centerFlex,
      },
    },
    {
      accessorKey: 'proImage',
      header: '상품 사진',
      size: 80,
      cell: ({getValue}) => {

        const value = getValue();

        return (
          <img
            src={value ? value : defaultImage}
            alt="상품사진"
            onClick={() => {
              if (value) {
                window.open(
                  value,
                  "Popup",
                  "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=800, height=600, top=30"
                );
              }
            }}
          />
        );
      },
      meta: {
        cellProps: centerFlex,
      },
    },

  ];

const formatBizNo = (input) => input.replace(/^(\d{3})(\d{2})(\d{5})$/, '$1-$2-$3');
const formatPhoneNo = (input) => input.replace(/^(02|0\d{2})(\d{3,4})(\d{4})$/, '$1-$2-$3');
const formatDate = (dateTimeStr) => {
  // 2024-07-26T22:03:34.852628
  const inputDateTime = new Date(dateTimeStr);
  const today = new Date();

  // 오늘 날짜의 시작, 끝 시간
  const startOfToday = new Date(today.setHours(0, 0, 0, 0));
  const endOfToday = new Date(today.setHours(23, 59, 59, 999));

  const isToday = inputDateTime >= startOfToday && inputDateTime <= endOfToday;
  const isThisYear = inputDateTime.getFullYear() === startOfToday.getFullYear();

  const formatNumber = (number) => number.toString().padStart(2, '0');

  const year = inputDateTime.getFullYear();
  const month = formatNumber(inputDateTime.getMonth() + 1);
  const day = formatNumber(inputDateTime.getDate());
  const hours = formatNumber(inputDateTime.getHours());
  const minutes = formatNumber(inputDateTime.getMinutes());

  if (isToday) {               // 시간만 포맷팅
    return `${hours}:${minutes}`;
  } else if (isThisYear) {     // 날짜(월일)과 시간 포맷팅
    return `${month}-${day}  ${hours}:${minutes}`;
  } else {                     // 날짜(연월일)과 시간 포맷팅
    return `${year}-${month}-${day}  ${hours}:${minutes}`;
  }
}
