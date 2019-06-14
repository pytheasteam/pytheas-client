import { FETCH_TRIPS, SELECT_TRIP, CLEAR_TRIPS } from "../actions/types";
import PytheasApi from "../api/Api";

export const fetchTrips = () => dispatch => {
  PytheasApi.get("/trip").then(body => {
    return dispatch({ type: FETCH_TRIPS, payload: body });
  });
};

export const selectTrip = trip => dispatch =>
  dispatch({ type: SELECT_TRIP, payload: trip });

export const fetchExplore = queerParams => dispatch => {
  PytheasApi.get("/explore", queerParams).then(body => {
    return dispatch({ type: FETCH_TRIPS, payload: body });
  });
};

export const clearTrips = () => dispatch => {
  return dispatch({ type: CLEAR_TRIPS });
};
