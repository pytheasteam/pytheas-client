import { SELECT_PROFILE } from "../actions/types";

export const selectProfile = profile => dispatch =>
  dispatch({
    type: SELECT_PROFILE,
    payload: profile
  });
