import React, { useEffect, useMemo, useState } from 'react';
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import styles from './ChattingList.module.scss';
import TansTable from "../approval/TansTable";
import TansPagination from "../approval/TansPagination";
import { IssueColumns } from "./IssueColumns";
import IssueSummary from "./IssueSummary";
import { useModal } from "../../../pages/common/ModalProvider";
import { checkAuthToken, getUserRole } from "../../../utils/authUtil";
import { useNavigate } from "react-router-dom";
import { ISSUE_URL } from "../../../config/host-config";
import FiltersInTable from "../approval/FiltersInTable";
import FiltersInTableIssue from "./FiltersInTableIssue";

const ChattingList = () => {
    const { openModal } = useModal();
    const [data, setData] = useState([]);
    const columns = useMemo(() => IssueColumns(openModal), [openModal]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const [stats, setStats] = useState({});
    const navigate = useNavigate();

    // React Table 설정
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

    // 상태별 및 날짜별 정렬
    const sortData = (data) => {
        return data.sort((a, b) => {
            // 상태가 PENDING인 항목이 먼저 오도록
            if (a.status === 'PENDING' && b.status !== 'PENDING') return -1;
            if (a.status !== 'PENDING' && b.status === 'PENDING') return 1;

            // 날짜 기준으로 최신 순으로 정렬
            return new Date(b.date) - new Date(a.date);
        });
    };

    const calculateStats = (data) => {
        const PENDING = data.filter((item) => item.status === 'PENDING').length;
        const SOLVED = data.filter((item) => item.status === 'SOLVED').length;
        const CLOSED = data.filter((item) => item.status === 'CANCELLED').length;

        setStats({ PENDING, SOLVED, CLOSED });
    };

    const fetchChatList = async () => {
        const res = await fetch(ISSUE_URL, {
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
        const sortedData = sortData(DATA); // 정렬된 데이터
        setData(sortedData);
        calculateStats(sortedData);
    };

    useEffect(() => {
        fetchChatList();

        // 데이터 자동 새로고침 설정 (5초마다)
        const intervalId = setInterval(fetchChatList, 5000);

        // 컴포넌트 언마운트 시 interval 정리
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const userInfo = checkAuthToken(navigate);

        if (userInfo) {
            const requiredRole = 'admin';
            const userRole = getUserRole();

            if (userRole !== requiredRole) {
                alert('접근 권한이 없습니다.');
                navigate('/main');
            }
        }
    }, [navigate]);

    return (
        <div className={styles.chatListContainer}>
            <IssueSummary stats={stats} />
            <FiltersInTableIssue columnFilters={columnFilters} setColumnFilters={setColumnFilters}/>
            <TansTable table={table} />
            <TansPagination style={styles.tansPageContainer} table={table} />
        </div>
    );
};

export default ChattingList;
