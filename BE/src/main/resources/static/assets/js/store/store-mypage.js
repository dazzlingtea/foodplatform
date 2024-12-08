// ========= 전역 변수 =========
const BASE_URL = window.location.origin;

const calendarElement = document.getElementById('calendar');
const currentMonthElement = document.getElementById('current-month');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');

const $reservationList = document.querySelector('.reservation-list');

const $productCount = document.getElementById('product-count');

// 모달 관련 요소
const $reservationModal = document.getElementById('reservation-modal');
const $modalDetails = document.getElementById('modal-store-reservation-details');

const $productAddModal = document.getElementById('product-add-modal');
const $productAddDetails = document.getElementById('modal-product-count-details');
const $addProductButton = document.getElementById('product-update-btn');

const scheduleModal = document.getElementById('store-calendar-modal');
const modalDetailsElement = document.getElementById('modal-schedule-details');
const $closeModalButtons = document.querySelectorAll('.close');

let today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();

// ========= 함수 =========

async function updateCalendar(year, month) {
    calendarElement.innerHTML = '';

    // 요일 헤더 생성
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const headerRow = document.createElement('div');
    headerRow.classList.add('calendar-header');
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.classList.add('calendar-day-header');
        if (day === 'Sun') dayElement.classList.add('sunday');
        headerRow.appendChild(dayElement);
    });
    calendarElement.appendChild(headerRow);

    const date = new Date(year, month);
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    currentMonthElement.textContent = date.toLocaleDateString('default', {year: 'numeric', month: 'long'});

    // 빈 칸 추가
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('calendar-day-empty');
        calendarElement.appendChild(emptyCell);
    }

    // 날짜 추가
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = i;
        dayElement.classList.add('calendar-day');
        if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
            dayElement.classList.add('today');
            // dayElement.innerHTML = `<span class="circle">${i}</span>`; // Circle today's date
        }
        if (new Date(year, month, i).getDay() === 0) {
            dayElement.classList.add('sunday'); // Highlight Sundays in red
        }

        // Check if it's a holiday and add holiday class
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        const isHoliday = await checkHoliday(dateString); // You need to implement this function
        console.log(dateString, isHoliday);
        if (isHoliday) {
            dayElement.classList.add('holiday');
        }

        dayElement.addEventListener('click', () => showModal(year, month, i));
        calendarElement.appendChild(dayElement);
    }
}

async function checkHoliday(dateString) {
    try {
        const response = await fetch(`${BASE_URL}/store/mypage/main/calendar/check/holiday`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({date: dateString}) // dateString을 JSON 형식으로 변환하여 보냄
        });
        console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const isHoliday = await response.json();
        return isHoliday;
    } catch (error) {
        console.error('Error checking holiday:', error);
        return false; // Default to false if there's an error
    }
}


async function showModal(year, month, day) {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dateStringKr = `${year}년 ${String(month + 1).padStart(2, '0')}월 ${String(day).padStart(2, '0')}일`;
    let tag = ``;
    console.log(dateString);
    try {
        const response = await fetch(`${BASE_URL}/store/mypage/main/calendar/modal/${dateString}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const res = await response.json();
        console.log("pickupTime, openAt, productCnt, canceledByStoreAt");
        console.log(res);

        const isHoliday = await checkHoliday(dateString);

        tag = `<div>오픈 시간: ${res.openAt || 'N/A'}</div>
            <div>픽업 마감 시간: ${res.closedAt || 'N/A'}</div>\
<!--                <div>마감 시간: ${res.closedAt || 'N/A'}</div>-->
               <div>업데이트 될 기본 수량: ${res.productCnt || 'N/A'}</div>
              `;

        let tag2 = `<div>총 등록된 수량: ${res.todayProductCnt || 'N/A'}</div>
                <div>총 팔린 수량: ${res.todayPickedUpCnt || 'N/A'}</div>`

        const selectedDate = new Date(year, month, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Compare dates without time
        let $storeCloseButton = ''; // 버튼 초기화
        // let $setPickUpTimeButton = ''; // 버튼 초기화
        let $cancelStoreCloseButton = ''; // 버튼 초기화
        if (selectedDate > today) {
            $storeCloseButton = '<button class="calendar-button" id="store-holiday-btn">휴무일로 지정하기</button>';
            // $setPickUpTimeButton = '<button id="set-pickup-time-btn">픽업 시간 설정하기</button>';
            $cancelStoreCloseButton = '<button class="calendar-button" id="undo-holiday-btn">휴무일 지정 취소하기</button>';
        }
        let normalTag = `<div class="today-date">${dateStringKr}</div>` + tag + $storeCloseButton + '<br>';

        let holidayTag = `<div class="today-date">${dateStringKr}</div>` + '<div>휴무일로 지정되었습니다.</div>' + '<br>' + $cancelStoreCloseButton;

        let passedTag = `<div class="today-date">${dateStringKr}</div>` + tag + tag2 + '<br>';

        let tags = ``;
        if (isHoliday) {
            tags = holidayTag;
        }
        if (!isHoliday && selectedDate <= today) {
            tags = passedTag;
        }
        if (!isHoliday && selectedDate > today) {
            tags = normalTag;
        }
        modalDetailsElement.innerHTML = tags;
        scheduleModal.style.display = 'block';

        const undoHolidayButton = modalDetailsElement.querySelector('#undo-holiday-btn');
        if (undoHolidayButton) {
            undoHolidayButton.addEventListener('click', async () => {
                try {
                    console.log('휴무일 지정 취소하기 버튼 클릭');
                    console.log(dateString);
                    const response = await fetch(`${BASE_URL}/store/mypage/main/calendar/undoHoliday`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            holidayDate: dateString // 휴무일로 지정된 날짜
                        })
                    });

                    const result = await response.json();
                    if (result === true) {
                        console.log('휴무일 지정이 취소되었습니다.');
                        alert('휴무일 지정이 취소되었습니다.') ? closeModal(scheduleModal) : closeModal(scheduleModal)
                        // modalDetailsElement.innerHTML = normalTag;
                        // 여기에 필요한 UI 업데이트 로직 추가
                        updateCalendar(currentYear, currentMonth); // 예시로 달력 업데이트
                    }
                } catch (error) {
                    console.error('Error setting holiday:', error);
                    // 에러 처리 로직 추가
                }
            });
        }

        // 버튼 이벤트 리스너 추가
        const button = modalDetailsElement.querySelector('#store-holiday-btn');
        if (button) {
            button.addEventListener('click', async () => {
                try {
                    console.log('휴무일로 지정하기 버튼 클릭')
                    console.log(dateString);
                    const response = await fetch(`${BASE_URL}/store/mypage/main/calendar/setHoliday`, {
                        method: 'POST', headers: {
                            'Content-Type': 'application/json'
                        }, body: JSON.stringify({
                            holidayDate: dateString // 휴무일로 지정할 날짜
                        })
                    });

                    const result = await response.json();
                    if (result === true) {
                        console.log('휴무일로 지정되었습니다.');
                        // 여기에 필요한 UI 업데이트 로직 추가
                        alert('휴무일로 지정되었습니다.') ? closeModal(scheduleModal) : closeModal(scheduleModal);
                        // modalDetailsElement.innerHTML = holidayTag;
                        // 예를 들어, 달력에서 휴무일로 지정된 날짜에 표시 변경 등
                        updateCalendar(currentYear, currentMonth); // 예시로 달력 업데이트
                    } else {
                        console.error('휴무일로 지정 실패');
                        // 실패 시 처리 로직 추가
                    }

                } catch (error) {
                    console.error('Error setting holiday:', error);
                    // 에러 처리 로직 추가
                }
            });
        }

        const pickupSettingBtn = modalDetailsElement.querySelector('#set-pickup-time-btn');
        if (pickupSettingBtn) {
            pickupSettingBtn.addEventListener('click', async () => {
                try {
                    pickupSettingBtn.textContent = '확인';

                    // <input type="time"> 요소 추가
                    const inputTime = document.createElement('input');
                    inputTime.setAttribute('type', 'time');
                    inputTime.setAttribute('id', 'pickup-time-input');

                    const response = await fetch(`${BASE_URL}/store/mypage/main/calendar/modal/${dateString}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const res = await response.json();
                    console.log("pickupTime, openAt, productCnt, canceledByStoreAt, closedAt");
                    console.log(res);

                    // 오픈 시간 1시간 이후의 시간을 선택할 수 있도록 설정
                    // const now = new Date();
                    const hours = res.openAt.split(':')[0] * 1 + 1;
                    const minutes = res.openAt.split(':')[1];

                    const maxHours = res.closedAt.split(':')[0];
                    const maxMinutes = res.closedAt.split(':')[1];
                    inputTime.setAttribute('min', `${hours}:${minutes}`);
                    inputTime.setAttribute('max', `${maxHours}:${maxMinutes}`);

                    // 추가된 input 요소를 삽입할 위치를 찾아서 추가합니다.
                    const buttonContainer = button.parentNode;
                    buttonContainer.appendChild(inputTime);

                } catch (error) {
                    console.error('Error setting pickup time:', error);
                    // 에러 처리 로직 추가
                }
            });
        }

    } catch (error) {
        console.error('Error fetching schedule:', error);
        // 에러 처리 로직 추가
    }
}


// 모달 닫기 =================
function closeModal(modal) {
    modal.style.display = 'none';
}

$closeModalButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

window.addEventListener('click', (event) => {
    if (event.target === scheduleModal) {
        closeModal(scheduleModal);
    }

    if (event.target === $reservationModal) {
        closeModal($reservationModal);
    }

    if (event.target === $productAddModal) {
        closeModal($productAddModal);
    }
});

// 수량 추가 모달 열기

$addProductButton.addEventListener('click', async e => {
    try {
        const res = await fetch(`${BASE_URL}/store/mypage/main/getProductCnt`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const products = await res.json();
        console.log(products);
        let updateCount = 0;
        let initialCount = products.remainCnt;
        let tag = `
            <div class="product-add-item">
                <img src="/assets/img/caution2.png" alt="경고 이미지">
                <div>수량 추가 후 되돌리기 불가합니다.</div>
                <div>신중히 선택해주세요</div>
                <div id="product-amount-adjust-btn">
                    <button id="decrease-btn" class="yellow-click" disabled><i class="fas fa-minus"></i></button>
                    <p id="product-update-count">${initialCount}</p>
                    <button id="increase-btn" class="yellow-click"><i class="fas fa-plus"></i></button>
                </div>
                <div>오늘 남은 수량</div>
                <div>추가되는 상품 수: <span id="product-update-amount">${updateCount}</span></div>
                <button id="update-btn" class="yellow-click" disabled>추가 확인</button>
            </div>
        `;

        $productAddDetails.innerHTML = tag;
        $productAddModal.style.display = "block";

        const $increaseBtn = document.getElementById('increase-btn');
        const $decreaseBtn = document.getElementById('decrease-btn');
        const $productCount = document.getElementById('product-update-count');
        const $updateBtn = document.getElementById('update-btn');
        const $productUpdateAmount = document.getElementById('product-update-amount');

        $increaseBtn.addEventListener('click', () => {
            initialCount++;
            updateCount++;
            $productCount.textContent = initialCount;
            $productUpdateAmount.textContent = updateCount;
            $decreaseBtn.disabled = false; // 활성화
            $updateBtn.disabled = false; // 활성화
        });

        $decreaseBtn.addEventListener('click', () => {
            if (initialCount > products.remainCnt) {
                initialCount--;
                updateCount--;
                $productCount.textContent = initialCount;
                $productUpdateAmount.textContent = updateCount;
                if (initialCount <= products.remainCnt) {
                    $decreaseBtn.disabled = true; // 비활성화
                }
                if (initialCount === products.remainCnt) {
                    $updateBtn.disabled = true; // 비활성화
                }
            }
        });

        $updateBtn.addEventListener('click', async () => {
            try {
                const newUpdateCount = Number(updateCount);
                // 여기서 업데이트 로직을 추가
                console.log('업데이트하기 버튼 클릭');
                const response = await fetch(`${BASE_URL}/store/mypage/main/updateProductCnt`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        newCount: newUpdateCount // 업데이트할 수량
                    })
                });

                const result = await response.json();
                if (result === true) {
                    $updateBtn.disabled = true; // 업데이트 버튼 비활성화
                    alert('수량이 업데이트되었습니다.') ? closeModal($productAddModal) : closeModal($productAddModal);

                    await updateProductCount();
                    // 여기에 필요한 UI 업데이트 로직 추가
                } else {
                    console.error('수량 업데이트 실패');
                    // 실패 시 처리 로직 추가
                }

            } catch (error) {
                console.error('Error updating product count:', error);
                // 에러 처리 로직 추가
            }
        });

    } catch (error) {
        console.error('Error fetching product count:', error);
    }
});


// 예약 내역 모달 열기
// 모달 열기
async function openModal(reservationId) {

    const res = await fetch(`${BASE_URL}/reservation/${reservationId}/modal/detail`);
    const reservationR = await res.json();
    console.log(reservationR);


    // const reservationItem = document.querySelector(`.reservation-item[data-reservation-id="${reservationId}"]`);
    console.log(reservationId);
    if (!reservationR) {
        console.error(`Reservation with ID ${reservationR} not found.`);
        return;
    }

    let tag = '';
    if (reservationR.status === 'CANCELED') {
        tag = `
        <div class="reservation-detail-item" data-reservation-id="${reservationId}">
        <img src="/assets/img/cancel-stress.png" alt="취소 이미지">
            <p>예약이 취소되었습니다.</p>
            <p>취소 시간: ${reservationR.cancelReservationAtF}</p>
        </div>
        `;
    }
    if (reservationR.status === 'RESERVED') {
        tag = `
        <div class="reservation-detail-item" data-reservation-id="${reservationId}">
            <img src="/assets/img/caution2.png" alt="경고 이미지">
            <p class="caution">픽업 닉네임을 확인 해주세요</p>
<!--            <img src="${reservationR.profileImage}" alt="Customer profile image">-->
            <p class="pickup-nickname">닉네임: <span>${reservationR.nickname}</span></p>
            <p class="modal-reservation-status"> 픽업 대기 중 </p>
            <p class="pickup-time">픽업 마감 시간: <span>${reservationR.pickupTimeF}</span></p>
        </div>
        `;
    }
    if (reservationR.status === 'PICKEDUP') {
        tag = `
        <div class="reservation-detail-item" data-reservation-id="${reservationId}">
            <img src="/assets/img/pickedup-happy.png" alt="체크 이미지">
            <p></p>
<!--            <img src="${reservationR.profileImage}" alt="고객 이미지">-->
            <p>픽업 닉네임: <span style="font-family: 'jua'; font-size: 25px">${reservationR.nickname}<span></p>
            <p>픽업이 완료되었습니다.</p>
            <p>픽업 시간: ${reservationR.pickedUpAtF}</p>
        </div>
        `;
    }
    if (reservationR.status === 'NOSHOW') {
        tag = `
        <div class="reservation-detail-item" data-reservation-id="${reservationId}">
            <img src="/assets/img/noshow-sad.png" alt="노쇼 이미지">
            <p>픽업 마감 시간까지 픽업되지 않았습니다.</p>
            <p>픽업 마감 시간: ${reservationR.pickupTimeF}</p>
        </div>
        `;
    }


    // 모달에 데이터 추가
    $modalDetails.innerHTML = tag;

    $reservationModal.style.display = "block";
}


// 모달 열기 이벤트
$reservationList.addEventListener('click', e => {
    // if (e.target.matches('.reservation-cancel-btn')) return; // 예약 취소 버튼일 경우 모달 열기 방지

    if (e.target.closest('.reservation-item')) {
        // openModal($reservationModal);
        openModal(e.target.closest('.reservation-item').dataset.reservationId);
    }
});

async function updateProductCount() {
    try {
        // 서버에서 데이터 가져오기
        const response = await fetch(`${BASE_URL}/store/mypage/main/getProductCount`);
        if (!response.ok) {
            throw new Error('Failed to fetch product count');
        }
        const data = await response.json();
        console.log(data); // 데이터 확인용

        // UI 업데이트
        const $count = document.getElementById('count');
        const $todayPickedUp = document.getElementById('today-picked-up');
        const $todayReadyPickedUp = document.getElementById('today-ready-picked-up');
        const $remain = document.getElementById('remain');

        $count.textContent = `${data.todayProductCnt}개 등록되었어요`;
        $todayPickedUp.textContent = `${data.todayPickedUpCnt}개 픽업완료`;
        $todayReadyPickedUp.textContent = `${data.readyToPickUpCnt}개 픽업하러 오는 중`;

        if (data.remainCnt === 0) {
            $remain.textContent = '남은 랜덤박스가 없어요';
        } else {
            $remain.textContent = `${data.remainCnt}개 예약 기다리는 중`;
        }
    } catch (error) {
        console.error('Error updating product count:', error);
    }
}

// ========= 함수 실행 =========

document.addEventListener('DOMContentLoaded', async () => {
    await updateProductCount();

    prevMonthButton.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar(currentYear, currentMonth);
    });

    nextMonthButton.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar(currentYear, currentMonth);
    });

    updateCalendar(currentYear, currentMonth);
});
