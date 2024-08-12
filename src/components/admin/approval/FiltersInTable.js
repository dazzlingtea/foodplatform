import React from 'react';
import {BiSearch} from "react-icons/bi";
import styles from './FiltersInTable.module.scss';

const FiltersInTable = ({columnFilters, setColumnFilters}) => {
  const searchInput = columnFilters.find(f => f.id === 'name')?.value || "";

  const onFilterChange = (id, value) => setColumnFilters(
    prev => prev.filter(f => f.id !== id).concat({id, value})
  )

  return (
    <>
      <label className={styles['search-box']}>
        <BiSearch />
        <input
          type="text"
          placeholder="상호명으로 검색"
          value={searchInput}
          onChange={(e)=>onFilterChange('name', e.target.value)}
        />
      </label>
      {/*<FilterPopover columnFilters={columnFilters} setColumnFilters={setColumnFilters} />*/}
    </>
  );
};

export default FiltersInTable;