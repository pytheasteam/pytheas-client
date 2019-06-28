const serverApi = "https://pytheas-server.herokuapp.com/api";
const serverLogin = "https://pytheas-server.herokuapp.com/login";

const localhostApi = "http://192.168.1.112:5000/api";
const localhostLogin = "http://192.168.1.112:5000/login";

const myLocalhost = "http://localhost:5000/api";
const myLocalhostLogin = "http://loaclhost:5000/login";

export const MOCK_MODE = false;
const DEV_MODE = process.env.REACT_APP_IS_PROD ? false : true;

export const API_BASE = DEV_MODE ? localhostApi : serverApi;

export const LOGIN_PATH = DEV_MODE ? localhostLogin : serverLogin;

export const MAX_PROFILE_COUNT = 4;

export const PICTURE_GENERATOR = "https://picsum.photos/113";
