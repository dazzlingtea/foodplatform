import {authFetch} from "../../utils/authUtil";
import {BACK_HOST, BASE_URL, RESERVATION_URL} from "../../config/host-config";

// const BASE_URL = window.location.origin;

export const createReservation = async (customerId, storeId, cnt) => {
    try {
      const response = await authFetch(`${BASE_URL}/reservation/create-reservation?customerId=${encodeURIComponent(customerId)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeId: storeId,
          cnt: `${cnt}`,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`예약 요청 실패: ${errorData.message || '알 수 없는 오류 발생'}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('예약 처리 중 오류 발생:', error);
      throw error;
    }
  };
  