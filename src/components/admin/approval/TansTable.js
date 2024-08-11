import React from 'react';
import styles from "./ApprovalTables.module.scss";
import {flexRender} from "@tanstack/react-table";
import {BiSortAlt2, BiSortDown, BiSortUp} from "react-icons/bi";

const TansTable = ({table}) => {
  return (
    <table width={table.getTotalSize()} className={styles['table-content']}>
      <thead>
      {table.getHeaderGroups().map(headerGroup =>
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header =>
            <th key={header.id}
                width={header.getSize()}
                onClick={header.column.getToggleSortingHandler()}
                {...header.column.columnDef.meta?.headerProps}
            >
              {flexRender(
                header.column.columnDef.header,
                header.getContext(),
              )}
              {
                {
                  asc: <BiSortUp/>,
                  desc: <BiSortDown/>,
                }[header.column.getIsSorted()]
              }
              {header.column.getCanSort() && !header.column.getIsSorted() ? (
                <BiSortAlt2/>
              ) : null}
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
              <td key={cell.id} width={cell.column.getSize()}
                  {...cell.column.columnDef.meta?.cellProps}
              >
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
  );
};

export default TansTable;