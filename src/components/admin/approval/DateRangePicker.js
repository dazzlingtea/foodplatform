import React from 'react';
import DatePicker from "react-datepicker";
import styles from "./ApprovalTables.module.scss";
import {ko} from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import calStyles from "./DateRangePicker.css"

const DateRangePicker = ({startDate, endDate, dateFormat, onStart, onEnd, styleName}) => {

  const changeStartHandler = (date) => {
    onStart(date);
  }
  const changeEndHandler = (date) => {
    onEnd(date);
  }

  return (
    <div className={styles[styleName]}>
      <DatePicker
        locale={ko}
        selected={startDate}
        dateFormat={dateFormat}
        minDate={new Date('2024-06-01')} // minDate 이전 날짜 선택 불가
        maxDate={new Date()}
        onChange={changeStartHandler}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <span>{' ~ '}</span>
      <DatePicker
        locale={ko}
        selected={endDate}
        dateFormat={dateFormat}
        onChange={changeEndHandler}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        maxDate={new Date()}
      />
    </div>
  );
};

export default DateRangePicker;