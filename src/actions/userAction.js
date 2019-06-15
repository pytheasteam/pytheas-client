import { GOOGLE_LOGIN } from "../actions/types";
import { LOGIN_PATH } from "../api/consts";
import { Plugins } from "@capacitor/core";
import PytheasApi from "../api/Api";

const { Storage } = Plugins;
async function updateToken(token) {
  await Storage.set({
    key: "token",
    value: token
  });
}

export const login = () => dispatch => {
  console.log("login to google...");
  fetch(LOGIN_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: "user.test@example.com",
      full_name: "userTest",
      google_token: "sdkjfhsdkjhfkjdshfks"
    })
  })
    .then(res => res.json())
    .then(async body => {
      await updateToken(body.token);
      return dispatch({ type: GOOGLE_LOGIN, payload: body.token });
    });
};
