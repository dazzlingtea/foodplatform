import React, {useEffect, useMemo, useState} from 'react';
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
import {IssueColumns} from "./IssueColumns";
import IssueSummary from "./IssueSummary";
import {useModal} from "../../../pages/common/ModalProvider";
import {checkAuthToken, getUserRole} from "../../../utils/authUtil";
import {useNavigate} from "react-router-dom";
import {ISSUE_URL} from "../../../config/host-config";

const ChattingList = () => {
    const {openModal} = useModal();
    const [data, setData] = useState([]);
    const columns = useMemo(() => IssueColumns(openModal), [openModal]); // openModal을 prop으로 전달
    const [columnFilters, setColumnFilters] = useState([]);
    const [rowSelection, setRowSelection] = useState({}); // 선택한 행
    const [stats, setStats] = useState({});
    const navigate = useNavigate();

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

    const calculateStats = (data) => {
        const PENDING = data.filter((item) => item.status === 'PENDING').length;
        const SOLVED = data.filter((item) => item.status === 'SOLVED').length;
        const CLOSED = data.filter((item) => item.status === 'CLOSED').length;

        setStats({PENDING, SOLVED, CLOSED});
    }

    const fetchChatList = async () => {

        let userRole = getUserRole();
        console.log("userRole :", userRole);

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
        console.log('DATA:', DATA)
        setData(DATA);

        calculateStats(DATA);
    };

    useEffect(() => {
        fetchChatList();
    }, []);

    // useEffect 훅 사용하여 admin이 아닐 경우 접근 제한
    useEffect(() => {
            // debugger
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

    return (
        <div className={styles.chatListContainer}>
            <IssueSummary stats={stats}/>
            {/*<div className={styles.tableInteraction}>*/}
            {/*    /!*<FiltersInTable columnFilters={columnFilters} setColumnFilters={setColumnFilters} />*!/*/}
            {/*</div>*/}
            <TansTable table={table}/>
            <TansPagination style={styles.tansPageContainer} table={table}/>
        </div>
    );
};

export default ChattingList;
