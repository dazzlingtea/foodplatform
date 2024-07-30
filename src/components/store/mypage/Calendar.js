import React, { useState, useEffect } from 'react';
import styles from './Calendar.module.scss';
import { useModal } from "../../../pages/common/ModalProvider";

const BASE_URL = window.location.origin;

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [holidays, setHolidays] = useState([]);
    const [storeInfo, setStoreInfo] = useState({});
    const { openModal } = useModal();

    /**
     * 가게 정보를 가져오는 함수
     */
    const fetchStoreInfo = async () => {
        try {
            const response = await fetch(`${BASE_URL}/store/info`);
            if (!response.ok) {
                throw new Error('Failed to fetch store info');
            }
            const data = await response.json();
            setStoreInfo(data);
        } catch (error) {
            console.error('Error fetching store info:', error);
        }
    };

    /**
     * 현재 달의 날짜와 휴무일 정보를 업데이트하는 함수
     * @param year 연도
     * @param month 월
     */
    const updateCalendar = async (year, month) => {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

        for (let i = 0; i < firstDay; i++) {
            daysArray.unshift('');
        }

        setDaysInMonth(daysArray);

        const fetchedHolidays = await fetchHolidays(year, month);
        setHolidays(fetchedHolidays);
    };

    /**
     * 컴포넌트가 마운트될 때 현재 달의 날짜와 휴무일 정보를 업데이트함
     */
    useEffect(() => {
        fetchStoreInfo(); // 가게 정보 가져오기
        updateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    }, [currentDate]);

    /**
     * 휴무일 정보를 서버에서 가져오는 함수
     * @param year 연도
     * @param month 월
     * @returns 휴무일 배열
     */
    const fetchHolidays = async (year, month) => {
        try {
            const response = await fetch(`${BASE_URL}/store/calendar/getHoliday`);
            if (!response.ok) {
                console.error('Failed to fetch holidays');
                return [];
            }

            const holidays = await response.json();
            if (Array.isArray(holidays)) {
                return holidays.map(holiday => {
                    const holidayDate = new Date(holiday.holidays);
                    return {
                        year: holidayDate.getFullYear(),
                        month: holidayDate.getMonth(),
                        day: holidayDate.getDate()
                    };
                });
            } else {
                console.error('Fetched holidays is not an array');
                return [];
            }
        } catch (error) {
            console.error('Error fetching holidays:', error);
            return [];
        }
    };


    /**
     * 이전 달로 이동하는 함수
     */
    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    /**
     * 다음 달로 이동하는 함수
     */
    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    /**
     * 해당 날짜가 휴무일인지 확인하는 함수
     * @param day 일(day)
     * @returns 휴무일 여부
     */
    const isHoliday = (day) => {
        return holidays.some(holiday =>
            holiday.year === currentDate.getFullYear() &&
            holiday.month === currentDate.getMonth() &&
            holiday.day === day
        );
    };
    

    /**
     * 날짜 formatting
     * @param date - Date 타입
     * @returns {`${number}-${string}-${string}`}
     */
    const toFormattedDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        console.log(`formatted date : ${year}-${month}-${day}`);
        return `${year}-${month}-${day}`;
    };


    /**
     * 특정 날짜를 휴무일로 설정하는 함수
     * @param {string} date - 설정할 날짜 (yyyy-mm-dd 형식의 문자열)
     * @returns {Promise<boolean>} 성공 여부 (true 또는 false)
     */
    const handleSetHoliday = async (date) => {
        console.log('휴무지정 서버로 보내는 날짜:', date);
        try {
            const response = await fetch(`${BASE_URL}/store/calendar/setHoliday`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ holidayDate: date }),
            });
            if (response.ok) {
                const fetchedHolidays = await fetchHolidays(currentDate.getFullYear(), currentDate.getMonth());
                setHolidays(fetchedHolidays);
                return true;
            } else {
                throw new Error('Failed to set holiday');
            }
        } catch (error) {
            console.error('Error setting holiday:', error);
            return false;
        }
    };

    /**
     * 특정 날짜의 휴무일 설정을 취소하는 함수
     * @param {string} date - 설정을 취소할 날짜 (yyyy-mm-dd 형식의 문자열)
     * @returns {Promise<boolean>} 성공 여부 (true 또는 false)
     */
    const handleUndoHoliday = async (date) => {
        console.log('휴무취소 서버로 보내는 날짜:', date); // 서버로 전송되는 날짜를 출력합니다.
        try {
            const response = await fetch(`${BASE_URL}/store/calendar/undoHoliday`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ holidayDate: date }),
            });
            if (response.ok) {
                const fetchedHolidays = await fetchHolidays(currentDate.getFullYear(), currentDate.getMonth());
                setHolidays(fetchedHolidays);
                return true;
            } else {
                throw new Error('Failed to undo holiday');
            }
        } catch (error) {
            console.error('Error undoing holiday:', error);
            return false;
        }
    };

    /**
     * 해당 날짜가 오늘인지 확인하는 함수
     * @param day 일(day)
     * @returns 오늘 여부
     */
    const isToday = (day) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        );
    };

    /**
     * 특정 날짜를 클릭했을 때 호출되는 함수
     * @param day 일(day)
     */
    const handleDayClick = async (day) => {
        if (!day) return;
        const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day, 9);
        const tempSelectedDate = selectedDate.setHours(0, 0, 0, 0); // 오늘 날짜와 클릭한 날짜 비교 위한 시간 설정

        const today = new Date(new Date().setHours(0, 0, 0, 0));
        
        const isPast = tempSelectedDate <= today;

        let calendarDetailDto;

        try {
            const response = await fetch(`${BASE_URL}/store/calendar/modal/${toFormattedDate(selectedDate)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch picked up products count');
            }
            calendarDetailDto = await response.json();
            console.log(calendarDetailDto);
        } catch (error) {
            console.error('Error fetching picked up products count:', error);
            calendarDetailDto = {};
        }


        const scheduleDetail = {
            date: selectedDate,
            openTime: calendarDetailDto.openAt,
            closeTime: calendarDetailDto.closedAt,
            totalProducts: calendarDetailDto.productCnt,
            soldProducts: isPast ? calendarDetailDto.todayPickedUpCnt : undefined,
            updatedProduct: isPast ? calendarDetailDto.todayProductCnt : 0,
            isPast: isPast,
            isHoliday: isHoliday(day),
            handleSetHoliday: () => handleSetHoliday(toFormattedDate(selectedDate)),
            handleUndoHoliday: () => handleUndoHoliday(toFormattedDate(selectedDate)),
        };

        openModal('scheduleDetail', {scheduleDetail});
    };

    
    return (
        <div className={styles.calendarContainer}>
            <div className={styles.calend}>
                <h3 className={styles.titleText}>
                    <span>가게 스케줄 조정</span>
                </h3>
                <div className={styles.calendarSection}>
                    <div className={styles.calendarMonth}>
                        <div className={styles.dayDescription}>
                            <span className={styles.todayDescription}>오늘</span>
                            <span className={styles.holidayDescription}>가게 쉬는 날</span>
                        </div>
                        <div className={styles.monthBtnContainer}>
                            <button className={styles.calendarButton} onClick={handlePrevMonth}>
                                이전 달
                            </button>
                            <span className={styles.currentMonth}>
                                {currentDate.toLocaleDateString('default', {year: 'numeric', month: 'long'})}
                            </span>
                            <button className={styles.calendarButton} onClick={handleNextMonth}>
                                다음 달
                            </button>
                        </div>
                    </div>
                    <div className={styles.calendar}>
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <div key={day} 
                                className={`${styles.calendarDayHeader} ${day === 'Sun' ? styles.sunday : ''}`}>{day}</div>
                        ))}
                        {daysInMonth.map((day, index) => (
                            <div
                                key={index}
                                className={`${styles.calendarDay} ${day ? (isHoliday(day) ? styles.holiday : '') : styles.calendarDayEmpty} ${isToday(day) ? styles.today : ''}`}
                                onClick={() => handleDayClick(day)}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
