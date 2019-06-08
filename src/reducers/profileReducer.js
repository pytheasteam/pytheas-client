import { SELECT_PROFILE } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
    case SELECT_PROFILE:
      return action.payload;
  }
}
