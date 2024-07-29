import React, { useState, useEffect } from 'react';
import styles from './Calendar.module.scss';
import { useModal } from "../../../pages/common/ModalProvider"

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [holidays, setHolidays] = useState([]);
    const { openModal } = useModal();

    useEffect(() => {
        updateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    }, [currentDate]);

    const updateCalendar = async (year, month) => {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

        for (let i = 0; i < firstDay; i++) {
            daysArray.unshift('');
        }

        setDaysInMonth(daysArray);

        // const fetchedHolidays = await fetchHolidays(year, month);
        // setHolidays(fetchedHolidays);
    };

    // const fetchHolidays = async (year, month) => {
    //     try {
    //         const response = await fetch(`/store/mypage/main/calendar/getHoliday`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ date: `${year}-${month + 1}-01` })
    //         });

    //         if (!response.ok) {
    //             console.error('Failed to fetch holidays');
    //             return [];
    //         }

    //         const holidays = await response.json();
    //         if (Array.isArray(holidays)) {
    //             return holidays;
    //         } else {
    //             console.error('Fetched holidays is not an array');
    //             return [];
    //         }
    //     } catch (error) {
    //         console.error('Error fetching holidays:', error);
    //         return [];
    //     }
    // };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const isHoliday = (day) => {
        const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return holidays.includes(dateString);
    };

    const handleDayClick = async (day) => {
        if (!day) return;
        const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const isPast = selectedDate <= new Date(new Date().setHours(0, 0, 0, 0));

        const scheduleDetail = {
            date: selectedDate,
            openTime: "09:00",
            closeTime: "18:00",
            totalProducts: 50,
            soldProducts: isPast ? 30 : undefined,
            isPast: isPast,
            isHoliday: isHoliday(day),
            // handleSetHoliday: () => handleSetHoliday(selectedDate),
            // handleUndoHoliday: isHoliday(day) ? () => handleUndoHoliday(selectedDate) : null
        };

        openModal('scheduleDetail', { scheduleDetail });
    };

    // // 휴무일을 설정하는 함수 (더미 데이터를 사용하므로 주석 처리)
    // const handleSetHoliday = async (date) => {
    //     try {
    //         const response = await fetch(`/store/mypage/main/calendar/setHoliday`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ date })
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to set holiday');
    //         }

    //         // 휴무일 설정 성공 시, 휴무일 목록 갱신
    //         const updatedHolidays = await fetchHolidays(date.getFullYear(), date.getMonth());
    //         setHolidays(updatedHolidays);
    //     } catch (error) {
    //         console.error('Error setting holiday:', error);
    //     }
    // };
    //
    // // 휴무일을 취소하는 함수 (주석)
    // const handleUndoHoliday = async (date) => {
    //     try {
    //         const response = await fetch(`/store/mypage/main/calendar/undoHoliday`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ holidayDate: date })
    //         });
    //
    //         if (!response.ok) {
    //             throw new Error('Failed to undo holiday');
    //         }
    //
    //         // 휴무일 취소 성공 시, 휴무일 목록 갱신
    //         const updatedHolidays = await fetchHolidays(date.getFullYear(), date.getMonth());
    //         setHolidays(updatedHolidays);
    //     } catch (error) {
    //         console.error('Error undoing holiday:', error);
    //     }
    // };

    const isToday = (day) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        );
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
                            <div key={day} className={`${styles.calendarDayHeader} ${day === 'Sun' ? styles.sunday : ''}`}>{day}</div>
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

export default Calendar