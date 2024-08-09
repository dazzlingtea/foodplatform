import React, {useEffect, useMemo, useState} from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel, getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import SearchInTable from "./SearchInTable";
import {BiSortAlt2} from "react-icons/bi";
import styles from "./ApprovalTables.module.scss";
import {ApprovalColumns} from "./ApprovalColumns";

const ApprovalTable = () => {
  const [data, setData] = useState([]);
  const columns = useMemo(() => ApprovalColumns, []);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [startDate, setStartDate] = useState(new Date('2024-06-01'));
  const [endDate, setEndDate] = useState(new Date());

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

  // 기간을 기준으로 서버에 데이터 요청
  useEffect(() => {
    console.log('approval useEffect 실행중!')
    const fetchApprovals = async () => {
      console.log('fetchApprovals 실행중!')

      const startISO = startDate.toISOString();
      const endISO = endDate.toISOString()

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
      const DATA =  await res.json();
      setData(DATA.approvals);
    }
    fetchApprovals();
  }, [startDate, endDate]);
  // useEffect(() => {
  //   console.log('현재 데이터 상태: ', data);
  // }, [data]);

  return (
    <div className={styles['table-section']}>
      <div className={styles['table-header']}>
        <SearchInTable columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
        <div className={styles['date-input-container']}>
          <input type={"date"}/>
        </div>
        <div className={styles['status-btn-container']}>
          <button className={styles['btn-approved']}>승인</button>
          <button  className={styles['btn-rejected']}>거절</button>
        </div>
      </div>
      <table width={table.getTotalSize()} className={styles['tbl-line']}>
        <thead>
        {table.getHeaderGroups().map(headerGroup =>
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header =>
              <th key={header.id} width={header.getSize()}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
                {
                  header.column.getCanSort() &&
                  <BiSortAlt2
                    onClick={header.column.getToggleSortingHandler()}
                  />
                }
              </th>
            )}
          </tr>)
        }
        </thead>
        <tbody>
        {
          table.getRowModel().rows.map(row =>
            <tr key={row.id}>
              {row.getVisibleCells().map(cell =>
                <td key={cell.id} width={cell.column.getSize()}>
                  {
                    flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )
                  }
                </td>)}
            </tr>)
        }
        </tbody>
      </table>
        <div>
          {table.getPageCount()> 0?
            table.getState().pagination.pageIndex + 1 +' / '+ table.getPageCount()
            : undefined}
        </div>
    </div>
  );
};

export default ApprovalTable;
