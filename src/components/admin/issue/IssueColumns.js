import React from "react";
import {BACK_HOST, ISSUE_URL} from "../../../config/host-config";
const BASE_URL = window.location.origin;

const centerFlex = {style: {justifyContent: 'center', paddingLeft: '0'}};
export const IssueColumns = (openModal) => [
    {
        accessorKey: 'issueId',
        header: '이슈 ID',
        cell: (props) => <p>{props.getValue()}</p>,
        size: 80,
        meta: {
            cellProps: centerFlex,
        },
        filterFn: (row, columnId, filterValue) => {
            const cellValue = row.getValue(columnId).toString();
            return cellValue.includes(filterValue);
        },
    },
    {
        accessorKey: 'customerId',
        header: '고객 ID',
        cell: (props) => <p>{props.getValue()}</p>,
        size: 150,
        meta: {
            cellProps: centerFlex,
        },
    },
    {
        accessorKey: 'issueCategory',
        header: '문의 유형',
        cell: (props) => <p>{props.getValue()}</p>,
        size: 150,
        meta: {
            cellProps: centerFlex,
        },
    },
    {
        accessorKey: 'status',
        header: '해결 여부',
        cell: (props) => (
            <p>{props.getValue()}</p>
        ),
        size: 150,
        meta: {
            cellProps: centerFlex,
        },
    },
    {
        accessorKey: 'makeIssueAt',
        header: '등록일',
        cell: (props) => <p>{formatDate(props.getValue())}</p>,
        size: 150,
        meta: {
            cellProps: centerFlex,
        },
    },
    {
        id: 'moveToChat',
        header: '채팅내역 및 채팅방 이동',
        cell: (props) => {

            const status = props.row.original.status; // Assuming `issueCompleteAt` is null or falsy when incomplete

            const handleMoveToChat = () => {
                const issueId = props.row.original.issueId; // Replace with the correct identifier for your issue
                openModal('adminIssueChatting', {issueId});
            };

            const handleIssueReview = async () => {
                const issueId = props.row.original.issueId; // Replace with the correct identifier for your issue

                try{
                    const res = await fetch(`${ISSUE_URL}/detail?issueId=${issueId}`, {
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

                    const issueDetail = await res.json();

                    const reservationId = issueDetail.reservationId;
                    try{
                        const response = await fetch(`${BACK_HOST}/reservation/${reservationId}/modal/detail`);

                        if (!res.ok) {
                            const errorMessage = await response.text();
                            alert(errorMessage);
                            return null;
                        }
                        const reservationDetail = await response.json();

                        try {
                            const resp = await fetch(ISSUE_URL + `/photo/${issueId}`);

                            if (!resp.ok) {
                                const errorMessage = await resp.text();
                                alert(errorMessage);
                                return null;
                            }

                            const issuePhotos = await resp.json();

                            openModal('adminIssueReview', {issueId, issueDetail, reservationDetail, issuePhotos});

                        }catch (e) {
                            console.error('Error fetching photo data:', e);
                            alert('Failed to fetch photo data.');
                        }




                    }catch (e) {
                        console.error('Error fetching reservation data:', e);
                        alert('Failed to fetch reservation data.');
                    }


                } catch (e) {
                    console.error('Error fetching issue data:', e);
                    alert('Failed to fetch issue data.');
                }


            }

            return (
                status !== "PENDING" ? (
                    <button style={{padding:'8px' , background: 'lightgrey', color: 'black', width: '110px', borderRadius: '8px'}} onClick={handleIssueReview}>
                        이슈 조회하기
                    </button>
                ) : (
                    <button style={{padding:'8px', width: '110px', background: 'cornflowerblue', color: '#faf9f9', borderRadius: '8px'}} onClick={handleMoveToChat}>
                        채팅방으로 이동
                    </button>
                )
            );
        },
        size: 170,
        meta: {
            cellProps: centerFlex,
        },
    },
];

// Date formatting function
const formatDate = (dateTimeStr) => {
    const inputDateTime = new Date(dateTimeStr);
    const today = new Date();

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

     if (isThisYear) {  // 올해인 경우 월일과 시간 포맷팅
        return `${month}-${day} ${hours}:${minutes}`;
    } else {  // 그 외의 경우 연월일과 시간 포맷팅
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
};

