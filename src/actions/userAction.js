import { GOOGLE_LOGIN } from "../actions/types";
import { LOGIN_PATH } from "../api/consts";

export const login = () => dispatch => {
  // const token = localStorage.getItem("token");
  // if (token) {
  //   return dispatch({ type: GOOGLE_LOGIN, payload: token });
  // }
  console.log("login to google...");
  fetch(LOGIN_PATH, {
    method: "POST",
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
    })
    .catch(err => dispatch({ type: GOOGLE_LOGIN, payload: "Error" }));
};
