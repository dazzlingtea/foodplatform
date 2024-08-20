import React, {useEffect, useState} from 'react';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import styles from './Notification.module.scss';
import {IoNotificationsOutline} from "react-icons/io5";
import {authFetch} from "../../utils/authUtil";
import {useLocation, useNavigate} from "react-router-dom";
import {GoArrowRight} from "react-icons/go";

const Notification = ({email, role}) => {
  const [stompClient, setStompClient] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const location = useLocation(); // Use useLocation to detect route changes
  const BASE_URL = window.location.origin;
  const navigate = useNavigate();
  console.log('BASE_URL 값 ', BASE_URL)

  console.log('이메일 ', email, role);
  let customerId = null;
  let storeId = null;
  if (role === 'store') {
    storeId = email;
  } else {
    customerId = email;
  }
  const fetchNotifications = async () => {
    try {
      const response = await authFetch(`/notification`, {
        method: 'GET',
      });
      if (!response.ok) {
        console.error('실패 fetch notifications');
      }
      const data = await response.json();
      console.log('fetchNotifications data 결과 ', data)
      setNotifications(data);
    } catch (error) {
      console.error('알림 목록 fetch Error :', error);
    }
  };

  // REST API로 알림 목록 fetch (링크 이동 시 리렌더링)
  useEffect(() => {
    console.log("fetch 알림 리스트 useEffect 실행!")
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
            console.log('Received message : ', message);
            const notification = JSON.parse(message.body);
            setNotifications(prev => [...prev, notification]);
            setHasNewMessage(true);
          });
        } else if (role === 'store') {
          // 가게 알림 구독
          client.subscribe(`/topic/store/${storeId}`, (message) => {
            console.log('Received message for store: ', message);
            const notification = JSON.parse(message.body);
            setNotifications(prev => [...prev, notification]);
            setHasNewMessage(true);
          });
        }

        setStompClient(client);
      }, (error) => {
        console.error('WebSocket connection error:', error);
        // 5초 후에 다시 연결 시도
        setTimeout(connectWebSocket, 5000);
      });
    };

    connectWebSocket();

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [customerId, storeId]);

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
    const {id, type, targetId} = notification;
    console.log('클릭한 알림의 id ', id)
    console.log('클릭한 알림의 targetId ', targetId[0])
    // 알림 읽음 처리 API 호출
    try {
      const response = await authFetch(`/notification/${id}/read`, {
        method: 'PATCH',
      });
      if (response.ok) {
        setNotifications(prev =>
          prev.map(n =>
            n.id === id ? { ...n, isRead: true } : n
          )
        );
      }
      if(type.includes('REVIEW')) {
        navigate(`/reviewForm?r=${targetId[0]}`)
      } else {
        navigate(`/${role}`);
      }
    } catch (error) {
      console.error('알림 읽음 처리 중 오류 발생:', error);
    }
  };

  return (
    <div className={styles['notify-container']}>
      <div className={`${styles['notify-icon']} ${hasNewMessage && styles.new}`} onClick={toggleAlerts}>
        <IoNotificationsOutline/>
      </div>
      <ul className={`${styles['notify-list']} ${!isOpen && styles.close}`}>
        <li>알림 {notifications.length}건</li>
        {notifications?.slice().reverse().map((n, index) => (
          <li key={index} onClick={() => notificationClickHandler(n)}>
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