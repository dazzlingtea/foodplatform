const LOCAL_PORT = 8080;

// protocol을 제외한 부분 반환
const clientHostName = window.location.hostname;

let backendHostName;

if (clientHostName === 'localhost') {
  backendHostName = 'http://localhost:' + LOCAL_PORT;
} else if (clientHostName === 'yoult.iptime.org') {
  backendHostName = 'http://yoult.iptime.org';
}

const API_BASE_URL = backendHostName;

const STORE = '/store';

export const EVENT_URL =  STORE;

