import { GOOGLE_LOGIN } from "../actions/types";
import { LOGIN_PATH } from "../api/consts";

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
    .then(body => {
      localStorage.setItem("token", body.token);
      return dispatch({ type: GOOGLE_LOGIN, payload: body.token });
    });
};
