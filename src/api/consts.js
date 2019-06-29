const serverApi =
  "http://ec2-15-188-3-17.eu-west-3.compute.amazonaws.com:5000/api";
const serverLogin =
  "http://ec2-15-188-3-17.eu-west-3.compute.amazonaws.com:5000/login";

const localhostApi = "http://localhost:5000/api";
const localhostLogin = "http://localhost:5000/login";

export const MOCK_MODE = false;
const DEV_MODE = process.env.REACT_APP_IS_PROD ? false : true;

export const API_BASE = DEV_MODE ? localhostApi : serverApi;

export const LOGIN_PATH = DEV_MODE ? localhostLogin : serverLogin;

export const MAX_PROFILE_COUNT = 4;

export const PICTURE_GENERATOR = "https://picsum.photos/113";
