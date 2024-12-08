import React, {useEffect, useMemo, useState} from 'react';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import FiltersInTable from "./FiltersInTable";
import styles from "./ApprovalTables.module.scss";
import {ApprovalColumns} from "./ApprovalColumns";
import DateRangePicker from "./DateRangePicker";
import ApprovalButtons from "./ApprovalButton";
import TansPagination from "./TansPagination";
import TansTable from "./TansTable";
import ApprovalSummary from "./ApprovalSummary";
import {authFetch, checkAuthToken, getRefreshToken, getToken, getUserRole} from "../../../utils/authUtil";
import {useNavigate} from "react-router-dom";
import {ADMIN_URL} from "../../../config/host-config";

const ApprovalTable = () => {
  const beginDate = '2024-07-01';
  const [data, setData] = useState([]);
  const columns = useMemo(() => ApprovalColumns, []);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({}); // 선택한 행
  const [startDate, setStartDate] = useState(new Date(beginDate));
  const [endDate, setEndDate] = useState(new Date());
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
      rowSelection,
    },
  });

  const fetchApprovals = async () => {

    const startISO = startDate.toISOString();
    const endISO = endDate.toISOString()

    let userRole = getUserRole();

    const res = await authFetch(
      `${ADMIN_URL}/approve?start=${startISO}&end=${endISO}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      });
    if (!res.ok) {
      const errorMessage = await res.text();
      console.error(errorMessage);
      return null;
    }
    const DATA = await res.json(); // DATA 배열 approvals, 객체 stats
    setData(DATA.approvals);
    setStats(() => DATA.stats);
  }
  const onFetch = (payload) => {
    const {actionType, approvalIdList} = payload;
    const status = actionType === 'APPROVED' ? '승인' : '거절'
    setData(prevData => {
      const idsToUpdate = new Set(approvalIdList);
      return prevData.map(item => {
        if (idsToUpdate.has(item.id)) {
          return {...item, status: status};
        }
        return item;
      });
    });
  }

  // 기간을 기준으로 서버에 데이터 요청 및 렌더링
  useEffect(() => {
    fetchApprovals();
  }, [startDate, endDate]);

  // useEffect 훅 사용하여 admin이 아닐 경우 접근 제한
  useEffect(() => {
      debugger
      const userInfo = checkAuthToken(navigate);

      if (userInfo) {
        const requiredRole = 'admin'; // 단일 역할을 설정
        const userRole = getUserRole(); // 사용자 역할 가져오기

        if (userRole !== requiredRole) { // 문자열 비교
          alert('접근 권한이 없습니다.');
          navigate('/main');
          return;
        }
      }
    },
    []);

  const btnClickHandler = (type) => {
    const today = new Date();
    if (type === 'all') {
      setStartDate(new Date(beginDate));
      setEndDate(today);
    } else if (type === 'today') {
      setStartDate(today);
      setEndDate(today);
    }
  };

  return (
    <div className={styles['table-section']}>
      <ApprovalSummary stats={stats}/>
      <div className={styles['table-interaction']}>
        <FiltersInTable columnFilters={columnFilters} setColumnFilters={setColumnFilters}/>
        <div className={styles['left-interactions']}>
          <div className={styles['date-btn-box']}>
            <button className={styles['date-btn']} onClick={() => btnClickHandler('all')}>전체</button>
            <button className={styles['date-btn']} onClick={() => btnClickHandler('today')}>오늘</button>
          </div>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            dateFormat={"yyyy년 MM월 dd일"}
            onStart={(date) => setStartDate(date)}
            onEnd={(date) => setEndDate(date)}
            styleName={'date-input-container'}
          />
          <ApprovalButtons
            rows={rowSelection}
            data={data}
            onFetch={onFetch}
          />
        </div>
      </div>
      <TansTable table={table}/>
      <TansPagination style={styles['tans-page-container']} table={table}/>
    </div>
  );
};

export default ApprovalTable;
