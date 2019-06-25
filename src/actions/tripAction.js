import {
  FETCH_TRIPS,
  SELECT_TRIP,
  CLEAR_TRIPS,
  UPDATE_TRIP
} from "../actions/types";
import PytheasApi from "../api/Api";

export const fetchTrips = () => async dispatch => {
  await PytheasApi.get("/trip").then(body => {
    return dispatch({ type: FETCH_TRIPS, payload: body });
  });
};

export const selectTrip = trip => async dispatch =>
  await dispatch({ type: SELECT_TRIP, payload: trip });

export const updateTrip = trip => dispatch => {
  return dispatch({ type: UPDATE_TRIP, payload: trip });
};

export const fetchExplore = queryParams => async dispatch => {
  await PytheasApi.get("/explore", queryParams)
    .then(body => {
      return dispatch({ type: FETCH_TRIPS, payload: body });
    })
    .catch(() => {
      return dispatch({ type: FETCH_TRIPS, payload: -1 });
    });
};

export const clearTrips = () => dispatch => {
  return dispatch({ type: CLEAR_TRIPS });
};
