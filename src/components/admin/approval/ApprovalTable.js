import React, {useEffect, useMemo, useState} from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel, getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import FiltersInTable from "./FiltersInTable";
import {BiSortAlt2, BiSortDown, BiSortUp} from "react-icons/bi";
import styles from "./ApprovalTables.module.scss";
import {ApprovalColumns} from "./ApprovalColumns";
import DateRangePicker from "./DateRangePicker";
import ApprovalButtons from "./ApprovalButton";
import TansPagination from "./TansPagination";
import TansTable from "./TansTable";
import ApprovalSummary from "./ApprovalSummary";

const ApprovalTable = () => {
  const [data, setData] = useState([]);
  const columns = useMemo(() => ApprovalColumns, []);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({}); // 선택한 행
  const [startDate, setStartDate] = useState(new Date('2024-07-01'));
  const [endDate, setEndDate] = useState(new Date());
  const [stats, setStats] = useState({});

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
    console.log('fetchApprovals 실행중!')

    const startISO = startDate.toISOString();
    const endISO = endDate.toISOString()

    // const token = localStorage.getItem('token');
    // const refreshToken = localStorage.getItem('refreshToken');

    const res = await fetch(
      `/admin/approve?start=${startISO}&end=${endISO}`,
      {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache',
          // 'Authorization' : 'Bearer ' + getUserToken(),
          // 'refreshToken': refreshToken,
        },
      });
    if(!res.ok) {
      const errorMessage = await res.text();
      alert(errorMessage);
      return null;
    }
    const DATA =  await res.json(); // DATA 배열 approvals, 객체 stats
    setData(DATA.approvals);
    setStats(() => DATA.stats);
  }
  const onFetch = ({result}) => {
    const {status, ids} = result;
    setData(prevData => {
      const idsToUpdate = new Set(ids);

      // result.status를 모든 data에 적용
      const updatedData = prevData.map(item => {
        if (idsToUpdate.has(item.id)) {
          // id가 ids에 있는 경우 status를 업데이트
          return { ...item, status: status };
        }
        // id가 ids에 없는 경우 원래의 데이터 유지
        return item;
      });
      console.log('onFetch updatedData', updatedData)
      return updatedData;
    });
  }

  // 기간을 기준으로 서버에 데이터 요청 및 렌더링
  useEffect(() => {
    console.log('approval useEffect 실행중!')
    fetchApprovals();
  }, [startDate, endDate]);

  return (
    <div className={styles['table-section']}>
      <ApprovalSummary stats={stats}/>
      <div className={styles['table-interaction']}>
        <FiltersInTable columnFilters={columnFilters} setColumnFilters={setColumnFilters}/>
        <div className={styles['left-interactions']}>
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
