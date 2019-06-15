const serverApi = "https://pytheas-server.herokuapp.com/api";
const serverLogin = "https://pytheas-server.herokuapp.com/login";

const localhostApi = "http://127.0.0.1:5000/api";
const localhostLogin = "http://127.0.0.1:5000/login";

export const MOCK_MODE = false;

export const API_BASE = MOCK_MODE ? localhostApi : serverApi;

export const LOGIN_PATH = MOCK_MODE ? localhostLogin : serverLogin;

export const MAX_PROFILE_COUNT = 4;

export const PICTURE_GENERATOR = "https://picsum.photos/113";
