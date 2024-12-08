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

const EC2_PUBLIC_IP = "http://3.38.5.29:";
const FOODIETREE_SHOP_URL = "https://foodietreee.shop"; // 배포환경

// 꼭 병합하기 전에 꼭 꼭 원래코드로 돌려놓기!!! //window.location.origin;
export const BASE_URL = "http://localhost:8083";

const LOCAL_PORT = 8083; // 백엔드 로컬 서버 포트번호
export const BACK_HOST = FOODIETREE_SHOP_URL;

const clientHostName = window.location.hostname;

let backendHostName;
if(clientHostName === 'localhost') {
    backendHostName = 'http://localhost:'+LOCAL_PORT;
} else if (clientHostName === 'foodietree.shop') {
    backendHostName = FOODIETREE_SHOP_URL;
}

export const API_BASE_URL = FOODIETREE_SHOP_URL+"/v1";

export const STORE_URL =  API_BASE_URL+STORE;
export const CUSTOMER_URL = API_BASE_URL+CUSTOMER;
export const STORELISTS_URL = API_BASE_URL+STORELISTS;
export const EMAIL_URL = API_BASE_URL+EMAIL;
export const ADMIN_URL = API_BASE_URL+ADMIN;
export const FAVORITESTORE_URL = API_BASE_URL+FAVORITESTORE;
export const RESERVATION_URL = API_BASE_URL+RESERVATION;
export const ISSUE_URL = API_BASE_URL+ISSUE;
export const REVIEW_URL = API_BASE_URL+REVIEW;
export const USER_URL = API_BASE_URL+USER;
export const CHAT_URL = API_BASE_URL+CHAT;
export const NOTIFICATION_URL = API_BASE_URL+NOTIFICATION;
export const CATEGORYINFO_URL = API_BASE_URL+CATEGORYINFO;
export const FAVCATEGORY_URL = API_BASE_URL+FAVCATEGORY;