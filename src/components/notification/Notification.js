import React, {useEffect, useRef, useState} from 'react';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import styles from './Notification.module.scss';
import {IoNotificationsOutline} from "react-icons/io5";
import {authFetch} from "../../utils/authUtil";
import {useLocation, useNavigate} from "react-router-dom";
import {GoArrowRight} from "react-icons/go";
import {BASE_URL, NOTIFICATION_URL, REVIEW_URL} from "../../config/host-config";

const Notification = ({email, role}) => {
  const [stompClient, setStompClient] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const location = useLocation(); // Use useLocation to detect route changes
  const navigate = useNavigate();
  const notifyRef = useRef(null);

  let customerId = null;
  let storeId = null;
  if (role === 'store') {
    storeId = email;
  } else {
    customerId = email;
  }
  const fetchNotifications = async () => {
    try {
      const res = await authFetch(`${NOTIFICATION_URL}`, {
        method: 'GET',
      });
      if (!res.ok) {
        console.error('실패 fetch notifications');
      }
      const data = await res.json();
      setNotifications(data);
      if(data.some(d => d.read == null)) {
        setHasNewMessage(true);
      }
    } catch (error) {
      console.error('알림 목록 fetch Error :', error);
    }
  };
  // REST API로 알림 목록 fetch (링크 이동 시 리렌더링)
  useEffect(() => {
    fetchNotifications();
  }, [location.pathname]);

  // 웹소켓 연결 및 구독
  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS(`${BASE_URL}/noti`);
      const client = Stomp.over(socket);

      client.connect({}, () => {
        if (role === 'customer') {
          // 고객 알림 구독
          client.subscribe(`/queue/customer/${customerId}`, (message) => {
            const notification = JSON.parse(message.body);
            setNotifications(prev => [...prev, notification]);
            setHasNewMessage(true);
          });
        } else if (role === 'store') {
          // 가게 알림 구독
          client.subscribe(`/topic/store/${storeId}`, (message) => {
            const notification = JSON.parse(message.body);
            setNotifications(prev => [...prev, notification]);
            setHasNewMessage(true);
          });
        }

        setStompClient(client);
      }, (error) => {
        console.error('WebSocket connection error:', error);
        setTimeout(connectWebSocket, 3000);
      });
    };

    connectWebSocket();

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [customerId, storeId]);
  // 알림 목록 외부 클릭 시 닫히도록 설정
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifyRef.current && !notifyRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notifyRef]);

  const toggleAlerts = () => {
    setIsOpen(!isOpen);
    setHasNewMessage(false);
  }
  const getClassNameByType = (type) => {
    if (type.includes('CANCEL')) {
      return `${styles.label} ${styles.cancel}`;
    }
    return `${styles.label} ${type? styles.confirm : undefined}`;
  }
  // 하나의 알림 클릭 시 읽음 처리
  const notificationClickHandler = async (notification) => {
    const {id, type, targetId, read} = notification;
    const reservationId = targetId[0];
    if(!read) {
      try {
        const res = await authFetch(`/notification/${id}/read`, {
          method: 'PATCH',
        });
        if (res.ok) {
          setNotifications(prev =>
            prev.map(n =>
              n.id === id ? { ...n, read: true } : n
            )
          );
        }
      } catch (error) {
        console.error('알림 읽음 처리 중 오류 발생:', error);
      }
    }
    if(type.includes('REVIEW')) {
      try {
        const res = await authFetch(`${REVIEW_URL}/check/${reservationId}`, {method: 'GET'});
        if (res.ok) {
          const flag = await res.json();
          flag ? navigate('/reviewCommunity') : navigate(`/reviewForm/${reservationId}`)
        }
      } catch (error) {
        console.error('리뷰 작성 여부 확인 중 오류 발생: ', error);
      }
    } else {
      navigate(`/${role}`);
    }
  };
  // 목록에 있는 알림 모두 읽음 처리
  const readAllHandler = async () => {
    const payload = {
      ids: notifications.filter(n=>n.read === false).map(n=>n.id)
    }
    try {
      const res = await authFetch(`${NOTIFICATION_URL}/all`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      })
      if(res.ok) {
        const flag = await res.json();
        setNotifications(prev =>
          prev.map(n =>
            payload.ids.includes(n.id) ? { ...n, read: true } : n
          )
        );
        setHasNewMessage(false);
      }
    } catch (error) {
      console.error('모든 알림 읽음 처리 중 오류 발생: ', error);
    }
  }

  return (
    <div className={styles['notify-container']} ref={notifyRef} >
      <div className={`${styles['notify-icon']} ${hasNewMessage && styles.new}`} onClick={toggleAlerts}>
        <IoNotificationsOutline/>
      </div>
      <ul className={`${styles['notify-list']} ${!isOpen && styles.close}`}>
        <li>
          <span>알림 {notifications.length}건</span>
          <button className={styles['read-all-btn']} onClick={readAllHandler}>전체 읽음</button>
        </li>
        {notifications?.slice().reverse().map((n, index) => (
          <li
            key={index}
            className={`${n.read && styles.read}`}
            onClick={() => notificationClickHandler(n)}
          >
            <span className={getClassNameByType(n.type)}>{n.label}</span>
            {n.content}
            <GoArrowRight />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notification;