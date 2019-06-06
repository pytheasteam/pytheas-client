import { GOOGLE_LOGIN } from "../actions/types";

const initialState = {
  token: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
    case GOOGLE_LOGIN:
      return { ...state, token: action.payload };
  }
}
