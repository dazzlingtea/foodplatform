import React from 'react';
import { BiSearch } from "react-icons/bi";
import styles from '../approval/FiltersInTable.module.scss';

const FiltersInTableIssue = ({ columnFilters, setColumnFilters }) => {
    // 현재 필터값을 검색 입력값으로 설정
    const searchInput = columnFilters.find(f => f.id === 'issueId')?.value || "";

    // 필터 변경 핸들러
    const onFilterChange = (id, value) => setColumnFilters(
        prev => prev.filter(f => f.id !== id).concat({ id, value })
    );

    return (
        <>
            <label className={styles['search-box']}>
                <BiSearch />
                <input
                    type="text"
                    placeholder="이슈 ID로 검색"
                    value={searchInput}
                    onChange={(e) => onFilterChange('issueId', e.target.value)}
                />
            </label>
        </>
    );
};

export default FiltersInTableIssue;
