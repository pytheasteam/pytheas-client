import { FETCH_TRIPS, SELECT_TRIP } from "../actions/types";
import { API_BASE } from "../api/consts";

export const fetchTrips = () => dispatch => {
  fetch(API_BASE + "/trip", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token")
    }
  })
    .then(res => res.json())
    .then(body => {
      return dispatch({ type: FETCH_TRIPS, payload: body });
    });
};

export const selectTrip = trip => dispatch =>
  dispatch({ type: SELECT_TRIP, payload: trip });
