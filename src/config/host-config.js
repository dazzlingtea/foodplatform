const STORE = '/store';
const CUSTOMER = '/customer';
const STORELISTS = '/storeLists';
const EMAIL = '/email';
const ADMIN = '/admin';
const FAVORITESTORE = '/api/favorites';
const RESERVATION = '/reservation';
const ISSUE = '/issue';
const CATEGORYINFO = '/categoryInfo.path';
const FAVCATEGORY = '/storeLists/favCategory';
const REVIEW = '/review';
const USER = '/user';
const CHAT = '/chat';
const NOTIFICATION = '/notification';

const LOCAL_URL = "http://localhost:"
const EC2_PUBLIC_IP = "http://3.38.5.29:";
const FOODIETREE_SHOP_URL = "http://foodietree.shop"; // 배포환경

export const BASE_URL = window.location.origin;
const LOCAL_PORT = 8083; // 백엔드 로컬 서버 포트번호

// export const BACK_HOST = FOODIETREE_SHOP_URL;
export const BACK_HOST = LOCAL_URL + LOCAL_PORT;

export const STORE_URL =  BACK_HOST+STORE;
export const CUSTOMER_URL = BACK_HOST+CUSTOMER;
export const STORELISTS_URL = BACK_HOST+STORELISTS;
export const EMAIL_URL = BACK_HOST+EMAIL;
export const ADMIN_URL = BACK_HOST+ADMIN;
export const FAVORITESTORE_URL = BACK_HOST+FAVORITESTORE;
export const RESERVATION_URL = BACK_HOST+RESERVATION;
export const ISSUE_URL = BACK_HOST+ISSUE;
export const REVIEW_URL = BACK_HOST+REVIEW;
export const USER_URL = BACK_HOST+USER;
export const CHAT_URL = BACK_HOST+CHAT;
export const NOTIFICATION_URL = BACK_HOST+NOTIFICATION;
export const CATEGORYINFO_URL = BACK_HOST+CATEGORYINFO;
export const FAVCATEGORY_URL = BACK_HOST+FAVCATEGORY;
