import { GOOGLE_LOGIN } from "../actions/types";
import { LOGIN_PATH } from "../api/consts";

export const login = () => dispatch => {
  console.log("login to google...");
  fetch("http://ec2-35-180-205-235.eu-west-3.compute.amazonaws.com/login", {
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
