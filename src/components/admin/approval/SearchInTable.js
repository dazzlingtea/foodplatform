import React from 'react';
import {BiSearch} from "react-icons/bi";
import styles from './SearchInTable.module.scss';

const SearchInTable = ({columnFilters, setColumnFilters}) => {
  const searchInput = columnFilters.find(f => f.id === 'name')?.value || "";

  const onFilterChange = (id, value) => setColumnFilters(
    prev => prev.filter(f => f.id !== id).concat({id, value})
  )

  return (
    <>
      <div >
        <label className={styles['search-box']}>
          <BiSearch />
          <input
            type="text"
            placeholder="상호명으로 검색"
            value={searchInput}
            onChange={(e)=>onFilterChange('name', e.target.value)}
          />
        </label>
      </div>
    </>
  );
};

export default SearchInTable;