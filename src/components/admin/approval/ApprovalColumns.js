import React from "react";

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
    },
    {accessorKey: 'name', header: '상호명', cell: (props) => <p>{props.getValue()}</p>},
    {accessorKey: 'storeId', header: '스토어 계정', cell: (props) => <p>{props.getValue()}</p>},
    {accessorKey: 'status', header: '상태', size: '100', cell: (props) => <p>{props.getValue()}</p>},
    {accessorKey: 'createdAt', header: '생성일시', size: '200', cell: (props) => <p>{formattingDate(props.getValue())}</p>},
    {accessorKey: 'license', header: '사업자등록번호', size: '130', cell: (props) => <p>{props.getValue()}</p>},
    {accessorKey: 'licenseVerification', header: '유효성', size: '100', cell: (props) => <p>{props.getValue()}</p>},
    {accessorKey: 'category', header: '업종', size: '100', cell: (props) => <p>{props.getValue()}</p>},
    {accessorKey: 'contact', header: '연락처', cell: (props) => <p>{props.getValue()}</p>},
    {accessorKey: 'address', header: '주소', cell: (props) => <p>{props.getValue()}</p>},
    {accessorKey: 'productCnt', header: '수량', size: '50', cell: (props) => <p>{props.getValue()}</p>},
    {accessorKey: 'price', header: '가격', size: '80', cell: (props) => <p>{props.getValue()}</p>},
    {accessorKey: 'proImage', header: '상품 구성 예시', cell: (props) => <img src={props.getValue() && '/logo192.png'} alt={'상품구성'}></img>},

  ];

const formattingDate = (dateTimeStr) => {
  // 2024-07-26T22:03:34.852628
  const inputDateTime = new Date(dateTimeStr);
  const today = new Date();

  // 오늘 날짜의 시작 시간
  const startOfToday = new Date(today.setHours(0, 0, 0, 0));

  // 오늘 날짜의 끝 시간
  const endOfToday = new Date(today.setHours(23, 59, 59, 999));

  const isToday = inputDateTime >= startOfToday && inputDateTime <= endOfToday;

  const formatNumber = (number) => number.toString().padStart(2, '0');

  if (isToday) {
    // 시간만 포맷팅
    const hours = formatNumber(inputDateTime.getHours());
    const minutes = formatNumber(inputDateTime.getMinutes());
    return `${hours}:${minutes}`;

  } else {
    // 날짜와 시간 포맷팅
    const year = inputDateTime.getFullYear();
    const month = formatNumber(inputDateTime.getMonth() + 1); // 월은 0부터 시작하므로 +1
    const day = formatNumber(inputDateTime.getDate());
    const hours = formatNumber(inputDateTime.getHours());
    const minutes = formatNumber(inputDateTime.getMinutes());
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
}
