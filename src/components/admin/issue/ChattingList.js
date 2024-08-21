import React, { useEffect, useMemo, useState } from 'react';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import styles from './ChattingList.module.scss';
import FiltersInTable from "../approval/FiltersInTable";
import TansTable from "../approval/TansTable";
import TansPagination from "../approval/TansPagination";
import { IssueColumns } from "./IssueColumns";
import IssueSummary from "./IssueSummary";
import {useModal} from "../../../pages/common/ModalProvider";

const ChattingList = () => {
    const { openModal } = useModal();
    const [data, setData] = useState([]);
    const columns = useMemo(() => IssueColumns(openModal), [openModal]); // openModal을 prop으로 전달
    const [columnFilters, setColumnFilters] = useState([]);
    const [rowSelection, setRowSelection] = useState({}); // 선택한 행
    const [stats, setStats] = useState({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            columnFilters,
            rowSelection,
        },
    });

    const fetchChatList = async () => {
        console.log('이슈 목록들 불러오기 실행 중!!');

        const res = await fetch('/issue', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
        });

        if (!res.ok) {
            const errorMessage = await res.text();
            alert(errorMessage);
            return null;
        }

        const DATA = await res.json();
        console.log('DATA:', DATA)
        setData(DATA);
    };

    useEffect(() => {
        console.log('chatting list useEffect 실행중!');
        fetchChatList();
    }, []);

    return (
        <div className={styles.chatListContainer}>
            <IssueSummary stats={stats} />
            {/*<div className={styles.tableInteraction}>*/}
            {/*    /!*<FiltersInTable columnFilters={columnFilters} setColumnFilters={setColumnFilters} />*!/*/}
            {/*</div>*/}
            <TansTable style={styles.tansTable} table={table} />
            <TansPagination style={styles.tansPageContainer} table={table} />
        </div>
    );
};

export default ChattingList;
